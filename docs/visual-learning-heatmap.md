# ENGELAB — Mapa de Calor Visual para Aprendizado Guiado

## Objetivo

Este documento registra as decisões aplicadas no refinamento visual da plataforma ENGELAB.

A regra central é:

> O ponto mais quente da tela deve ser sempre a próxima ação pedagógica.

A interface deve conduzir o aluno, não apenas mostrar recursos.

---

## Escala de atenção visual

| Nível | Nome | Função | Elementos permitidos |
|---|---|---|---|
| P0 | Foco máximo | Fazer o aluno avançar | Próxima aula, continuar estudo, concluir etapa, continuar leitura |
| P1 | Apoio direto | Ajudar a realizar a ação | Objetivo, progresso, critérios, tempo estimado, evidência |
| P2 | Consulta | Exploração controlada | Biblioteca, materiais salvos, projetos recentes, agentes |
| P3 | Baixa atenção | Apoio secundário | Perfil, plano, administração, notificações, rodapé |

Cada tela deve ter apenas um P0.

---

## Mudanças aplicadas

### 1. Landing page pública

Refinada para comunicar:

- aprendizado guiado;
- engenharia com IA;
- método em cinco passos;
- recursos principais;
- planos;
- uso responsável.

O objetivo da landing é conversão com confiança, sem excesso de detalhes internos.

### 2. Dashboard do aluno

Reorganizado para priorizar:

1. próxima ação recomendada;
2. progresso direto da trilha;
3. atalhos rápidos secundários;
4. disciplinas e projetos recentes;
5. materiais salvos.

A próxima ação virou o bloco de maior peso visual.

### 3. Comece Aqui

Transformado em trilha guiada com:

- hero de contexto;
- progresso da trilha;
- timeline de aulas;
- estados claros: concluída, aula atual, próxima, bloqueada;
- critérios de conclusão;
- chamada para certificado.

### 4. Trilhas / Biblioteca Técnica

Reorganizada em árvore de aprendizagem com:

- filtros por tipo e status;
- próximo documento recomendado;
- progresso de leitura;
- conquistas da trilha;
- lista de documentos com status.

### 5. Meus Materiais

Transformado em “mesa de estudos organizada”:

- projetos favoritados;
- prompts salvos;
- manuais e guias;
- materiais curados;
- ações rápidas;
- acesso rápido para continuar aprendendo.

### 6. Central de Agentes

Reduzida a uma escolha orientada por tarefa:

- agentes recomendados;
- busca;
- filtro por categoria;
- cards sem excesso visual;
- botão principal “Abrir agente”;
- modal com uso, entrada e entrega.

### 7. Evolução

A evolução agora prioriza metas de aprendizagem:

- próxima meta pedagógica;
- indicadores por meta;
- badges com evidência;
- critérios de certificado.

---

## Regras de interface

### CTA único

Cada tela deve ter um CTA principal azul.

| Tela | CTA principal |
|---|---|
| Dashboard | Continuar aula |
| Comece Aqui | Continuar aula |
| Trilhas | Continuar leitura |
| Meus Materiais | Continuar estudando |
| Agentes | Abrir agente |
| Evolução | Continuar meta |

### Sidebar

A sidebar foi reorganizada em:

- Estudar;
- Criar com IA;
- Suporte;
- Administração apenas para admin.

A administração não deve competir com a jornada do aluno.

### Cores

| Cor | Uso |
|---|---|
| Azul forte | Ação principal |
| Azul suave | Seleção e estado atual |
| Verde | Concluído ou validado |
| Amarelo/laranja | Próximo ou atenção |
| Vermelho | Erro ou risco |
| Cinza | Secundário, desativado ou administrativo |

### Densidade

| Tela | Densidade recomendada |
|---|---|
| Landing | Média |
| Dashboard | Média |
| Aula/Comece Aqui | Baixa a média |
| Trilhas | Média-alta controlada |
| Meus Materiais | Média |
| Agentes | Média |
| Evolução | Baixa a média |

---

## Checklist de aprovação

- [ ] A tela tem apenas um foco P0.
- [ ] O aluno sabe o próximo passo em até 3 segundos.
- [ ] O objetivo da tela está explícito.
- [ ] A ação principal está acima da dobra.
- [ ] Os botões secundários não competem com o CTA.
- [ ] O progresso apoia a ação, sem virar distração.
- [ ] A interface não depende apenas de cor para indicar status.
- [ ] Todo uso de IA mantém aviso de responsabilidade técnica.
- [ ] A administração está separada da experiência do aluno.
- [ ] Há evidência de aprendizagem ou critério de conclusão.

---

## Arquivos alterados

- `app/page.tsx`
- `app/app/page.tsx`
- `app/app/comecar/page.tsx`
- `app/app/trilhas/page.tsx`
- `app/app/materiais/page.tsx`
- `app/app/agentes/page.tsx`
- `app/app/progresso/page.tsx`
- `components/Sidebar.tsx`
- `components/Header.tsx`
- `components/DocTree.tsx`
- `app/globals.css`

---

## Validação técnica

Build executado com sucesso usando:

```bash
npm run build
```

Resultado: compilação concluída sem erros.
