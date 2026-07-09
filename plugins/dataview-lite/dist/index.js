// plugins/dataview-lite/src/index.ts
var DataviewLiteTransformer = () => ({
  name: "DataviewLite",
  markdownPlugins() {
    return [
      () => (tree, file) => {
        const replaceIn = (node) => {
          if (!node.children) return;
          for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            if (child.type === "code" && child.lang === "dataview" && child.value) {
              const b64 = Buffer.from(child.value, "utf8").toString("base64");
              node.children[i] = {
                type: "html",
                value: `<div class="dataview-lite" data-query="${b64}"><p class="dataview-lite-loading">Carregando consulta Dataview\u2026</p></div>`
              };
              file.data.dataviewLite = true;
            } else {
              replaceIn(child);
            }
          }
        };
        replaceIn(tree);
      }
    ];
  }
});
var index_default = DataviewLiteTransformer;
export {
  index_default as default
};
