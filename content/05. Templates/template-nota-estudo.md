<%*
const id = tp.date.now("YYYYMMDDHHmm");

// Aceita tanto o repositório inteiro quanto content/ como raiz da vault.
const caminhosCatalogo = [
  "content/05. Templates/catalogo-disciplinas.json",
  "05. Templates/catalogo-disciplinas.json",
];
const caminhoCatalogo = caminhosCatalogo.find((caminho) =>
  tp.app.vault.getAbstractFileByPath(caminho)
);

if (!caminhoCatalogo) {
  throw new Error("Catálogo de disciplinas não encontrado em 05. Templates.");
}

const arquivoCatalogo = tp.app.vault.getAbstractFileByPath(caminhoCatalogo);
const catalogo = JSON.parse(await tp.app.vault.read(arquivoCatalogo));
const opcaoOutro = "➕ Informar outro valor";
const opcaoSemSubtopico = "— Sem subtópico";

async function selecionarOuInformar(opcoes, titulo, pergunta, permitirVazio = false) {
  const itens = [...opcoes, ...(permitirVazio ? [opcaoSemSubtopico] : []), opcaoOutro];
  const selecionado = await tp.system.suggester(
    itens,
    itens,
    true,
    titulo
  );

  if (selecionado === opcaoSemSubtopico) return "";
  if (selecionado !== opcaoOutro) return selecionado;

  const informado = await tp.system.prompt(pergunta, "", true);
  const valor = informado?.trim();
  if (!valor && !permitirVazio) throw new Error(`${titulo} não pode ficar vazio.`);
  return valor ?? "";
}

const disciplinas = Object.keys(catalogo).sort((a, b) => a.localeCompare(b, "pt-BR"));
const nomeDisciplina = await selecionarOuInformar(
  disciplinas,
  "Selecione a disciplina",
  "Digite o nome da nova disciplina:"
);

const topicosDaDisciplina = Object.keys(catalogo[nomeDisciplina] ?? {}).sort((a, b) =>
  a.localeCompare(b, "pt-BR", { numeric: true })
);
const topico = await selecionarOuInformar(
  topicosDaDisciplina,
  `Selecione o tópico de ${nomeDisciplina}`,
  "Digite o tópico da ementa:"
);

const subtopicosDoTopico = catalogo[nomeDisciplina]?.[topico] ?? [];
const subtopico = await selecionarOuInformar(
  subtopicosDoTopico,
  `Selecione o subtópico de ${topico}`,
  "Digite o subtópico (opcional):",
  true
);

const tituloNota = (await tp.system.prompt(
  "Digite o assunto da nota (Ex: Impostos Federais):",
  "",
  true
)).trim();
if (!tituloNota) throw new Error("O assunto da nota não pode ficar vazio.");

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
