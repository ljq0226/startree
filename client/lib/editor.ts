import type { AtUser, Tag } from '@/types'

// @ 检测
// @ 选择弹窗
// @xxx -> 替换成 <button>

// 获取光标位置
export function getCursorIndex() {
  const selection = window.getSelection()
  return selection?.focusOffset
}

// 获取节点
export function getRangeNode() {
  const selection = window.getSelection()
  return selection?.focusNode
}

export function getRangeRect() {
  const selection = window.getSelection()
  const range = selection?.getRangeAt(0) as Range
  const rect = range.getClientRects()[0]
  const LINE_HEIGHT = 30
  return {
    x: rect.x,
    y: rect.y + LINE_HEIGHT,
  }
}

// 是否展示 @
export function showAt() {
  const node = getRangeNode()
  if (!node || node.nodeType !== Node.TEXT_NODE)
    return false
  const content = node.textContent || ''
  const regx = /@([^@\s]*)$/
  const match = regx.exec(content.slice(0, getCursorIndex()))
  return match && match.length === 2 && match[1] !== ''
}

// 获取 @ 用户
export function getAtUser() {
  const content = getRangeNode()?.textContent || ''
  const regx = /@([^@\s]*)$/
  const match = regx.exec(content.slice(0, getCursorIndex()))
  if (match && match.length === 2)
    return match[1]

  return undefined
}

// 是否展示 #
export function showHash() {
  const node = getRangeNode() as Node
  const content = node.textContent || ''
  const regx = /#([^#\s]*)$/
  const match = regx.exec(content.slice(0, getCursorIndex()))
  return match && match.length === 2 && match[1] !== ''
}

// 获取 # 后 tag 名
export function getTag() {
  const content = getRangeNode()?.textContent || ''
  const regx = /#([^#\s]*)$/
  const match = regx.exec(content.slice(0, getCursorIndex()))
  if (match && match.length === 2)
    return match[1]
  return undefined
}

export function createAtButton(user: AtUser) {
  const btn = document.createElement('span')
  btn.style.display = 'inline-block'
  btn.className = 'at-button'
  btn.contentEditable = 'false'
  btn.textContent = `@${user.name}`
  const wrapper = document.createElement('a')
  wrapper.style.display = 'inline-block'
  wrapper.classList.add('text-primary')
  wrapper.contentEditable = 'false'
  wrapper.href = `/user/${user.name}`
  const spaceElem = document.createElement('span')
  spaceElem.style.whiteSpace = 'pre'
  spaceElem.textContent = '\u200B'
  spaceElem.contentEditable = 'false'
  const clonedSpaceElem = spaceElem.cloneNode(true)
  wrapper.appendChild(spaceElem)
  wrapper.appendChild(btn)
  wrapper.appendChild(clonedSpaceElem)
  return wrapper
}

export function replaceString(raw: string, replacer: string) {
  return raw.replace(/@([^@\s]*)$/, replacer)
}

export function replaceAtUser(user: AtUser) {
  const node = getRangeNode()
  if (node) {
    const content = node?.textContent || ''
    const endIndex = getCursorIndex()
    const preSlice = replaceString(content.slice(0, endIndex), '')
    const restSlice = content.slice(endIndex)
    const parentNode = node?.parentNode as ParentNode
    const nextNode = node?.nextSibling
    const previousTextNode = new Text(preSlice)
    const nextTextNode = new Text(`\u200B${restSlice}`)
    const atButton = createAtButton(user)
    parentNode.removeChild(node)
    if (nextNode) {
      parentNode.insertBefore(previousTextNode, nextNode)
      parentNode.insertBefore(atButton, nextNode)
      parentNode.insertBefore(nextTextNode, nextNode)
    }
    else {
      parentNode.appendChild(previousTextNode)
      parentNode.appendChild(atButton)
      parentNode.appendChild(nextTextNode)
    }
    const range = new Range()
    range.setStart(nextTextNode, 0)
    range.setEnd(nextTextNode, 0)
    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)
  }
}
export function replaceHashString(raw: string, replacer: string) {
  return raw.replace(/#([^#\s]*)$/, replacer)
}
export function replaceHashTags(tag: Tag) {
  const node = getRangeNode()
  if (node) {
    const content = node?.textContent || ''
    const endIndex = getCursorIndex()
    const preSlice = replaceHashString(content.slice(0, endIndex), '')
    const restSlice = content.slice(endIndex)
    const parentNode = node?.parentNode as ParentNode
    const nextNode = node?.nextSibling
    const previousTextNode = new Text(preSlice)
    const nextTextNode = new Text(`\u200B${restSlice}`)
    const atButton = createHashTags(tag)
    parentNode.removeChild(node)
    if (nextNode) {
      parentNode.insertBefore(previousTextNode, nextNode)
      parentNode.insertBefore(atButton, nextNode)
      parentNode.insertBefore(nextTextNode, nextNode)
    }
    else {
      parentNode.appendChild(previousTextNode)
      parentNode.appendChild(atButton)
      parentNode.appendChild(nextTextNode)
    }
    const range = new Range()
    range.setStart(nextTextNode, 0)
    range.setEnd(nextTextNode, 0)
    const selection = window.getSelection()
    selection?.removeAllRanges()
    selection?.addRange(range)
  }
}
export function createHashTags(tag: Tag) {
  const btn = document.createElement('span')
  btn.style.display = 'inline-block'
  btn.className = 'tag-button'
  btn.contentEditable = 'false'
  btn.dataset.tag = tag.name
  btn.textContent = `#${tag.name}`
  const wrapper = document.createElement('a')
  wrapper.style.display = 'inline-block'
  wrapper.classList.add('text-primary')
  wrapper.contentEditable = 'false'
  wrapper.href = `/tag/${tag.name}`
  const spaceElem = document.createElement('span')
  spaceElem.style.whiteSpace = 'pre'
  spaceElem.textContent = '\u200B'
  spaceElem.contentEditable = 'false'
  const clonedSpaceElem = spaceElem.cloneNode(true)
  wrapper.appendChild(spaceElem)
  wrapper.appendChild(btn)
  wrapper.appendChild(clonedSpaceElem)
  return wrapper
}
