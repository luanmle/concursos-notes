import type { QuartzTransformerPlugin } from "@quartz-community/types"

interface MdNode {
  type: string
  lang?: string | null
  value?: string
  children?: MdNode[]
}

/**
 * Transformer: substitui blocos ```dataview por um placeholder
 * <div class="dataview-lite" data-query="<base64>">. O componente DataviewLite
 * injeta um índice JSON do site e um script que interpreta o subconjunto
 * suportado da linguagem (TABLE/LIST, FROM #tag|"pasta", WHERE, SORT, GROUP BY)
 * e renderiza o resultado no lugar do placeholder.
 */
const DataviewLiteTransformer: QuartzTransformerPlugin = () => ({
  name: "DataviewLite",
  markdownPlugins() {
    return [
      () => (tree: MdNode, file: { data: Record<string, unknown> }) => {
        const replaceIn = (node: MdNode) => {
          if (!node.children) return
          for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i]
            if (child.type === "code" && child.lang === "dataview" && child.value) {
              const b64 = Buffer.from(child.value, "utf8").toString("base64")
              node.children[i] = {
                type: "html",
                value: `<div class="dataview-lite" data-query="${b64}"><p class="dataview-lite-loading">Carregando consulta Dataview…</p></div>`,
              }
              file.data.dataviewLite = true
            } else {
              replaceIn(child)
            }
          }
        }
        replaceIn(tree)
      },
    ]
  },
})

export default DataviewLiteTransformer
