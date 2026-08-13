import hljs from "highlight.js/lib/core"
import bash from "highlight.js/lib/languages/bash"
import css from "highlight.js/lib/languages/css"
import json from "highlight.js/lib/languages/json"
import typescript from "highlight.js/lib/languages/typescript"
import xml from "highlight.js/lib/languages/xml"

hljs.registerLanguage("bash", bash)
hljs.registerLanguage("css", css)
hljs.registerLanguage("json", json)
hljs.registerLanguage("typescript", typescript)
hljs.registerLanguage("tsx", typescript)
hljs.registerLanguage("xml", xml)

export function highlight(code, language) {
  const lang = hljs.getLanguage(language) ? language : "plaintext"
  return hljs.highlight(code, { language: lang }).value
}
