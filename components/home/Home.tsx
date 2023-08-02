import EditPost from '../post/EditPost'

function Home() {
  return (
    <div className="flex flex-col w-full h-full mx-4">
      <div className="h-6"></div>
      <EditPost />
      <div className="flex-1"></div>
      <div className="flex">Content</div>
    </div>
  )
}

export default Home
