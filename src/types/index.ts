export interface Artist {
  id: string
  name: string
  bio: string
  avatar: string
  location: string
  verified: boolean
  rating: number
  totalSales: number
  joinedDate: string
}

export interface Artwork {
  id: string
  title: string
  artist: Artist
  description: string
  price: number
  currency: string
  images: string[]
  category: string
  medium: string
  dimensions: {
    width: number
    height: number
    unit: string
  }
  year: number
  edition?: {
    number: number
    total: number
  }
  provenance: ProvenanceRecord[]
  tags: string[]
  views: number
  favorites: number
  createdAt: string
}

export interface ProvenanceRecord {
  id: string
  event: 'created' | 'sold' | 'exhibited' | 'authenticated' | 'transferred'
  date: string
  description: string
  verifiedBy?: string
  blockchainTxId?: string
}

export interface SearchFilters {
  query: string
  category?: string
  priceMin?: number
  priceMax?: number
  medium?: string
  sortBy: 'newest' | 'price_asc' | 'price_desc' | 'popular'
}
