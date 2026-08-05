# 🗺️ Quiz das Bandeiras do Mundo — Project Map

## Stack
- Frontend: HTML5, CSS3 (Vanilla Design System), JavaScript (ES6 Modules)
- Audio Engine: Web Audio API (Sintetizador de trilha de suspense e FX)
- Flag Asset Provider: FlagCDN SVG (Ultra-rápido & Gratuito)
- Deployment: GitHub Pages / Vercel / Netlify (100% Estático)

## Folder Structure
Quizz bandeiras/
  index.html            → Estrutura semântica com Cadastro de Nome, Ranking, Menu Principal e Telas
  styles.css            → Design system (variáveis, cores, campo de texto, ranking com medalhas)
  README.md             → Guia fácil de publicação no GitHub Pages
  QuizzBandeiras.md     → Mapa do projeto (este arquivo)
  js/
    flags-data.js       → Banco completo com 195 países (ISO code, nome PT, continente, tags de semelhança)
    audio-engine.js     → Sintetizador de som Web Audio API (Trilha de suspense + FX)
    game-logic.js       → Lógica do quiz (Cadastro do jogador, Ranking Top 10, 5 Vidas, Missões, Timer 15s)
    ui-controller.js    → Controle do DOM, captura do nome, ranking com medalhas (🥇, 🥈, 🥉), menus e modais

## Main Features
- **Cadastro de Jogador**: O jogador digita seu nome/apelido no Menu Principal (salvo no navegador).
- **Ranking Top 10**: Placar dos 10 melhores pontuadores com medalhas (🥇, 🥈, 🥉), pontuação e data.
- **Menu Principal**: Acesso ao jogo, ranking, missões e configurações.
- **Menu de Pausa**: Pausar a partida a qualquer momento.
- **Sistema de 5 Vidas (Erros)**: O jogo encerra após 5 erros e salva a pontuação no Ranking.
- **Pular Ilimitado**: Navegação livre entre as bandeiras.
- **Missões & Conquistas**: Progresso de conquistas salvas no navegador.
- **Música de Suspense & Efeitos Web Audio API**: Sons vibrantes sem dependência externa.

## Last updated: 2026-08-05
