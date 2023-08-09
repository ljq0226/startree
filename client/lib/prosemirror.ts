import type { Node, Schema } from 'prosemirror-model'
import { DOMParser } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import { history, redo, undo } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { baseKeymap, toggleMark } from 'prosemirror-commands'

export function createDoc<T extends Schema>(html: string, pmSchema: T) {
  const element = document.createElement('div')
  element.innerHTML = html
  return DOMParser.fromSchema(pmSchema).parse(element)
}
export function createPmState<T extends Schema>(pmSchema: T,
  options: { doc?: Node } = {}) {
  return EditorState.create({
    doc: options.doc,
    schema: pmSchema,
    plugins: [
      history(),
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-Shift-z': redo,
      }),
      keymap({
        'Mod-b': toggleMark(pmSchema.marks.strong),
        'Mod-i': toggleMark(pmSchema.marks.em),
        'Mod-u': toggleMark(pmSchema.marks.underline),
      }),
      keymap({
        Enter: baseKeymap.Enter,
        Backspace: baseKeymap.Backspace,
      }),
    ],
  })
}
