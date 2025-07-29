# 🍦 Sorveteria App - Frontend

Este é o repositório do frontend do aplicativo "Sorveteria", desenvolvido com React Native usando o Expo. Ele interage com a API RESTful construída com Django REST Framework.

## ✨ Funcionalidades

-   Listagem de produtos (sorvetes, picolés, etc.)
-   Visualização de detalhes do produto.
-   Autenticação de usuários (Login, Cadastro).
-   Gerenciamento de estoque (para usuários com permissão).
-   Integração com a API do backend.

## 🚀 Tecnologias Utilizadas

-   **React Native**
-   **Expo SDK**
-   **JavaScript / TypeScript**
-   `fetch` para requisições HTTP

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:

-   [Node.js](https://nodejs.org/) (versão LTS recomendada)
-   [npm](https://www.npmjs.com/get-npm) ou [Yarn](https://yarnpkg.com/lang/en/docs/install/)
-   [Expo CLI](https://docs.expo.dev/get-started/installation/) (`npm install -g expo-cli`)

## 💻 Instalação e Execução

Siga os passos abaixo para configurar e rodar o projeto localmente:

1.  **Clone este repositório:**
    ```bash
    git clone [https://github.com/seu_usuario/sorvete-front.git](https://github.com/seu_usuario/sorvete-front.git)
    cd sorvete-front
    ```
2.  **Instale as dependências:**
    ```bash
    npm install
    ```
3.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do projeto (`sorvete-front/.env`) com as seguintes variáveis:
    ```
    API_BASE_URL=http://localhost:8000 # Ou o endereço IP/URL do seu backend
    ```
    *Lembre-se: O arquivo `.env` não deve ser enviado para o Git.*

4.  **Execute o aplicativo Expo:**
    ```bash
    npx expo start
    ```
    Isso abrirá o Expo Developer Tools no seu navegador. Você pode então escanear o QR Code com o aplicativo Expo Go no seu celular, ou rodar em um emulador/simulador.
