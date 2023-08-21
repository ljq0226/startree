import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

interface Props {
  setShowEmoji: (v: boolean) => void
  editorTarget: HTMLDivElement | null
  className?: string
}

function EmojiPanel({ className, editorTarget, setShowEmoji }: Props) {
  return (
    <div className={`absolute  z-[20] left-[0px] top-[38px] ${className}`}>
      <Picker data={data}
        onEmojiSelect={(emoji: any) => {
          const spanNode = `<span>${emoji.native}</span>`
          if (editorTarget)
            editorTarget.innerHTML += spanNode
        }}
        onClickOutside={() => {
          setShowEmoji(false)
        }}
      />

    </div>

  )
}
export default EmojiPanel
