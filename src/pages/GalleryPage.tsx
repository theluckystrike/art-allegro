import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { sampleArtworks, categories, mediums } from '@/data/sample-artworks'
import { Search, Heart, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import type { SearchFilters } from '@/types'

export default function GalleryPage() {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: 'All',
    priceMin: undefined,
    priceMax: undefined,
    medium: '',
    sortBy: 'newest',
  })
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  const filteredArtworks = useMemo(() => {
    let result = [...sampleArtworks]

    // Search filter
    if (filters.query) {
      const query = filters.query.toLowerCase()
      result = result.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(query) ||
          artwork.artist.name.toLowerCase().includes(query) ||
          artwork.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    // Category filter
    if (filters.category && filters.category !== 'All') {
      result = result.filter((artwork) => artwork.category === filters.category)
    }

    // Price range filter
    if (filters.priceMin !== undefined) {
      result = result.filter((artwork) => artwork.price >= filters.priceMin!)
    }
    if (filters.priceMax !== undefined) {
      result = result.filter((artwork) => artwork.price <= filters.priceMax!)
    }

    // Medium filter
    if (filters.medium) {
      result = result.filter((artwork) =>
        artwork.medium.toLowerCase().includes(filters.medium!.toLowerCase())
      )
    }

    // Sort
    switch (filters.sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'price_asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price_desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'popular':
        result.sort((a, b) => b.favorites - a.favorites)
        break
    }

    return result
  }, [filters])

  const clearFilters = () => {
    setFilters({
      query: '',
      category: 'All',
      priceMin: undefined,
      priceMax: undefined,
      medium: '',
      sortBy: 'newest',
    })
  }

  const hasActiveFilters =
    filters.query ||
    (filters.category && filters.category !== 'All') ||
    filters.priceMin !== undefined ||
    filters.priceMax !== undefined ||
    filters.medium

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-semibold text-sm text-gray-900 mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilters((prev) => ({ ...prev, category }))}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                filters.category === category
                  ? 'bg-violet-100 text-violet-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="font-semibold text-sm text-gray-900 mb-3">Price Range (EUR)</h3>
        <div className="flex gap-2 items-center">
          <Input
            type="number"
            placeholder="Min"
            value={filters.priceMin ?? ''}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceMin: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
            className="w-full"
          />
          <span className="text-gray-400">-</span>
          <Input
            type="number"
            placeholder="Max"
            value={filters.priceMax ?? ''}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceMax: e.target.value ? Number(e.target.value) : undefined,
              }))
            }
            className="w-full"
          />
        </div>
      </div>

      {/* Medium Filter */}
      <div>
        <h3 className="font-semibold text-sm text-gray-900 mb-3">Medium</h3>
        <div className="relative">
          <select
            value={filters.medium}
            onChange={(e) => setFilters((prev) => ({ ...prev, medium: e.target.value }))}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          >
            <option value="">All Mediums</option>
            {mediums.map((medium) => (
              <option key={medium} value={medium}>
                {medium}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="outline" onClick={clearFilters} className="w-full">
          <X className="h-4 w-4 mr-2" />
          Clear Filters
        </Button>
      )}
    </div>
  )

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Art</h1>
          <p className="text-violet-100 max-w-2xl">
            Explore our curated collection of original artworks from verified artists across Europe.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 -mt-6">
        <div className="bg-white rounded-xl shadow-lg p-4 flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by artist, title, or style..."
              value={filters.query}
              onChange={(e) => setFilters((prev) => ({ ...prev, query: e.target.value }))}
              className="pl-10 h-12 text-base border-0 bg-gray-50 focus:bg-white"
            />
          </div>
          <Button
            variant="outline"
            className="lg:hidden h-12"
            onClick={() => setShowMobileFilters(true)}
          >
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: e.target.value as SearchFilters['sortBy'],
                }))
              }
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="font-bold text-lg mb-6">Filters</h2>
              <FilterSidebar />
            </div>
          </aside>

          {/* Artwork Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{filteredArtworks.length}</span>{' '}
                artworks found
              </p>
              {/* Mobile Sort */}
              <div className="md:hidden">
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as SearchFilters['sortBy'],
                    }))
                  }
                  className="px-3 py-2 rounded-lg border border-gray-200 text-sm bg-white"
                >
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            {filteredArtworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredArtworks.map((artwork) => (
                  <Link key={artwork.id} to={`/artwork/${artwork.id}`}>
                    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        <img
                          src={artwork.images[0]}
                          alt={artwork.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <button
                          onClick={(e) => toggleFavorite(artwork.id, e)}
                          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all ${
                            favorites.has(artwork.id)
                              ? 'bg-red-500 text-white'
                              : 'bg-white/80 text-gray-600 hover:bg-white hover:text-red-500'
                          }`}
                        >
                          <Heart
                            className={`h-5 w-5 ${favorites.has(artwork.id) ? 'fill-current' : ''}`}
                          />
                        </button>
                        {artwork.edition && (
                          <Badge className="absolute bottom-3 left-3 bg-black/70 text-white hover:bg-black/70">
                            Edition {artwork.edition.number}/{artwork.edition.total}
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h3 className="font-semibold text-gray-900 truncate group-hover:text-violet-600 transition-colors">
                              {artwork.title}
                            </h3>
                            <p className="text-sm text-gray-500 truncate">{artwork.artist.name}</p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <span className="font-bold text-lg text-gray-900">
                            {artwork.currency === 'EUR' ? '\u20AC' : artwork.currency}
                            {artwork.price.toLocaleString()}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {artwork.category}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No artworks found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Overlay */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilters(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-white shadow-xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg">Filters</h2>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <FilterSidebar />
              <div className="mt-6 pt-6 border-t">
                <Button
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                  onClick={() => setShowMobileFilters(false)}
                >
                  Show {filteredArtworks.length} Results
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
