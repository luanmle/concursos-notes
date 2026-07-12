<%*
const nomeDisciplina = await tp.system.prompt("Nome da disciplina (Ex: Direito Administrativo):");
const tagDisciplina = nomeDisciplina.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-");
await tp.file.rename(`moc-${tagDisciplina}`);
-%>
---
title: "<% nomeDisciplina %> — MOC"
tipo: moc
disciplina: "<% nomeDisciplina %>"
tags:
  - moc
  - disciplina/<% tagDisciplina %>
---

## 📝 Notas da disciplina

As notas criadas com a tag `#disciplina/<% tagDisciplina %>` aparecem aqui automaticamente:

```dataview
TABLE aliases[0] AS "Assunto", topico AS "Tópico"
FROM #disciplina/<% tagDisciplina %>
WHERE tipo = "estudo-concurso"
SORT topico ASC
```

### Por tópico

```dataview
LIST
FROM #disciplina/<% tagDisciplina %>
WHERE tipo = "estudo-concurso"
GROUP BY topico
```

---

## 🗂️ Ementa (tópicos e subtópicos)

| Tópicos e Subtópicos de <% nomeDisciplina %> |
| :--- |
| **1.** |
| ↳ |
