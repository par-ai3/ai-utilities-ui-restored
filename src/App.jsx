import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SocialMediaGenerator from './pages/SocialMediaGenerator'
import HRPolicies from './pages/HRPolicies'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/social-media-Generator" element={<SocialMediaGenerator />} />
      <Route path="/hr-policies" element={<HRPolicies />} />
    </Routes>
  )
}
