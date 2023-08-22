import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import IntroMarkDown from './intro.md'

// eslint-disable-next-line import/no-mutable-exports
let Html = ''
main().then((res) => {
  Html = res
})

async function main() {
  const file = await unified()
    .use(remarkParse as any) // Convert into markdown AST
    .use(remarkRehype as any) // Transform to HTML AST
    .use(rehypeSanitize as any) // Sanitize HTML input
    .use(rehypeStringify as any) // Convert AST into serialized HTML
    .process(IntroMarkDown)
  return String(file)
}
export {
  Html,
}
