import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { sampleArtworks } from '@/data/sample-artworks'
import {
  Heart,
  ShoppingCart,
  Shield,
  CheckCircle,
  Star,
  MapPin,
  Clock,
  Link as LinkIcon,
  Calendar,
  Palette,
  Ruler,
  Tag,
  Award,
  ArrowLeft,
  Share2,
  Eye,
} from 'lucide-react'

const provenanceIcons = {
  created: Palette,
  sold: ShoppingCart,
  exhibited: Eye,
  authenticated: CheckCircle,
  transferred: ArrowLeft,
}

export default function ArtworkPage() {
  const { id } = useParams<{ id: string }>()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)

  const artwork = sampleArtworks.find((a) => a.id === id)

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Artwork Not Found</h1>
          <p className="text-gray-500 mb-6">The artwork you're looking for doesn't exist.</p>
          <Link to="/gallery">
            <Button className="bg-gradient-to-r from-violet-600 to-indigo-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Gallery
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/gallery" className="text-gray-500 hover:text-violet-600">
              Gallery
            </Link>
            <span className="text-gray-300">/</span>
            <Link
              to={`/gallery?category=${artwork.category}`}
              className="text-gray-500 hover:text-violet-600"
            >
              {artwork.category}
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium truncate">{artwork.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-lg">
              <img
                src={artwork.images[selectedImageIndex]}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
              <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                <Share2 className="h-5 w-5 text-gray-600" />
              </button>
            </div>

            {/* Thumbnail Navigation */}
            {artwork.images.length > 1 && (
              <div className="flex gap-3">
                {artwork.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all ${
                      selectedImageIndex === index
                        ? 'ring-2 ring-violet-600 ring-offset-2'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Artwork Info */}
          <div className="space-y-6">
            {/* Title and Artist */}
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {artwork.title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-gray-600">by</span>
                    <span className="text-lg font-semibold text-gray-900">
                      {artwork.artist.name}
                    </span>
                    {artwork.artist.verified && (
                      <CheckCircle className="h-5 w-5 text-violet-600 fill-violet-100" />
                    )}
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mt-6 p-4 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl border border-violet-100">
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <p className="text-3xl font-bold text-gray-900">
                  {artwork.currency === 'EUR' ? '\u20AC' : artwork.currency}
                  {artwork.price.toLocaleString()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button className="flex-1 h-12 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-base">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1 h-12 text-base">
                Make Offer
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={`h-12 w-12 ${isFavorited ? 'text-red-500 border-red-200 bg-red-50' : ''}`}
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart className={`h-5 w-5 ${isFavorited ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Buyer Protection Badge */}
            <Card className="border-green-200 bg-green-50">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-green-800">Buyer Protection</p>
                  <p className="text-sm text-green-700">Protected up to 20,000 PLN</p>
                </div>
              </CardContent>
            </Card>

            {/* Artwork Details */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">Artwork Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 leading-relaxed">{artwork.description}</p>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Palette className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Medium</p>
                      <p className="text-sm font-medium">{artwork.medium}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Ruler className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Dimensions</p>
                      <p className="text-sm font-medium">
                        {artwork.dimensions.width} x {artwork.dimensions.height}{' '}
                        {artwork.dimensions.unit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Calendar className="h-4 w-4 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Year</p>
                      <p className="text-sm font-medium">{artwork.year}</p>
                    </div>
                  </div>

                  {artwork.edition && (
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-100 rounded-lg">
                        <Award className="h-4 w-4 text-gray-600" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Edition</p>
                        <p className="text-sm font-medium">
                          {artwork.edition.number} of {artwork.edition.total}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Tags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {artwork.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="capitalize">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Artist Card */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={artwork.artist.avatar}
                    alt={artwork.artist.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{artwork.artist.name}</h3>
                      {artwork.artist.verified && (
                        <CheckCircle className="h-4 w-4 text-violet-600 fill-violet-100" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {artwork.artist.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1 text-sm">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{artwork.artist.rating}</span>
                      </span>
                      <span className="text-sm text-gray-500">
                        {artwork.artist.totalSales} sales
                      </span>
                    </div>
                  </div>
                  <Link to={`/artist/${artwork.artist.id}`}>
                    <Button variant="outline" size="sm">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Provenance Section */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-violet-100 rounded-lg">
                  <Clock className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <CardTitle>Provenance & History</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    Complete ownership and exhibition history
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

                {/* Timeline Items */}
                <div className="space-y-6">
                  {artwork.provenance.map((record, index) => {
                    const Icon = provenanceIcons[record.event] || Clock
                    const hasBlockchain = !!record.blockchainTxId

                    return (
                      <div key={record.id} className="relative flex gap-4">
                        {/* Icon */}
                        <div
                          className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center ${
                            index === 0
                              ? 'bg-gradient-to-br from-violet-600 to-indigo-600 text-white'
                              : 'bg-white border-2 border-gray-200 text-gray-400'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 pb-6">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold text-gray-900 capitalize">
                                  {record.event}
                                </h4>
                                {hasBlockchain && (
                                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                                    <LinkIcon className="h-3 w-3 mr-1" />
                                    Blockchain Verified
                                  </Badge>
                                )}
                              </div>
                              <p className="text-gray-600">{record.description}</p>
                              {record.verifiedBy && (
                                <p className="text-sm text-gray-500 mt-1">
                                  Verified by: {record.verifiedBy}
                                </p>
                              )}
                              {hasBlockchain && (
                                <p className="text-xs text-gray-400 mt-1 font-mono">
                                  TX: {record.blockchainTxId}
                                </p>
                              )}
                            </div>
                            <span className="text-sm text-gray-500 whitespace-nowrap">
                              {formatDate(record.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{artwork.views.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Views</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{artwork.favorites}</p>
              <p className="text-sm text-gray-500">Favorites</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{artwork.provenance.length}</p>
              <p className="text-sm text-gray-500">Provenance Records</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{artwork.year}</p>
              <p className="text-sm text-gray-500">Year Created</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
