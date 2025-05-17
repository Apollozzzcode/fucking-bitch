import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import { KryptonLogo } from "@/components/krypton-logo"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <KryptonLogo />
          <h1 className="text-xl font-bold text-white">Krypton.lol</h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-white hover:bg-white/10">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Sign up</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            One Link to <span className="text-purple-300">Share All</span> Your Content
          </h2>
          <p className="text-lg text-purple-100 max-w-2xl">
            Create a customizable page that houses all the important links you want to share with your audience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link href="/signup">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white">
                Create your Krypton page
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/examples">
              <Button size="lg" variant="outline" className="border-purple-400 text-white hover:bg-white/10">
                See examples
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="relative h-[500px] w-full max-w-[300px] mx-auto">
            <div className="absolute inset-0 rounded-3xl overflow-hidden border-8 border-purple-800/50 shadow-2xl">
              <Image src="/placeholder.svg?height=800&width=400" alt="Krypton Example" fill className="object-cover" />
            </div>
            <div className="absolute -right-4 -bottom-4 h-40 w-40 rounded-2xl overflow-hidden border-4 border-purple-800/50 shadow-xl">
              <Image
                src="/placeholder.svg?height=200&width=200"
                alt="Krypton Mobile Example"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">Why Choose Krypton.lol?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Custom Animations",
              description: "Choose from various animation styles to make your page stand out.",
              icon: "✨",
            },
            {
              title: "Background Music",
              description: "Add your favorite tunes to enhance the visitor experience.",
              icon: "🎵",
            },
            {
              title: "Unique Username",
              description: "Claim your unique username to personalize your Krypton URL.",
              icon: "@",
            },
            {
              title: "Custom Backgrounds",
              description: "Upload your own background or choose from our collection.",
              icon: "🖼️",
            },
            {
              title: "Interactive Effects",
              description: "Engage visitors with parallax effects and custom cursors.",
              icon: "🖱️",
            },
            {
              title: "Social Media Integration",
              description: "Connect all your social platforms in one place.",
              icon: "📱",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-purple-100">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-white text-center mb-4">Simple Pricing</h2>
        <p className="text-center text-purple-100 mb-12 max-w-2xl mx-auto">
          Start for free and upgrade when you need more features.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-2">Free</h3>
            <div className="text-3xl font-bold text-white mb-4">$0</div>
            <p className="text-purple-100 mb-6">Perfect for getting started</p>
            <ul className="space-y-3 mb-8">
              {["Basic customization", "Up to 5 links", "Standard animations"].map((feature, i) => (
                <li key={i} className="flex items-center text-purple-100">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/signup">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Get Started</Button>
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="bg-purple-600 rounded-xl p-8 border border-purple-400 shadow-xl relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-purple-600 px-4 py-1 rounded-full font-bold text-sm">
              MOST POPULAR
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Pro</h3>
            <div className="text-3xl font-bold text-white mb-4">$5/mo</div>
            <p className="text-purple-100 mb-6">For creators and professionals</p>
            <ul className="space-y-3 mb-8">
              {["Advanced customization", "Unlimited links", "Custom animations", "Background music", "Analytics"].map(
                (feature, i) => (
                  <li key={i} className="flex items-center text-white">
                    <CheckCircle className="h-5 w-5 text-white mr-2" />
                    {feature}
                  </li>
                ),
              )}
            </ul>
            <Link href="/signup">
              <Button className="w-full bg-white hover:bg-purple-50 text-purple-600">Upgrade to Pro</Button>
            </Link>
          </div>

          {/* Business Plan */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-purple-500/30">
            <h3 className="text-xl font-bold text-white mb-2">Business</h3>
            <div className="text-3xl font-bold text-white mb-4">$15/mo</div>
            <p className="text-purple-100 mb-6">For teams and businesses</p>
            <ul className="space-y-3 mb-8">
              {[
                "Everything in Pro",
                "Team collaboration",
                "Priority support",
                "Custom domain",
                "Advanced analytics",
              ].map((feature, i) => (
                <li key={i} className="flex items-center text-purple-100">
                  <CheckCircle className="h-5 w-5 text-purple-400 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/signup">
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">Contact Sales</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                {["Features", "Pricing", "Examples", "Documentation"].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-purple-200 hover:text-white text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                {["About", "Blog", "Careers", "Contact"].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-purple-200 hover:text-white text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                {["Help Center", "Community", "Status", "Webinars"].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-purple-200 hover:text-white text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                {["Privacy", "Terms", "Security", "Cookies"].map((item, i) => (
                  <li key={i}>
                    <Link href="#" className="text-purple-200 hover:text-white text-sm">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <KryptonLogo size="sm" />
              <span className="text-white font-bold">Krypton.lol</span>
            </div>
            <div className="text-purple-200 text-sm">
              © {new Date().getFullYear()} Krypton.lol. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
