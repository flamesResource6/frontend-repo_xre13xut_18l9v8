import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Hero from './components/Hero'
import HomeTab from './components/HomeTab'
import AlbumTab from './components/AlbumTab'
import ExploreTab from './components/ExploreTab'
import ProfileTab from './components/ProfileTab'

function App() {
  return (
    <Layout>
      <Hero />
      <Routes>
        <Route path="/" element={<HomeTab />} />
        <Route path="/album" element={<AlbumTab />} />
        <Route path="/explore" element={<ExploreTab />} />
        <Route path="/profile" element={<ProfileTab />} />
      </Routes>
    </Layout>
  )
}

export default App
