import { Html } from './mdToHtml'
import Aside from '@/components/aside/Aside'
import './index.css'

export default function App() {
  return (
    <>
      <div className="main-container">
        <div className='markdown-body' dangerouslySetInnerHTML={{ __html: Html }}></div>

      </div>

      <Aside />
    </>

  )
}
