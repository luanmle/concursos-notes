# Configuração da vault no Obsidian

Este guia prepara o fluxo de criação de notas após clonar o repositório em outro computador.

As configurações locais do Obsidian ficam em `content/.obsidian` e não são versionadas. Isso evita sincronizar estado da interface, abas abertas e preferências específicas da máquina, mas exige a configuração manual descrita abaixo.

## 1. Pré-requisitos

- [Obsidian](https://obsidian.md/) instalado.
- Repositório clonado localmente.
- Acesso à internet para instalar os plugins comunitários.

Para visualizar também o site Quartz localmente, use Node.js 22 ou superior e npm 10.9.2 ou superior.

## 2. Abrir a pasta correta como vault

No Obsidian, selecione **Abrir pasta como cofre** e escolha somente a pasta:

```text
concursos-notes/content
```

Não abra a raiz `concursos-notes` como vault. Os caminhos dos templates e as regras deste guia consideram `content/` como raiz.

## 3. Habilitar plugins comunitários

No Obsidian:

1. Abra **Configurações → Plugins da comunidade**.
2. Caso necessário, desative o modo restrito.
3. Selecione **Explorar**.
4. Instale e habilite:
   - **Templater**;
   - **Dataview**.

O Templater automatiza a criação das notas. O Dataview monta as listas e tabelas dentro do Obsidian. No site publicado, consultas compatíveis são processadas pelo plugin local Dataview Lite do Quartz.

## 4. Configurar o Templater

Abra **Configurações → Templater** e configure:

### Template folder location

```text
05. Templates
```

### Trigger Templater on new file creation

Ative esta opção para executar automaticamente o template associado à pasta onde a nota foi criada.

### Folder Templates

Ative **Enable Folder Templates** e cadastre as regras abaixo:

| Pasta | Template |
|---|---|
| `00. Entrada` | `05. Templates/template-nota-estudo.md` |
| `01. Central de Estudos/Notas` | `05. Templates/template-nota-central.md` |
| `02. Disciplinas` | `05. Templates/template-moc-disciplina.md` |

Se `01. Central de Estudos/Notas` ainda não existir, crie essa pasta pelo explorador de arquivos do Obsidian antes de cadastrar a regra.

Caso o Templater permita reordenar as regras, mantenha a regra mais específica da Central antes de regras mais genéricas.

## 5. Configurar a criação de novos arquivos

Abra **Configurações → Arquivos e links**.

Em **Local padrão para novas notas**, selecione uma pasta específica e informe:

```text
00. Entrada
```

Assim, notas de estudo comuns são criadas na Entrada e recebem automaticamente o template de estudo.

Notas da Central devem ser criadas diretamente em:

```text
01. Central de Estudos/Notas
```

## 6. Fluxo de notas de estudo

Crie uma nota em `00. Entrada`. O template `template-nota-estudo.md` deve iniciar automaticamente.

O fluxo solicita:

1. disciplina;
2. tópico;
3. subtópico;
4. assunto da nota.

Disciplinas, tópicos e subtópicos cadastrados são carregados de:

```text
05. Templates/catalogo-disciplinas.json
```

O template gera o nome do arquivo, frontmatter, tags e link para o MOC da disciplina. O MOC passa a listar a nota automaticamente.

## 7. Fluxo da Central de Estudos

Crie uma nota dentro de `01. Central de Estudos/Notas`. O template `template-nota-central.md` deve iniciar automaticamente.

Categorias disponíveis:

- Dica;
- Edital verticalizado;
- Planejamento;
- Pós-edital em andamento.

Conforme a categoria, o template também pode solicitar concurso, status e data da prova. A nota recebe uma tag `central/<categoria>` e passa a aparecer no MOC correspondente.

## 8. Criação de MOCs de disciplina

Ao criar uma nota diretamente em `02. Disciplinas`, o template de MOC é executado.

Antes de confirmar o nome, verifique se a disciplina já possui um MOC. Duplicar MOCs com grafias diferentes fragmenta as consultas e os links.

Para disciplinas já presentes no dashboard, prefira editar o MOC existente.

## 9. Teste da configuração

### Teste de estudo

1. Crie uma nota temporária em `00. Entrada`.
2. Confirme que aparece a seleção de disciplina.
3. Escolha disciplina, tópico e subtópico.
4. Confirme que o arquivo foi renomeado e recebeu `tipo: estudo-concurso`.
5. Verifique se a tag `disciplina/<nome>` foi criada.

### Teste da Central

1. Crie uma nota temporária em `01. Central de Estudos/Notas`.
2. Confirme que aparece a seleção de categoria.
3. Escolha uma categoria.
4. Confirme que o arquivo recebeu `tipo: central-de-estudos`.
5. Verifique a tag `central/<categoria>`.

Exclua as notas temporárias depois do teste.

## 10. Visualizar o Quartz localmente

Na raiz do repositório, execute:

```bash
npm install
npx quartz build --serve
```

Acesse:

```text
http://localhost:8080
```

O servidor recompila o site automaticamente quando uma nota é salva.

## 11. Publicar alterações

Antes de sincronizar, confira os arquivos que serão enviados:

```bash
git status
```

Depois use o fluxo Git habitual ou:

```bash
npx quartz sync --message "atualiza notas"
```

Um push para a branch `v5` dispara o deploy no GitHub Pages.

O comando `quartz sync` adiciona todas as mudanças do repositório, não apenas notas. Sempre revise `git status` antes de executá-lo.

## 12. O que não é sincronizado

Como `.obsidian` está no `.gitignore`, não são enviados ao GitHub:

- plugins instalados localmente;
- regras locais do Templater;
- atalhos;
- abas e painéis abertos;
- preferências visuais;
- cache do Obsidian.

Os arquivos em `05. Templates`, o catálogo JSON, os MOCs e as notas são versionados normalmente.

## Solução de problemas

### O template não inicia ao criar uma nota

- Confirme que o Templater está instalado e habilitado.
- Confirme que **Trigger Templater on new file creation** está ativo.
- Confira a grafia da pasta na regra de Folder Templates.
- Confira se o caminho do template termina em `.md`.
- Confirme que `content/` foi aberta como raiz da vault.

### A lista de disciplinas não aparece

- Confirme a existência de `05. Templates/catalogo-disciplinas.json`.
- Verifique se o JSON não contém vírgula sobrando ou erro de sintaxe.
- Reabra o Obsidian depois de alterar configurações do Templater.

### A nota não aparece no MOC

- Confira o campo `tipo`.
- Confira a propriedade `categoria` ou `disciplina`.
- Confira a tag `central/<categoria>` ou `disciplina/<nome>`.
- No Obsidian, confirme que o Dataview está habilitado.
- No site, faça um novo build e recarregue a página.

### O site não atualiza no GitHub Pages

- Confirme que o commit foi enviado para `v5`.
- Consulte a execução de **Deploy Quartz site to GitHub Pages** em GitHub Actions.
- Verifique se o build terminou sem erros.
