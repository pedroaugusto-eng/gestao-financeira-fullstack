# 📊 Sistema de Gestão Financeira Full-Stack

Um sistema completo de gestão financeira construído com foco em arquitetura limpa, segurança e performance. Desenvolvido para gerenciar receitas e despesas com autenticação segura e uma interface reativa.

🔗 **Acesse a aplicação no ar aqui: https://gestao-financeira-fullstack.vercel.app/**

## 💻 Sobre o Projeto

Este projeto foi construído do zero utilizando a abordagem de **Monorepo**, isolando o backend e o frontend no mesmo repositório, mas garantindo a independência das responsabilidades. O foco principal durante o desenvolvimento foi a aplicação de boas práticas e princípios do *Clean Code*.

## 🛠️ Stack Tecnológica

**Backend:**
*   Python
*   Django / Django REST Framework
*   PostgreSQL
*   Autenticação JWT (JSON Web Tokens)
*   Gunicorn (Servidor WSGI para produção)
*   Deploy: Render

**Frontend:**
*   React com Vite
*   JavaScript
*   Conceito de *Lifting State Up* para gerenciamento global de estado (Modo Noturno)
*   Deploy: Vercel

## 🚀 Funcionalidades e Arquitetura

- **Autenticação Segura:** Login e proteção de rotas através de tokens JWT, com senhas e chaves criptografadas via variáveis de ambiente (`.env`).
- **CRUD Completo:** Criação, leitura, atualização e exclusão de transações financeiras com comunicação assíncrona (`fetch`) com a API REST.
- **Interface Dinâmica:** Renderização condicional e feedback visual instantâneo para o usuário.
- **Segurança de Rede:** Configuração estrita de `CORS` e `ALLOWED_HOSTS` no Django para garantir que apenas o frontend oficial acesse os dados.
python -m venv .venv
# Ative o ambiente (no Windows): .venv\Scripts\activate
pip install -r requirements.txt
