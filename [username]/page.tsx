"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Github,
  Instagram,
  Twitter,
  Youtube,
  Globe,
  FileText,
  ShoppingBag,
  Heart,
  Music,
  Twitch,
  Linkedin,
  Mail,
  Coffee,
  DollarSign,
  Loader2,
} from "lucide-react"
import { CustomCursor } from "@/components/custom-cursor"
import { SnowParticles } from "@/components/snow-particles"
import { AngelWings } from "@/components/angel-wings"
import { YouTubeEmbed } from "@/components/youtube-embed"
import { KryptonLogo } from "@/components/krypton-logo"

// All available website options
const allWebsites = [
  {
    id: "website",
    title: "Website",
    url: "https://example.com",
    icon: <Globe className="h-full w-full p-3" />,
    color: "bg-blue-500",
  },
  {
    id: "youtube",
    title: "YouTube",
    url: "https://youtube.com",
    icon: <Youtube className="h-full w-full p-3" />,
    color: "bg-red-500",
  },
  {
    id: "twitter",
    title: "Twitter",
    url: "https://twitter.com",
    icon: <Twitter className="h-full w-full p-3" />,
    color: "bg-sky-500",
  },
  {
    id: "instagram",
    title: "Instagram",
    url: "https://instagram.com",
    icon: <Instagram className="h-full w-full p-3" />,
    color: "bg-pink-600",
  },
  {
    id: "github",
    title: "GitHub",
    url: "https://github.com",
    icon: <Github className="h-full w-full p-3" />,
    color: "bg-gray-800",
  },
  {
    id: "blog",
    title: "Blog",
    url: "https://example.com/blog",
    icon: <FileText className="h-full w-full p-3" />,
    color: "bg-green-500",
  },
  {
    id: "store",
    title: "Store",
    url: "https://example.com/store",
    icon: <ShoppingBag className="h-full w-full p-3" />,
    color: "bg-purple-500",
  },
  {
    id: "support",
    title: "Support",
    url: "https://patreon.com",
    icon: <Heart className="h-full w-full p-3" />,
    color: "bg-pink-500",
  },
  {
    id: "music",
    title: "Music",
    url: "https://spotify.com",
    icon: <Music className="h-full w-full p-3" />,
    color: "bg-green-600",
  },
  {
    id: "twitch",
    title: "Twitch",
    url: "https://twitch.tv",
    icon: <Twitch className="h-full w-full p-3" />,
    color: "bg-purple-600",
  },
  {
    id: "linkedin",
    title: "LinkedIn",
    url: "https://linkedin.com",
    icon: <Linkedin className="h-full w-full p-3" />,
    color: "bg-blue-700",
  },
  {
    id: "email",
    title: "Email",
    url: "mailto:example@example.com",
    icon: <Mail className="h-full w-full p-3" />,
    color: "bg-yellow-500",
  },
  {
    id: "buymeacoffee",
    title: "Buy Me a Coffee",
    url: "https://buymeacoffee.com",
    icon: <Coffee className="h-full w-full p-3" />,
    color: "bg-yellow-600",
  },
  {
    id: "donate",
    title: "Donate",
    url: "https://example.com/donate",
    icon: <DollarSign className="h-full w-full p-3" />,
    color: "bg-green-700",
  },
]

