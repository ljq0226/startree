import './Editor.css'
import React, { useEffect, useReducer, useRef } from 'react'
import { EditorView } from 'prosemirror-view'
import { createDoc, createPmState, schema } from '@/lib'

interface Props {
  html: string
  setHtml: React.Dispatch<React.SetStateAction<string>>
  setActive: (v: boolean) => void
}

function Editor({ setActive, html, setHtml }: Props) {
  const [_, forceUpdate] = useReducer(x => x + 1, 0)
  const elContentRef = useRef<HTMLDivElement | null>(null)
  const editorViewRef = useRef<EditorView>()

  useEffect(() => {
    const doc = createDoc(html, schema)
    // 2.创建 prosemirror state
    const state = createPmState(schema, { doc })
    // 3.创建 EditorView 视图实例
    const editorView = new EditorView(elContentRef.current, {
      state,
      // 处理编辑器中的事务（transaction），并在每次事务应用后更新编辑器的状态，并调用 onChangeHtml 回调函数通知外部编辑器内容的变化。
      dispatchTransaction(transaction) {
        const newState = editorView.state.apply(transaction)
        editorView.updateState(newState)
        setHtml(editorView.dom.innerHTML)
        forceUpdate()
      },
    })
    editorViewRef.current = editorView
    forceUpdate()

    return () => {
      editorView.destroy()
    }
  }, [])
  return (
    <div className="relative min-h-[120px] max-h-[400px] "
      onFocus={() => {
        setActive(true)
      }}
      onBlur={() => setActive(false)}
    >
      {/* {editorViewRef.current && (
        // <EditorMenu editorView={editorViewRef.current} />
      )} */}
      {html && <p placeholder='What'></p>}
      <div ref={elContentRef} />
    </div>
  )
}

export default Editor
