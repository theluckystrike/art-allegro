import { Outlet, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Search, User, Heart, ShoppingCart } from 'lucide-react'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg" />
            <span className="text-xl font-bold">ArtAllegro</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/gallery" className="text-sm font-medium hover:text-violet-600 transition-colors">
              Browse Art
            </Link>
            <Link to="/gallery?category=Painting" className="text-sm font-medium hover:text-violet-600 transition-colors">
              Paintings
            </Link>
            <Link to="/gallery?category=Sculpture" className="text-sm font-medium hover:text-violet-600 transition-colors">
              Sculptures
            </Link>
            <Link to="/gallery?category=Photography" className="text-sm font-medium hover:text-violet-600 transition-colors">
              Photography
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm">
              <User className="h-4 w-4 mr-2" />
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">For Buyers</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">How It Works</a></li>
                <li><a href="#" className="hover:text-foreground">Buyer Protection</a></li>
                <li><a href="#" className="hover:text-foreground">Shipping Info</a></li>
                <li><a href="#" className="hover:text-foreground">Returns</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">For Artists</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Start Selling</a></li>
                <li><a href="#" className="hover:text-foreground">Seller Tools</a></li>
                <li><a href="#" className="hover:text-foreground">Commission Rates</a></li>
                <li><a href="#" className="hover:text-foreground">Authentication</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">About</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Our Story</a></li>
                <li><a href="#" className="hover:text-foreground">Trust & Safety</a></li>
                <li><a href="#" className="hover:text-foreground">Press</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground">Report Issue</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 ArtAllegro. Democratizing art for everyone.
            </p>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">Privacy</a>
              <a href="#" className="hover:text-foreground">Terms</a>
              <a href="#" className="hover:text-foreground">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