export default function UserProfilePage() {
  const { username } = useParams()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Load user data
  useEffect(() => {
    const loadUser = () => {
      const usersJson = localStorage.getItem("linktree_users")
      if (!usersJson) {
        setNotFound(true)
        setLoading(false)
        return
      }

      const users = JSON.parse(usersJson)
      const foundUser = users.find((u: any) => u.username === username)

      if (foundUser) {
        setUser(foundUser)
      } else {
        setNotFound(true)
      }

      setLoading(false)
    }

    loadUser()
  }, [username])

  // Update mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position as percentage of window size
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5

      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Loading state
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-white mx-auto" />
          <p className="mt-4 text-white">Loading profile...</p>
        </div>
      </div>
    )
  }

  // Not found state
  if (notFound) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900">
        <div className="text-center max-w-md px-4">
          <div className="flex justify-center mb-6">
            <KryptonLogo size="lg" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">Profile Not Found</h1>
          <p className="text-purple-200 mb-8">
            The username @{username} doesn't exist or hasn't been claimed yet on Krypton.lol.
          </p>
          <div className="space-y-4">
            <Link href="/signup">
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium">
                Create Your Krypton Page
              </button>
            </Link>
            <div>
              <Link href="/" className="text-purple-300 hover:text-white">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Get user settings
  const {
    background,
    enableParallax,
    enableSnowParticles,
    enableCustomCursor,
    profileInfo,
    selectedWebsites,
    animationStyle,
  } = user.settings

  // Filter websites based on selection
  const displayedWebsites = allWebsites.filter((site) => selectedWebsites.includes(site.id))

  // Calculate parallax transform values (only if enabled)
  const backgroundTransform = enableParallax
    ? `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px) scale(1.1)`
    : "scale(1.05)"
  const contentTransform = enableParallax ? `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)` : "none"
  const profileTransform = enableParallax ? `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)` : "none"

  // Determine animation class based on selected style
  const getAnimationClass = () => {
    switch (animationStyle) {
      case "fade":
        return "animate-fade-in"
      case "slide-up":
        return "animate-slide-up"
      case "bounce":
        return "animate-bounce"
      case "pulse":
        return "animate-pulse"
      default:
        return ""
    }
  }

  return (
    <>
      <CustomCursor enabled={enableCustomCursor} />
      <SnowParticles mousePosition={mousePosition} enabled={enableSnowParticles} />
      <YouTubeEmbed />

      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        {/* Background with parallax effect */}
        <div
          className="absolute inset-0 z-0 transition-transform duration-300"
          style={{
            transform: backgroundTransform,
            transition: enableParallax ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          }}
        >
          <div className="absolute inset-0 bg-black/30 z-10" /> {/* Lighter overlay for the GIF */}
          {background.startsWith("url") ? (
            <Image
              src={background.slice(5, -2) || "/anime-girl.gif"}
              alt="Background"
              fill
              className="object-cover object-center"
              priority
              unoptimized // Add this to ensure GIF animation works
            />
          ) : (
            <div className={`absolute inset-0 ${background}`} />
          )}
        </div>

        {/* Content with opposite parallax effect */}
        <div
          className={`container relative z-20 max-w-md space-y-8 py-8 px-4 ${getAnimationClass()}`}
          style={{
            transform: contentTransform,
            transition: enableParallax ? "transform 0.1s ease-out" : "none",
          }}
        >
          {/* Krypton Logo */}
          <div className="flex justify-center">
            <KryptonLogo />
          </div>

          {/* Profile Section with subtle parallax */}
          <div className="flex flex-col items-center space-y-4 text-center">
            <div
              className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-purple-500 shadow-lg shadow-purple-500/20"
              style={{
                transform: profileTransform,
                transition: enableParallax ? "transform 0.1s ease-out" : "none",
              }}
            >
              <Image
                src={profileInfo.avatar || "/placeholder.svg"}
                alt="Profile"
                fill
                className="object-cover"
                unoptimized // Add this to ensure GIF animation works
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-md">{profileInfo.name}</h1>
              <p className="text-sm text-purple-200">{profileInfo.bio}</p>
              <p className="text-xs text-purple-300 mt-1">@{user.username}</p>
            </div>
          </div>

          {/* Links Section - Logo Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4 justify-center">
            {displayedWebsites.map((site, index) => (
              <Link key={site.id} href={site.url} target="_blank" rel="noopener noreferrer" className="block group">
                <div
                  className="relative aspect-square rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl hover:shadow-purple-500/20"
                  style={{
                    transform: enableParallax
                      ? `translate(${mousePosition.x * (5 + (index % 3) * 2)}px, ${
                          mousePosition.y * (5 + (index % 3) * 2)
                        }px)`
                      : "none",
                    transition: enableParallax
                      ? "transform 0.15s ease-out, scale 0.3s ease-out"
                      : "scale 0.3s ease-out",
                  }}
                >
                  {/* Angel Wings */}
                  <AngelWings />

                  {/* Icon Background */}
                  <div className={`absolute inset-0 ${site.color} rounded-2xl z-0`}></div>

                  {/* Icon */}
                  <div className="relative z-10 text-white">{site.icon}</div>
                </div>
                <div className="mt-1 text-center text-xs text-white/80 font-medium">{site.title}</div>
              </Link>
            ))}
          </div>

          {/* Footer */}
          <div className="pt-6 text-center text-xs text-white/60">
            <div>
              © {new Date().getFullYear()} {profileInfo.name}
            </div>
            <div className="mt-1">
              Powered by{" "}
              <Link href="/" className="text-purple-300 hover:text-white">
                Krypton.lol
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
