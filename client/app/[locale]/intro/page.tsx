import { Html } from './mdToHtml'
import './index.css'

export default function App() {
  return (
    <>
      <div className="flex flex-col flex-1 h-screen overflow-x-hidden overflow-y-scroll ">
        <div className='markdown-body max-w-[750px]' dangerouslySetInnerHTML={{ __html: Html }}></div>
        <div className='w-full min-h-[300px] '></div>
      </div>

    </>

  )
}
