import Aside from '@/components/aside/Aside'
import Home from '@/components/home/Home'

export default function App() {
  return (
    <>
      <div className="flex flex-col main-container">
        <Home />
      </div>
      <Aside />
    </>

  )
}
