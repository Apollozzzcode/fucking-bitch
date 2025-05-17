"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { KryptonLogo } from "@/components/krypton-logo"

export default function SignupPage() {
  const router = useRouter()
  const { signup, user, isLoading, checkUsernameAvailability } = useAuth()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null)

  // Redirect if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      router.push("/")
    }
  }, [user, isLoading, router])

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when typing
    setErrors((prev) => ({ ...prev, [name]: "", general: "" }))

    // Reset username availability when username changes
    if (name === "username") {
      setIsUsernameAvailable(null)
    }
  }

  // Check username availability with debounce
  useEffect(() => {
    if (!formData.username || formData.username.length < 3) return

    const timer = setTimeout(async () => {
      setIsCheckingUsername(true)
      const isAvailable = await checkUsernameAvailability(formData.username)
      setIsUsernameAvailable(isAvailable)
      setIsCheckingUsername(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [formData.username, checkUsernameAvailability])

  // Validate form
  const validateForm = () => {
    let isValid = true
    const newErrors = { ...errors }

    // Username validation
    if (!formData.username) {
      newErrors.username = "Username is required"
      isValid = false
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters"
      isValid = false
    } else if (!isUsernameAvailable) {
      newErrors.username = "Username is already taken"
      isValid = false
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
      isValid = false
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required"
      isValid = false
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
      isValid = false
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const result = await signup(formData.username, formData.email, formData.password)

      if (result.success) {
        router.push("/")
      } else {
        setErrors((prev) => ({ ...prev, general: result.message }))
      }
    } catch (error) {
      setErrors((prev) => ({ ...prev, general: "An unexpected error occurred" }))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-black/40 p-8 backdrop-blur-md">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <KryptonLogo size="lg" />
          </div>
          <h1 className="text-3xl font-bold text-white">Create Your Krypton Page</h1>
          <p className="mt-2 text-sm text-purple-200">Sign up to create your personalized link page</p>
        </div>

        {errors.general && (
          <div className="rounded-md bg-red-500/20 p-3 text-sm text-red-200">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4" />
              <p>{errors.general}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="username" className="text-white">
                Username
              </Label>
              {isCheckingUsername ? (
                <span className="text-xs text-purple-300">
                  <Loader2 className="mr-1 inline h-3 w-3 animate-spin" />
                  Checking...
                </span>
              ) : isUsernameAvailable === true ? (
                <span className="text-xs text-green-300">
                  <CheckCircle2 className="mr-1 inline h-3 w-3" />
                  Available
                </span>
              ) : isUsernameAvailable === false ? (
                <span className="text-xs text-red-300">
                  <AlertCircle className="mr-1 inline h-3 w-3" />
                  Taken
                </span>
              ) : null}
            </div>
            <Input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="bg-black/30 border-purple-500/30 text-white"
              placeholder="yourusername"
            />
            {errors.username && <p className="text-xs text-red-300">{errors.username}</p>}
            {!errors.username && (
              <p className="text-xs text-purple-300">
                Your page will be: krypton.lol/{formData.username || "username"}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="bg-black/30 border-purple-500/30 text-white"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-xs text-red-300">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-white">
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-black/30 border-purple-500/30 text-white"
            />
            {errors.password && <p className="text-xs text-red-300">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-white">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="bg-black/30 border-purple-500/30 text-white"
            />
            {errors.confirmPassword && <p className="text-xs text-red-300">{errors.confirmPassword}</p>}
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>

        <div className="text-center text-sm text-purple-200">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-purple-300 hover:text-white">
            Log in
          </Link>
        </div>
      </div>
    </div>
  )
}
