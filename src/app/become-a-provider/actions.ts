"use server"

import { cookies } from "next/headers"
import { createClient as createServerSupabaseClient } from "@/lib/supabase/server"
import { z } from "zod"

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

const providerApplicationSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number seems too short"),
  city: z.string().min(2, "City name seems too short"),
  services: z.array(z.string()).min(1, "Please select at least one service"),
  experienceYears: z.coerce.number().min(0, "Experience years cannot be negative").optional(),
  experienceDescription: z.string().optional(),
  // For pricing, we'll assume a structure like: { serviceId: rate }
  // This will need to be built dynamically based on selected services in the form
  pricing: z.record(z.string(), z.coerce.number().min(0, "Rate cannot be negative")).optional(),
  // Documents are harder to validate with Zod in Server Actions without client-side pre-processing
  // For now, we'll skip direct Zod validation for files here but would add it with more complex handling
})

export interface ProviderApplicationState {
  message: string
  errors?: {
    fullName?: string[]
    email?: string[]
    phone?: string[]
    city?: string[]
    services?: string[]
    experienceYears?: string[]
    experienceDescription?: string[]
    pricing?: string[]
    form?: string[]
  }
  success: boolean
}

export async function submitProviderApplication(
  prevState: ProviderApplicationState,
  formData: FormData,
): Promise<ProviderApplicationState> {
  const cookieStore = cookies()
  const supabase = createServerSupabaseClient(cookieStore)

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      message: "Authentication error: You must be logged in to apply.",
      success: false,
    }
  }

  const services = formData.getAll("services") as string[]
  const rawPricing: { [key: string]: number } = {}
  services.forEach((serviceId) => {
    const rate = formData.get(`price-${serviceId}`)
    if (rate) {
      rawPricing[serviceId] = Number.parseFloat(rate as string)
    }
  })

  const validatedFields = providerApplicationSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    city: formData.get("city"),
    services: services,
    experienceYears: formData.get("experienceYears"),
    experienceDescription: formData.get("experienceDescription"),
    pricing: rawPricing,
  })

  if (!validatedFields.success) {
    console.error("Validation Errors:", validatedFields.error.flatten().fieldErrors)
    return {
      message: "Validation failed. Please check your input.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    }
  }

  const { fullName, email, phone, city, experienceYears, experienceDescription } = validatedFields.data

  try {
    // 1. Update public.profiles
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        phone_number: phone,
        is_provider: true,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (profileError) {
      console.error("Error updating profile:", profileError)
      return { message: `Error updating profile: ${profileError.message}`, success: false }
    }

    // 2. Insert into public.provider_details
    // For gallery_photos, this would typically involve uploading files to Supabase Storage first
    // and then storing the URLs. For simplicity, we'll store a placeholder for now.
    const { data: providerDetailData, error: providerDetailError } = await supabase
      .from("provider_details")
      .upsert(
        {
          id: user.id, // This is the foreign key to profiles.id
          title: `Provider for ${validatedFields.data.services.join(", ")}`, // Generic title
          bio: experienceDescription,
          location_text: city,
          member_since: new Date().toISOString(),
          response_time_estimate: "~24 hours", // Placeholder
          years_experience: experienceYears,
          is_verified: false, // Verification is a separate admin process
          background_check_status: "pending",
          // gallery_photos: [], // Placeholder for photo URLs
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      ) // Use upsert to handle cases where a profile might exist but provider_details doesn't
      .select("id")
      .single()

    if (providerDetailError) {
      console.error("Error creating provider details:", providerDetailError)
      return { message: `Error creating provider details: ${providerDetailError.message}`, success: false }
    }

    const providerId = providerDetailData?.id
    if (!providerId) {
      return { message: "Failed to get provider ID after creating details.", success: false }
    }

    // 3. Insert into public.provider_services
    // First, get IDs of service categories from their names
    const serviceCategoryNames = validatedFields.data.services.map((s) => {
      // This mapping assumes the service ID from the form (e.g., "babysitter")
      // matches a unique identifier for the category.
      // In a real app, you might pass category UUIDs from the form or do a lookup.
      // For now, we'll assume the form passes values that can be used to find category UUIDs.
      // Example: 'babysitters' (form value) -> maps to 'Babysitters' (name in service_categories)
      const serviceMap: { [key: string]: string } = {
        babysitter: "Babysitters",
        petSitter: "Pet Sitters",
        dogWalker: "Dog Walkers",
        cleaner: "Cleaners",
        handyman: "Handymen",
      }
      return serviceMap[s] || s // Fallback if not in map
    })

    const { data: categories, error: categoriesError } = await supabase
      .from("service_categories")
      .select("id, name")
      .in("name", serviceCategoryNames)

    if (categoriesError || !categories) {
      console.error("Error fetching service categories:", categoriesError)
      return {
        message: `Error fetching service categories: ${categoriesError?.message || "No categories found"}`,
        success: false,
      }
    }

    const providerServiceEntries = categories.map((category) => {
      const serviceKey = Object.keys(serviceTypesMap).find(
        (key) => serviceTypesMap[key as keyof typeof serviceTypesMap].label === category.name,
      )
      const rate = serviceKey && validatedFields.data.pricing ? validatedFields.data.pricing[serviceKey] : undefined

      return {
        provider_id: providerId,
        service_category_id: category.id,
        hourly_rate: rate, // Get rate from validatedFields.data.pricing
        service_description: `Offering ${category.name} services.`, // Generic
      }
    })

    if (providerServiceEntries.length > 0) {
      const { error: providerServicesError } = await supabase
        .from("provider_services")
        .upsert(providerServiceEntries, { onConflict: "provider_id,service_category_id" }) // Upsert to avoid duplicate entries

      if (providerServicesError) {
        console.error("Error adding provider services:", providerServicesError)
        return { message: `Error adding provider services: ${providerServicesError.message}`, success: false }
      }
    }

    return { message: "Application submitted successfully! We will review it shortly.", success: true }
  } catch (e: any) {
    console.error("Unexpected error:", e)
    return { message: `An unexpected error occurred: ${e.message}`, success: false }
  }
}

// Helper map for service IDs to labels (used in action)
const serviceTypesMap = {
  babysitter: { id: "babysitter", label: "Babysitters" },
  petSitter: { id: "petSitter", label: "Pet Sitters" },
  dogWalker: { id: "dogWalker", label: "Dog Walkers" },
  cleaner: { id: "cleaner", label: "Cleaners" },
  handyman: { id: "handyman", label: "Handymen" },
}
