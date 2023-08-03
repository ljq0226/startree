import EditPost from '../post/EditPost'
import Post from '../post/Post'

function Home() {
  return (
    <div className="flex flex-col w-full h-full mx-4">
      <div className="h-6"></div>
      <EditPost />
      {/* <div className="flex-1"></div> */}
      <div className="flex flex-col">
        <Post />
        <Post />
      </div>
    </div>
  )
}

export default Home
