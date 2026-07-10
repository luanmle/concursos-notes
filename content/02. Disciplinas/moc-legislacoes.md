---
title: Legislações — MOC
tipo: moc
disciplina: Legislações
tags:
  - moc
  - disciplina/legislacoes
---

## 📝 Notas da disciplina

As notas com a tag `#disciplina/legislacoes` aparecem aqui automaticamente:

```dataview
TABLE assunto AS "Assunto", topico AS "Tópico"
FROM #disciplina/legislacoes
WHERE tipo = "estudo-concurso"
SORT topico ASC
```

### Por tópico

```dataview
LIST
FROM #disciplina/legislacoes
WHERE tipo = "estudo-concurso"
GROUP BY topico
```

---

## 🗂️ Ementa

> [!note] Em construção
> Adicione aqui os tópicos e subtópicos da disciplina conforme montar o edital.
