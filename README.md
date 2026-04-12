# 📸 Photo Studio Prompteer

Ferramenta open-source para **geração de prompts fotográficos** em estúdio, construída com **React + Vite**.  
O objetivo é oferecer uma interface simples e rápida para criar descrições detalhadas que podem ser usadas em fluxos criativos, IA generativa ou setups de fotografia.

---

## 🚀 Funcionalidades Principais
- Interface web moderna com **React**.
- Configuração otimizada com **Vite** para desenvolvimento rápido.
- Suporte a **TypeScript** e **JavaScript**.
- Estrutura modular para expansão futura.
- Geração de prompts personalizáveis para cenários de estúdio fotográfico.

---

## 📂 Estrutura do Projeto
- **`src/`** → Código-fonte principal (componentes React, lógica de geração de prompts).
- **`public/`** → Arquivos estáticos e assets.
- **`index.html`** → Ponto de entrada da aplicação.
- **`vite.config.js`** → Configuração do bundler Vite.
- **`tsconfig.json`** → Configuração do TypeScript.
- **`eslint.config.js`** → Regras de linting.
- **`PhotoStudioPrompteer.sln` / `.esproj`** → Arquivos de solução para integração com IDEs.
- **`README.md`** → Documentação inicial.
- **`LICENSE`** → Licença GPL-3.0.

---

## ⚙️ Tecnologias Utilizadas
- [React](https://react.dev/) – Biblioteca para construção da interface.
- [Vite](https://vitejs.dev/) – Bundler rápido com suporte a HMR.
- [TypeScript](https://www.typescriptlang.org/) – Tipagem estática opcional.
- [ESLint](https://eslint.org/) – Padronização e qualidade de código.

---

## 📦 Instalação e Uso

### 1. Clonar o repositório
```bash
git clone https://github.com/skillobyte/Photo-Studio-Prompteer.git
cd Photo-Studio-Prompteer

# 🔎 Documentação Interna – Photo Studio Prompteer

---

## 📂 Estrutura de Código

### 1. `App.tsx`
- **Função principal da aplicação.**
- Responsável por renderizar a interface base.
- Normalmente importa os componentes centrais (`PromptForm`, `PromptPreview`, etc.).
- Define o **estado global** (via `useState` ou `useReducer`) para armazenar:
  - Prompt atual.
  - Configurações do usuário (ex.: iluminação, câmera, estilo).
  - Histórico de prompts gerados.

---

### 2. `PromptForm.tsx`
- **Componente de entrada de dados.**
- Contém campos de formulário para configurar o prompt:
  - Tipo de câmera.
  - Iluminação.
  - Posição do objeto.
  - Estilo artístico.
- Usa **event handlers** (`onChange`, `onSubmit`) para atualizar o estado global.
- Funções internas:
  - `handleInputChange(field, value)` → Atualiza o estado do campo.
  - `generatePrompt()` → Monta a string final do prompt com base nas escolhas do usuário.

---

### 3. `PromptPreview.tsx`
- **Exibe o resultado do prompt gerado.**
- Recebe o prompt como `prop` e renderiza em uma área de texto ou card.
- Pode incluir botões para:
  - Copiar para área de transferência.
  - Exportar para arquivo.
  - Enviar para outro serviço (ex.: API de IA).

---

### 4. `PromptHistory.tsx`
- **Gerencia histórico de prompts.**
- Armazena os prompts anteriores em um array.
- Permite:
  - Reutilizar prompts antigos.
  - Editar e regenerar.
  - Excluir entradas.

---

### 5. `utils/promptBuilder.ts`
- **Funções auxiliares para construção de prompts.**
- Exemplos de funções:
  - `buildLightingPrompt(type: string): string` → Retorna descrição de iluminação (ex.: "softbox lighting").
  - `buildCameraPrompt(model: string): string` → Retorna especificação da câmera (ex.: "Canon EOS R5, 85mm lens").
  - `combinePrompt(options: object): string` → Junta todas as partes em uma única string coerente.

---

### 6. `hooks/usePrompt.ts`
- **Hook customizado** para encapsular a lógica de geração de prompts.
- Fornece:
  - Estado do prompt atual.
  - Funções para atualizar partes do prompt.
  - Função `resetPrompt()` para limpar.

---

## 🔄 Fluxo de Geração de Prompt

1. Usuário interage com o **`PromptForm`**.
2. Funções internas montam partes do prompt (câmera, iluminação, estilo).
3. `promptBuilder` combina tudo em uma string final.
4. O resultado é exibido em **`PromptPreview`**.
5. O prompt é salvo em **`PromptHistory`** para reutilização futura.

---

## 📌 Exemplo de Função de Geração

```ts
// utils/promptBuilder.ts
export function combinePrompt(options: {
  camera: string;
  lighting: string;
  subject: string;
  style: string;
}): string {
  return `${options.subject} photographed with ${options.camera}, 
          using ${options.lighting} lighting, styled as ${options.style}`;
}
