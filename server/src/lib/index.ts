export function checkTag(content: string) {
  const regex = /(data-tag="([^"]+)")/g
  const matches = content.matchAll(regex)
  const tags = Array.from(matches, (match) => {
    // return match[1].slice(10, match[1].length - 1)
    return match[1].slice(10, -1)
  })
  const regex2 = /#(\w+)\s/g
  const matches2 = content.match(regex2)
  const tags2 = matches2 ? matches2.map(match => match.trim().replace('#', '')) : []
  return [tags, tags2]
}

export function createTag(notExistTags: string[], content: string) {
  let newContent = content
  notExistTags.map((item) => {
    newContent = newContent.replace(`#${item}`, `<a class="text-primary" contenteditable="false" href="/tag/${item}" style="display: inline-block;"><span contenteditable="false" style="white-space: pre;"></span><span class="tag-button" contenteditable="false" data-tag="${item}" style="display: inline-block;">#${item}</span><span contenteditable="false" style="white-space: pre;"></span></a>`)
    return null
  })
  return newContent
}
