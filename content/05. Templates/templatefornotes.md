<%*
const id = tp.date.now("YYYYMMDDHHmm");
const nomeDisciplina = await tp.system.prompt("Digite o nome da disciplina (Ex: Direito Tributário):");
const tituloNota = await tp.system.prompt("Digite o assunto da nota (Ex: Impostos Federais):");

const nomeCompleto = `${id} - ${tituloNota}`;
await tp.file.rename(nomeCompleto);

const tituloLimpo = `${nomeDisciplina} | ${tituloNota}`;
// Formata a tag: remove acentos, espaços viram hifens e fica tudo minúsculo
const tagDisciplina = nomeDisciplina.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-");
-%>
---
aliases:
  - "<% tituloNota %>"
  - "<% tituloLimpo %>"
ID: "#zettelkasten/<% id %>"
titulo_limpo: "<% tituloLimpo %>"
tipo: estudo-concurso
disciplina: "<% nomeDisciplina %>"
assunto: "<% tituloNota %>"
fonte: # Videoaula, PDF, Cursinho
professor: 
data_criacao: <% tp.file.creation_date("YYYY-MM-DD HH:mm") %>
ultima_revisao: <% tp.file.creation_date("YYYY-MM-DD") %>
tags:
  - concurso/materia
  - disciplina/<% tagDisciplina %>
---

# <% tituloLimpo %>

## 📌 Resumo Direto & Gatilhos de Memória
> [!abstract] Resumo do Tópico
> Espaço para uma síntese objetiva do conteúdo, focando no que é essencial para revisões rápidas pré-prova.

* **Ponto-Chave 1:** 
* **Ponto-Chave 2:** 

---

## 📝 Anotações da Aula / PDF

### 1. Conceitos Fundamentais
* 

### 2. Regra Geral vs. Exceção (Foco em Concursos)
* **Regra:** 
* **⚠️ EXCEÇÃO:** 

---

## ❌ Caderno de Pegadinhas & Detalhes da Banca
> [!danger] Atenção com as Armadilhas!
> Listagem das principais "malandragens" que as bancas costumam aplicar neste assunto (prazos inversos, troca de palavras-chave, omissões).

1. 
2. 

---

## 🔗 Referências Coletivas
* [[Dashboard Concursos|⬅️ Voltar para o Dashboard Geral]]