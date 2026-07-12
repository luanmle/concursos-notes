---
title: Tecnologia da Informação — MOC
tipo: moc
disciplina: Tecnologia da Informação
tags: [moc, disciplina/tecnologia-da-informacao]
---
## 1. Banco de Dados e SQL

- **1.1.** Conceitos básicos, arquitetura e independência de dados
- **1.2.** Modelagem de dados e Modelo Entidade-Relacionamento (MER/DER)
- **1.3.** Modelo Relacional e Normalização (1FN, 2FN e 3FN)
- **1.4.** Linguagem SQL: consultas avançadas, agrupamentos, junções (joins) e subconsultas
- **1.5.** Comandos SQL: DDL (Data Definition Language), DML (Data Manipulation Language), DCL (Data Control Language) e TCL (Transaction Control Language)
- **1.6.** Bancos de dados não relacionais (NoSQL): conceitos e tipos (Chave-valor, Documento, Grafo, Colunar)

## 2. Análise de Dados, Ciência de Dados e Big Data

- **2.1.** Conceitos e características de Big Data (os 5 V's)
- **2.2.** Business Intelligence (BI): conceitos, Data Warehouse, Data Mart e Data Lake
- **2.3.** Modelagem Dimensional: Star Schema e Snowflake
- **2.4.** Processos de ETL (Extract, Transform, Load) e processamento analítico (OLAP)
- **2.5.** Linguagens para análise de dados: conceitos fundamentais de Python (bibliotecas Pandas, NumPy e Scikit-learn) e R
- **2.6.** Mineração de Dados (Data Mining) e Descoberta de Conhecimento em Bancos de Dados (KDD)
- **2.7.** Aprendizado de Máquina (Machine Learning): conceitos de aprendizado supervisionado (classificação e regressão) e não supervisionado (clusterização)

## 3. Governança e Gestão de TI

- **3.1.** COBIT (versões 5 e 2019): princípios, conceitos, componentes e objetivos de governança e gestão
- **3.2.** ITIL (versão 4): conceitos fundamentais, sistema de valor de serviço, quatro dimensões e práticas de gestão
- **3.3.** Gestão de Projetos Ágeis: conceitos, papéis, artefatos e cerimônias do Scrum e princípios do Kanban

## 4. Engenharia de Software e Arquitetura de Sistemas

- **4.1.** Ciclo de vida do software e processos de desenvolvimento
- **4.2.** Engenharia de requisitos: elicitação, análise, especificação e validação
- **4.3.** Arquitetura orientada a serviços (SOA) e arquitetura de Microsserviços
- **4.4.** Interface de Programação de Aplicações (APIs): padrões REST e SOAP
- **4.5.** Formatos de intercâmbio de dados: JSON e XML

## 5. Segurança da Informação

- **5.1.** Conceitos básicos: confidencialidade, integridade, disponibilidade, autenticidade e não repúdio
- **5.2.** Políticas de segurança e normas de gestão (Família ISO/IEC 27000)
- **5.3.** Criptografia simétrica e assimétrica
- **5.4.** Assinaturas digitais, certificados digitais e Infraestrutura de Chaves Públicas (ICP-Brasil)
- **5.5.** Ameaças, vulnerabilidades e malwares (Ransomware, Phishing, Engenharia Social)
- **5.6.** Gestão de identidade e controle de acesso

## 6. Infraestrutura e Computação em Nuvem (Cloud Computing)

- **6.1.** Computação em Nuvem: conceitos, características essenciais e benefícios
- **6.2.** Modelos de serviço: IaaS (Infraestrutura), PaaS (Plataforma) e SaaS (Software)
- **6.3.** Modelos de implantação: nuvem pública, privada, comunitária e híbrida
- **6.4.** Redes de computadores: arquitetura TCP/IP, modelo de referência OSI e principais protocolos de aplicação


## Notas da disciplina

```dataview
TABLE aliases[0] AS "Assunto", topico AS "Tópico"
FROM #disciplina/tecnologia-da-informacao
WHERE tipo = "estudo-concurso"
SORT topico ASC
```
