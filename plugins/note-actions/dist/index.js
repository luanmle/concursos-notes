// plugins/note-actions/src/index.ts
import path from "node:path";
import fs from "node:fs/promises";
var NoteActionsEmitter = () => ({
  name: "NoteActionsRawMd",
  async emit(ctx, content) {
    const emitted = [];
    for (const [, file] of content) {
      const data = file.data ?? {};
      const filePath = data.filePath;
      const slug = data.slug;
      const frontmatter = data.frontmatter ?? {};
      if (!filePath || !slug) continue;
      if (frontmatter.password) continue;
      try {
        const src = await fs.readFile(path.resolve(filePath), "utf8");
        const dest = path.join(ctx.argv.output, slug + ".md");
        await fs.mkdir(path.dirname(dest), { recursive: true });
        await fs.writeFile(dest, src);
        emitted.push(dest);
      } catch {
      }
    }
    return emitted;
  },
  async *partialEmit() {
  }
});
var index_default = NoteActionsEmitter;
export {
  index_default as default
};
