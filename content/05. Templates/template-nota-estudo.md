<%*
const id = tp.date.now("YYYYMMDDHHmm");
const nomeDisciplina = await tp.system.prompt("Digite o nome da disciplina (Ex: Direito Tributário):");
const tituloNota = await tp.system.prompt("Digite o assunto da nota (Ex: Impostos Federais):");
const topico = await tp.system.prompt("Tópico da ementa (Ex: 2. Direitos e Garantias Fundamentais):");
const subtopico = await tp.system.prompt("Subtópico (opcional, Ex: Remédios Constitucionais):");

const nomeCompleto = `${id} - ${tituloNota}`;
await tp.file.rename(nomeCompleto);

const tituloLimpo = `${nomeDisciplina} | ${tituloNota}`;
// Formata a tag: remove acentos, espaços viram hífens e fica tudo minúsculo
const tagDisciplina = nomeDisciplina.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, "-");
-%>
---
title: "<% tituloLimpo %>"
aliases:
  - "<% tituloNota %>"
ID: "<% id %>"
tipo: estudo-concurso
disciplina: "<% nomeDisciplina %>"
assunto: "<% tituloNota %>"
topico: "<% topico %>"
subtopico: "<% subtopico %>"
fonte: # Videoaula, PDF, Cursinho
professor:
data_criacao: <% tp.file.creation_date("YYYY-MM-DD HH:mm") %>
ultima_revisao: <% tp.file.creation_date("YYYY-MM-DD") %>
tags:
  - concurso/materia
  - disciplina/<% tagDisciplina %>
---

## 📌 Resumo Direto & Gatilhos de Memória

> [!abstract] Resumo do Tópico
> Espaço para uma síntese objetiva do conteúdo, focando no que é essencial para revisões rápidas pré-prova.

- **Ponto-Chave 1:**
- **Ponto-Chave 2:**

---

## 📝 Anotações da Aula / PDF

### 1. Conceitos Fundamentais

-

### 2. Regra Geral vs. Exceção (Foco em Concursos)

- **Regra:**
- **⚠️ EXCEÇÃO:**

---

## ❌ Caderno de Pegadinhas & Detalhes da Banca

> [!danger] Atenção com as Armadilhas!
> Listagem das principais "malandragens" que as bancas costumam aplicar neste assunto (prazos inversos, troca de palavras-chave, omissões).

1.
2.

---

## 🔗 Referências

- [[index|⬅️ Voltar para o Dashboard]]
- MOC da disciplina: [[moc-<% tagDisciplina %>]]
