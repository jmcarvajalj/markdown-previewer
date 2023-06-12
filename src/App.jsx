/* eslint-disable react/prop-types */
import { useState } from "react"
import marked from "marked"

marked.setOptions({
  gfm: true,
  breaks: true,
});

export default function App() {
  return (
    <div className="container">
      <h1>Markdown Previewer</h1>
      <Editor />
    </div>
  )
}

function Editor() {

  const defaultMarkdownPreview = `# Sample Markdown Header Level

## Sample Header Level 2

### Link

Here's a link to [Codepen](https://codepen.io).

### Code Block

1.  Open the file.
2.  Find the following code block on line 21:

        <html>
          <head>
            <title>Test</title>
          </head>

3.  Update the title to match the name of your website.

### Inline Code

I think you should use an \`<addr>\` element here instead.

### List

- First item
- Second item

### Blockquote

> Dorothy followed her through many of the beautiful rooms in her castle.

### Image

![Markdown Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Markdown-mark.svg/208px-Markdown-mark.svg.png "Markdown Logo")

### Bold Text

I just love **bold text**.`

  const [state, setState] = useState({
    previewMarkdown: defaultMarkdownPreview
  })

  function markdownProcess(e) {
    setState({
      previewMarkdown: e.target.value
    })
  }

  return (
    <div>
      <div className="form">
        <p className="mt-5 mb-5 alert alert-secondary">Type your Markdown-formatted text in the input area. It will be instantly transformed to HTML.</p>

        <textarea className="form-control" id="editor" rows="10" value={state.previewMarkdown} onChange={markdownProcess} />
      </div>
      <Preview markdown={state.previewMarkdown} />
    </div>
  )
}

function Preview(props) {

  function rawMarkup() {
    let rawMarkup = marked(props.markdown, { sanitize: true })
    return { __html: rawMarkup }
  }

  return (
    <div className="parsed">
      <h2 className="mt-5 mb-5 border-bottom">Parsed Markdown</h2>

      <div id="preview" className="html__preview border rounded mb-5" dangerouslySetInnerHTML={rawMarkup()} />
    </div>
  )
}