# 🗺️ QuizAll — Project Map

## Stack
- Frontend: HTML5, CSS3 (Vanilla Design System com 3 Temas), JavaScript (ES6 Modules)
- Audio Engine: Web Audio API (Trilha de suspense + efeitos sonoros)
- Asset Providers:
  - Bandeiras: FlagCDN PNG (w320 HD) + Wikimedia Commons
  - Logomarcas: Domínios Web Reais (Clearbit / Unavatar / Google Favicons / DuckDuckGo)
  - Escudos de Futebol: Domínios Web Reais (Clearbit / Unavatar / Google Favicons / DuckDuckGo)
- Deployment: GitHub Pages / Vercel / Netlify (100% Estático)

## Folder Structure & Datasets Organizados
Quizz bandeiras/
  index.html            → Interface semântica do QuizAll (Menu, 4 Modos, 3 Dificuldades, 3 Temas)
  styles.css            → Design system com 3 Temas: 🌙 Escuro Azul, ☀️ Claro Amigável, ⚡ Neon Cyber
  README.md             → Guia de publicação no GitHub Pages
  QuizAll.md            → Mapa do projeto (este arquivo)
  js/
    flags-data.js       → Módulo principal de bandeiras (Une países e estados/cidades)
    logos-data.js       → Módulo principal de logomarcas (Une marcas do BR e mundiais)
    crests-data.js      → Módulo principal de escudos (Une clubes do BR e mundiais)
    audio-engine.js     → Sintetizador Web Audio API (Suspense + Efeitos)
    game-logic.js       → Lógica central (4 Modos, 3 Dificuldades, Busca dinâmica em múltiplos servidores da web)
    ui-controller.js    → Controle DOM, sincronização e tratamento de erro onerror com busca em cadeia
    datasets/
      countries.js      → Todos os 195+ Países do mundo (códigos ISO-2)
      brazil-states.js  → Todos os 27 Estados do Brasil + Cidades Famosas
      logos-br.js       → Principais marcas e empresas do Brasil (Finanças, Varejo, Bebidas, Mídia, Alimentos)
      logos-world.js    → Principais marcas globais (Tech, Carros, Redes Sociais, Esportes)
      crests-br.js      → Clubes do Futebol Brasileiro (Séries A, B e C)
      crests-world.js   → Clubes do Futebol Mundial (Champions League, Premier League, La Liga, Libertadores, MLS, etc.)

## Main Features
- **🚀 Banco de Dados Massivo (Mais de 300+ Itens Reais)**:
  - 195+ Países + 27 Estados do Brasil + Cidades Famosas
  - 40+ Principais Logomarcas do Brasil e do Mundo
  - 45+ Principais Escudos de Clubes do Brasil (Séries A, B e C) e do Mundo
- **⚡ 3 Níveis de Dificuldade**: 🟢 Fácil (20s), 🟡 Médio (15s), 🔴 Difícil (10s com bônus 1.5x).
- **🎨 3 Temas Visuais**: 🌙 Escuro Azul, ☀️ Claro Amigável e ⚡ Neon Cyber.

## Last updated: 2026-08-05
