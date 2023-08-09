import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

interface Props {
  updateHtml: (v: string) => void
  setShowEmoji: (v: boolean) => void
  className?: string
}

function EmojiPanel({ updateHtml, className, setShowEmoji }: Props) {
  return (
    <div className={`absolute z-10 -left-[150px] top-[38px] ${className}`}>
      <Picker data={data}
        onEmojiSelect={(emoji: any) => {
          const spanNode = `<span>${emoji.native}<span>`
          updateHtml(spanNode)
        }}
        onClickOutside={() => {
          setShowEmoji(false)
        }}
      />

    </div>

  )
}
export default EmojiPanel
