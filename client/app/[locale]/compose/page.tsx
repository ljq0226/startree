import Aside from '@/components/aside/Aside'
import EditPost from '@/components/editor/EditPost'

export default function App() {
  return (
    <>
      <div className="main-container">
        <EditPost />

      </div>
      <Aside />
    </>

  )
}
