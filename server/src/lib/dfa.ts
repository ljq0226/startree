export function constructDFA(words: string[]): Record<string, any> {
  const root: Record<string, any> = {}

  for (const word of words) {
    let currentNode = root
    for (let i = 0; i < word.length; i++) {
      const char = word[i]
      currentNode[char] = currentNode[char] || {}
      currentNode = currentNode[char]
    }
    currentNode.isEnd = true
  }

  return root
}

export function filterSensitiveWords(text: string, dfa: Record<string, any>): string {
  let currentNode = dfa
  let result = ''
  let startIndex = 0
  let currentIndex = 0

  while (currentIndex < text.length) {
    const char = text[currentIndex]
    if (currentNode[char]) {
      currentNode = currentNode[char]
      if (currentNode.isEnd) {
        result += '*'.repeat(currentIndex - startIndex + 1)
        startIndex = currentIndex + 1
        currentNode = dfa
      }
      currentIndex++
    }
    else {
      result += text[startIndex]
      currentIndex = startIndex + 1
      startIndex = currentIndex
      currentNode = dfa
    }
  }

  result += text.slice(startIndex)
  return result
}

// const sensitiveWords = ['apple', 'banana', 'orange']
// const dfa = constructDFA(sensitiveWords)

// const filteredText = filterSensitiveWords('I like apple and banana.', dfa)
// console.log(filteredText) // Output: "I like ***** and ******."
