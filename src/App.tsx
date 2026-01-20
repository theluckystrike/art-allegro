import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from '@/pages/HomePage'
import GalleryPage from '@/pages/GalleryPage'
import ArtworkPage from '@/pages/ArtworkPage'
import Layout from '@/components/Layout'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="artwork/:id" element={<ArtworkPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
