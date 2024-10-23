import { QuartzTransformerPlugin } from "../types"
import { Root } from "mdast"
import { visit } from "unist-util-visit"

export const Plugin: QuartzTransformerPlugin = () => ({
  name: "Plugin",
  markdownPlugins() {
    return [
      () => (tree: Root, _file) => {
        visit(tree, "code", (node) => {
          if (node.lang === "tabs") {
            node.type = "html" as "code"
            node.value = `<p>some new html and your old codeblock: ${node.value}</p>`
          }
        })
      },
    ]
  },
})