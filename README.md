# 📌 UCP - Sistema de Gestão de Denúncias

Este repositório contém um **Painel de Controle (UCP)** desenvolvido para gerenciamento de denúncias em uma plataforma de jogos ou comunidade online. A aplicação permite a criação, revisão e moderação de denúncias, além de integração com um sistema de compras via Mercado Pago.

## 🛠 Tecnologias Utilizadas
- **Node.js** - Back-end assíncrono e escalável
- **React** - Biblioteca para construção da interface
- **Next.js** - Framework para React com renderização server-side
- **TypeScript** - Tipagem estática para maior confiabilidade
- **Prisma** - ORM moderno para interação com o banco de dados
- **MySQL** - Banco de dados relacional
- **Phosphor Icons** - Biblioteca de ícones

## 🚀 Funcionalidades
- 📌 **Criação e Gerenciamento de Denúncias** - Usuários podem reportar problemas e acompanhar o status de suas denúncias.
- 🔍 **Sistema de Revisão** - Moderação de denúncias por uma equipe de staff.
- 🔒 **Sistema de Login** - Autenticação segura para usuários e administradores.
- ⚖️ **Sistema de Banimento** - Possibilidade de aplicação de sanções a usuários infratores.
- 💳 **Compra de Moedas VIP** - Integração com a API do Mercado Pago para aquisição de moedas premium.
- 🛡 **Sistema Staff** - Hierarquia de permissões para moderação eficiente.

## 📦 Como Executar o Projeto
1. Clone este repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd seu-repositorio
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
   ou, se estiver utilizando Yarn:
   ```bash
   yarn install
   ```
4. Configure o ambiente:
   - Crie um arquivo `.env` com as configurações do banco de dados e credenciais da API do Mercado Pago.
5. Execute as migrações do Prisma:
   ```bash
   npx prisma migrate dev
   ```
6. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   ou
   ```bash
   yarn dev
   ```
7. Acesse **http://localhost:3000** no navegador para visualizar o projeto.

## 📸 Preview
(Adicione uma imagem ou GIF do sistema em funcionamento aqui)

## 📜 Licença
Este projeto está licenciado sob a **MIT License**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.

---
📩 **Contato**  
Caso tenha dúvidas, sugestões ou queira contribuir, entre em contato pelo [LinkedIn](https://www.linkedin.com/in/thiago-vitor/) ou envie um e-mail para thiagovt93@gmail.com.

Obrigado por conferir o projeto! 🚀
