import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, CheckCircle, Eye, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { sampleArtworks } from '@/data/sample-artworks'

export default function HomePage() {
  const [email, setEmail] = useState('')
  const featuredArtworks = sampleArtworks.slice(0, 6)

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement email signup
    console.log('Email submitted:', email)
    setEmail('')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Discover & Collect
              <span className="block text-violet-200">Authentic Art</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-violet-100 sm:text-xl">
              Experience transparent pricing, verified artists, and complete buyer protection.
              Your trusted marketplace for exceptional artwork.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-white text-violet-700 hover:bg-violet-50"
              >
                <Link to="/gallery">
                  Browse Gallery
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <Link to="/sell">Start Selling</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Value Props Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Why Choose ArtAllegro?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              We combine technology and trust to create the safest art marketplace.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Price Transparency */}
            <Card className="border-0 bg-gradient-to-br from-violet-50 to-indigo-50 shadow-lg transition-shadow hover:shadow-xl">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-white">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  Price Transparency
                </h3>
                <p className="mt-3 text-gray-600">
                  No hidden fees, ever. See complete pricing history for every artwork
                  and make informed decisions with full market visibility.
                </p>
              </CardContent>
            </Card>

            {/* Verified Artists */}
            <Card className="border-0 bg-gradient-to-br from-violet-50 to-indigo-50 shadow-lg transition-shadow hover:shadow-xl">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-white">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  Verified Artists
                </h3>
                <p className="mt-3 text-gray-600">
                  All artists are authenticated with blockchain provenance tracking.
                  Every piece comes with a verified certificate of authenticity.
                </p>
              </CardContent>
            </Card>

            {/* Buyer Protection */}
            <Card className="border-0 bg-gradient-to-br from-violet-50 to-indigo-50 shadow-lg transition-shadow hover:shadow-xl sm:col-span-2 lg:col-span-1">
              <CardContent className="p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900">
                  Buyer Protection
                </h3>
                <p className="mt-3 text-gray-600">
                  Shop with confidence with our 20,000 PLN buyer guarantee.
                  Full protection on every purchase, just like Allegro Protect.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Artworks Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Featured Artworks
              </h2>
              <p className="mt-2 text-lg text-gray-600">
                Curated pieces from our verified artists
              </p>
            </div>
            <Button asChild variant="outline" className="hidden sm:flex">
              <Link to="/gallery">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredArtworks.map((artwork) => (
              <Link key={artwork.id} to={`/artwork/${artwork.id}`}>
                <Card className="group overflow-hidden border-0 bg-white shadow-md transition-all hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={artwork.images[0]}
                      alt={artwork.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <Badge className="absolute left-3 top-3 bg-white/90 text-gray-700 hover:bg-white">
                      {artwork.category}
                    </Badge>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-semibold text-gray-900 group-hover:text-violet-600">
                      {artwork.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-2">
                      <img
                        src={artwork.artist.avatar}
                        alt={artwork.artist.name}
                        className="h-5 w-5 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-600">
                        {artwork.artist.name}
                      </span>
                      {artwork.artist.verified && (
                        <CheckCircle className="h-4 w-4 text-violet-600" />
                      )}
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-lg font-bold text-violet-600">
                        {artwork.currency === 'EUR' ? '\u20AC' : artwork.currency}{' '}
                        {artwork.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500">
                        {artwork.views.toLocaleString()} views
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Button asChild variant="outline">
              <Link to="/gallery">
                View All Artworks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Three simple steps to own authentic art
            </p>
          </div>
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {/* Step 1 */}
            <div className="relative text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Browse Curated Collection
              </h3>
              <p className="mt-3 text-gray-600">
                Explore thousands of authenticated artworks from verified artists
                around the world. Filter by style, medium, price, and more.
              </p>
              <div className="absolute right-0 top-8 hidden h-0.5 w-full bg-gradient-to-r from-violet-600 to-transparent lg:block lg:w-1/2" />
            </div>

            {/* Step 2 */}
            <div className="relative text-center">
              <div className="absolute left-0 top-8 hidden h-0.5 w-1/2 bg-gradient-to-r from-transparent to-violet-600 lg:block" />
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Purchase with Protection
              </h3>
              <p className="mt-3 text-gray-600">
                Buy with confidence knowing every transaction is protected.
                Secure payment processing with our 20,000 PLN guarantee.
              </p>
              <div className="absolute right-0 top-8 hidden h-0.5 w-1/2 bg-gradient-to-r from-violet-600 to-transparent lg:block" />
            </div>

            {/* Step 3 */}
            <div className="relative text-center">
              <div className="absolute left-0 top-8 hidden h-0.5 w-1/2 bg-gradient-to-r from-transparent to-violet-600 lg:block" />
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-600 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Receive with Provenance
              </h3>
              <p className="mt-3 text-gray-600">
                Your artwork arrives with a blockchain-verified certificate of
                authenticity and complete ownership history.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-800 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Join 10,000+ Art Collectors
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-violet-100">
              Be the first to know about new artworks, exclusive releases, and
              special events from our verified artists.
            </p>
            <form
              onSubmit={handleEmailSubmit}
              className="mx-auto mt-10 flex max-w-md flex-col gap-4 sm:flex-row"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 border-white/20 bg-white/10 text-white placeholder:text-violet-200 focus-visible:ring-white"
              />
              <Button
                type="submit"
                className="bg-white text-violet-700 hover:bg-violet-50"
              >
                Subscribe
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            <p className="mt-4 text-sm text-violet-200">
              No spam, unsubscribe anytime. Read our{' '}
              <Link to="/privacy" className="underline hover:text-white">
                privacy policy
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
