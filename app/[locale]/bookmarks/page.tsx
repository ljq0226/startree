import Aside from '@/components/aside/Aside'

export default function App() {
  return (
    <>
      <div className="flex flex-col main-container">
        <div className="hidden h-6 xl:block"></div>
        <div className="flex p-6 flex-center">
          End of the list
        </div>
      </div>
      <Aside />
    </>

  )
}
