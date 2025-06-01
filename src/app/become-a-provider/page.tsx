"use client"

import Link from "next/link"

import { useActionState, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Briefcase, DollarSign, Users, UploadCloud, AlertCircle } from "lucide-react"
import { submitProviderApplication, type ProviderApplicationState } from "./actions"
import { SuccessAnimation } from "@/components/ui/success-animation"
import { useToast } from "@/hooks/use-toast" // Assuming you have this from shadcn/ui setup

const benefits = [
  { icon: DollarSign, title: "Set Your Own Rates", description: "You decide how much you earn for your services." },
  { icon: Briefcase, title: "Choose Your Own Hours", description: "Work flexibly according to your schedule." },
  { icon: Users, title: "Grow Your Business", description: "Reach new customers and build your reputation." },
]

const serviceTypes = [
  { id: "babysitter", label: "Babysitter" },
  { id: "petSitter", label: "Pet Sitter" },
  { id: "dogWalker", label: "Dog Walker" },
  { id: "cleaner", label: "Cleaner" },
  { id: "handyman", label: "Handyman" },
]

const totalSteps = 5

export default function BecomeAProviderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [showSuccess, setShowSuccess] = useState(false)
  const { toast } = useToast()

  const initialState: ProviderApplicationState = { message: "", success: false }
  const [state, formAction, isPending] = useActionState(submitProviderApplication, initialState)

  const progressValue = (currentStep / totalSteps) * 100

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const handleServiceSelection = (serviceId: string, checked: boolean) => {
    setSelectedServices((prev) => (checked ? [...prev, serviceId] : prev.filter((id) => id !== serviceId)))
  }

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        setShowSuccess(true)
        // Optionally reset form or redirect
        // For now, just show success and user can navigate away or refresh
      } else {
        toast({
          title: "Application Error",
          description: state.message || "An unknown error occurred.",
          variant: "destructive",
        })
      }
    }
  }, [state, toast])

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Basic Info
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" placeholder="Your full name" required />
              {state.errors?.fullName && <p className="text-sm text-red-500 mt-1">{state.errors.fullName[0]}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="your@email.com" required />
              {state.errors?.email && <p className="text-sm text-red-500 mt-1">{state.errors.email[0]}</p>}
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+371 XXXXXXXX" required />
              {state.errors?.phone && <p className="text-sm text-red-500 mt-1">{state.errors.phone[0]}</p>}
            </div>
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" name="city" placeholder="e.g., Rīga" required />
              {state.errors?.city && <p className="text-sm text-red-500 mt-1">{state.errors.city[0]}</p>}
            </div>
          </div>
        )
      case 2: // Services
        return (
          <div className="space-y-3">
            <p className="font-medium text-text-gray mb-2">Which services do you offer?</p>
            {serviceTypes.map((service) => (
              <div key={service.id} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <Checkbox
                  id={service.id}
                  name="services" // Ensure name attribute is set for form data
                  value={service.id}
                  checked={selectedServices.includes(service.id)}
                  onCheckedChange={(checked) => handleServiceSelection(service.id, !!checked)}
                />
                <Label
                  htmlFor={service.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                >
                  {service.label}
                </Label>
              </div>
            ))}
            {state.errors?.services && <p className="text-sm text-red-500 mt-1">{state.errors.services[0]}</p>}
          </div>
        )
      case 3: // Experience
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="experienceYears">Years of Experience (Optional)</Label>
              <Input id="experienceYears" name="experienceYears" type="number" placeholder="e.g., 5" />
              {state.errors?.experienceYears && (
                <p className="text-sm text-red-500 mt-1">{state.errors.experienceYears[0]}</p>
              )}
            </div>
            <div>
              <Label htmlFor="experienceDescription">Describe Your Experience (Optional)</Label>
              <Textarea
                id="experienceDescription"
                name="experienceDescription"
                placeholder="Tell us about your skills and past work..."
                rows={5}
              />
              {state.errors?.experienceDescription && (
                <p className="text-sm text-red-500 mt-1">{state.errors.experienceDescription[0]}</p>
              )}
            </div>
          </div>
        )
      case 4: // Pricing
        return (
          <div className="space-y-4">
            <p className="font-medium text-text-gray mb-2">Set your hourly rates for selected services:</p>
            {selectedServices.length > 0 ? (
              selectedServices.map((serviceId) => {
                const service = serviceTypes.find((s) => s.id === serviceId)
                return (
                  <div key={serviceId} className="space-y-1">
                    <Label htmlFor={`price-${serviceId}`}>{service?.label} (EUR/hr)</Label>
                    <Input
                      id={`price-${serviceId}`}
                      name={`price-${serviceId}`}
                      type="number"
                      placeholder="e.g., 15"
                      step="0.01"
                    />
                  </div>
                )
              })
            ) : (
              <p className="text-sm text-text-gray">Please select services in Step 2 to set prices.</p>
            )}
            {state.errors?.pricing && (
              <p className="text-sm text-red-500 mt-1">
                {typeof state.errors.pricing === "string" ? state.errors.pricing : "Invalid pricing input."}
              </p>
            )}
          </div>
        )
      case 5: // Documents
        return (
          <div className="space-y-4">
            <p className="font-medium text-text-gray mb-2">Upload necessary documents (Optional for now):</p>
            <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-blue-primary cursor-pointer">
              <UploadCloud className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-text-gray">Drag & drop files here or click to browse</p>
              <p className="text-xs text-gray-500">ID card/passport, certifications (if any)</p>
              <Input type="file" name="documents" className="hidden" multiple />
              {/* File upload handling is complex and would typically involve Supabase Storage.
                  This is a placeholder UI. Actual upload logic is not implemented in this step. */}
            </div>
            <p className="text-xs text-text-gray text-center">
              Document upload functionality will be fully implemented later.
            </p>
          </div>
        )
      default:
        return null
    }
  }

  if (showSuccess) {
    return (
      <div className="bg-light-gray min-h-screen flex flex-col items-center justify-center text-center p-4">
        <SuccessAnimation show={true} onComplete={() => setShowSuccess(false)} />
        <Card className="shadow-soft-lg rounded-xl border-0 max-w-md mt-8">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl font-bold text-charcoal">Application Submitted!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-text-gray mb-6">
              {state.message || "Thank you for applying. We'll review your application and get back to you soon."}
            </p>
            <Link href="/" passHref>
              <Button className="bg-blue-primary hover:bg-blue-primary-hover text-white rounded-lg">
                Back to Homepage
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <form action={formAction}>
      <div className="bg-light-gray min-h-screen">
        {/* Hero Section */}
        <section className="bg-blue-primary text-white py-20 md:py-28 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Earn Money Doing What You Love</h1>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
              Join thousands of providers on Abrakadabra.lv and connect with clients in your area.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <benefit.icon className="w-10 h-10 mx-auto mb-4 text-yellow-300" />
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm opacity-90">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Application Form Section */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-2xl">
            <Card className="shadow-soft-lg rounded-xl border-0">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl md:text-3xl font-bold text-charcoal">Become a Provider</CardTitle>
                <CardDescription>Complete the steps below to start offering your services.</CardDescription>
                <Progress value={progressValue} className="w-full mt-4 h-2" />
                <p className="text-sm text-text-gray mt-2">
                  Step {currentStep} of {totalSteps}
                </p>
              </CardHeader>
              <CardContent className="py-8">{renderStepContent()}</CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1 || isPending}
                  className="rounded-lg active:scale-98"
                >
                  Previous
                </Button>
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={isPending}
                    className="bg-blue-primary hover:bg-blue-primary-hover text-white rounded-lg active:scale-98"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="bg-green-500 hover:bg-green-600 text-white rounded-lg active:scale-98"
                  >
                    {isPending ? "Submitting..." : "Submit Application"}
                  </Button>
                )}
              </CardFooter>
              {state.errors?.form && (
                <CardFooter>
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={16} /> {state.errors.form[0]}
                  </p>
                </CardFooter>
              )}
            </Card>
          </div>
        </section>
      </div>
    </form>
  )
}
