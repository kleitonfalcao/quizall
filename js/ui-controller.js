// js/ui-controller.js - Controlador DOM com Busca Automática em Múltiplos Servidores da Web em Caso de Falha
import { GameLogic, MISSIONS_LIST } from './game-logic.js';
import { audioEngine } from './audio-engine.js';

export class UIController {
  constructor() {
    this.game = new GameLogic();
    this.currentSources = [];
    this.sourceIndex = 0;

    this.dom = {
      screenMenu: document.getElementById('screen-main-menu'),
      screenGame: document.getElementById('screen-game'),
      
      playerNameInput: document.getElementById('player-name-input'),
      modeBtns: document.querySelectorAll('.mode-btn'),
      diffBtns: document.querySelectorAll('.diff-btn'),
      settingsDiffBtns: document.querySelectorAll('[data-diff-btn]'),
      menuHighScore: document.getElementById('menu-highscore-val'),
      btnStartGame: document.getElementById('btn-start-game'),
      btnOpenRanking: document.getElementById('btn-open-ranking'),
      btnOpenMissions: document.getElementById('btn-open-missions'),
      btnOpenSettings: document.getElementById('btn-open-settings'),

      score: document.getElementById('score-val'),
      lives: document.getElementById('lives-container'),
      streak: document.getElementById('streak-text'),
      timerText: document.getElementById('timer-text'),
      timerCircle: document.getElementById('timer-circle'),
      flagImg: document.getElementById('flag-img'),
      textQuestionBox: document.getElementById('text-question-box'),
      textQuestionTitle: document.getElementById('text-question-title'),
      textQuestionTarget: document.getElementById('text-question-target'),
      optionsGrid: document.getElementById('options-grid'),
      options: [
        document.getElementById('opt-0'),
        document.getElementById('opt-1'),
        document.getElementById('opt-2'),
        document.getElementById('opt-3'),
        document.getElementById('opt-4'),
        document.getElementById('opt-5')
      ],
      btnPause: document.getElementById('btn-pause'),
      btnMute: document.getElementById('btn-mute'),
      btn5050: document.getElementById('btn-5050'),
      btnHint: document.getElementById('btn-hint'),
      btnSkip: document.getElementById('btn-skip'),

      feedbackOverlay: document.getElementById('feedback-overlay'),
      feedbackTitle: document.getElementById('feedback-title'),
      feedbackText: document.getElementById('feedback-text'),
      btnNext: document.getElementById('btn-next'),

      hintModal: document.getElementById('hint-modal'),
      hintModalText: document.getElementById('hint-modal-text'),
      btnCloseHint: document.getElementById('btn-close-hint'),

      pauseModal: document.getElementById('pause-modal'),
      btnResumeGame: document.getElementById('btn-resume-game'),
      btnPauseSettings: document.getElementById('btn-pause-settings'),
      btnQuitToMenu: document.getElementById('btn-quit-to-menu'),

      rankingModal: document.getElementById('ranking-modal'),
      rankingContainer: document.getElementById('ranking-container'),
      btnCloseRanking: document.getElementById('btn-close-ranking'),

      settingsModal: document.getElementById('settings-modal'),
      themeBtns: document.querySelectorAll('[data-theme-btn]'),
      btnToggleSound: document.getElementById('btn-toggle-sound'),
      btnToggleSuspense: document.getElementById('btn-toggle-suspense'),
      btnResetData: document.getElementById('btn-reset-data'),
      btnCloseSettings: document.getElementById('btn-close-settings'),

      missionsModal: document.getElementById('missions-modal'),
      missionsContainer: document.getElementById('missions-container'),
      btnCloseMissions: document.getElementById('btn-close-missions'),

      gameoverModal: document.getElementById('gameover-modal'),
      gameoverStats: document.getElementById('gameover-stats'),
      btnRestartGame: document.getElementById('btn-restart-game'),
      btnGameoverToMenu: document.getElementById('btn-gameover-to-menu'),
      confettiCanvas: document.getElementById('confetti-canvas')
    };

    this.applyTheme(this.game.theme);
    this.applyDifficulty(this.game.difficulty);
    this.initEvents();
    this.showMainMenu();
  }

  applyTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    this.dom.themeBtns.forEach(btn => {
      btn.classList.toggle('active-opt', btn.dataset.themeBtn === themeName);
    });
  }

  applyDifficulty(diffLevel) {
    this.game.setDifficulty(diffLevel);
    this.dom.diffBtns.forEach(btn => {
      btn.classList.toggle('diff-active', btn.dataset.diff === diffLevel);
    });
    this.dom.settingsDiffBtns.forEach(btn => {
      btn.classList.toggle('active-opt', btn.dataset.diffBtn === diffLevel);
    });
  }

  initEvents() {
    // Busca dinâmica em cadeia se a imagem falhar num servidor
    this.dom.flagImg.onerror = () => {
      if (this.game.gameMode === 'capitals' || (this.game.currentQuestion && this.game.currentQuestion.capital)) {
        this.dom.flagImg.style.display = 'none';
        return;
      }
      this.sourceIndex++;
      if (this.currentSources && this.sourceIndex < this.currentSources.length) {
        this.dom.flagImg.src = this.currentSources[this.sourceIndex];
      }
    };

    this.dom.playerNameInput.value = this.game.playerName;
    this.dom.playerNameInput.addEventListener('input', (e) => {
      this.game.setPlayerName(e.target.value);
    });

    this.dom.diffBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        audioEngine.playTap();
        this.applyDifficulty(btn.dataset.diff);
      });
    });

    this.dom.settingsDiffBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        audioEngine.playTap();
        this.applyDifficulty(btn.dataset.diffBtn);
      });
    });

    this.dom.themeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        audioEngine.playTap();
        const theme = btn.dataset.themeBtn;
        this.game.setTheme(theme);
        this.applyTheme(theme);
      });
    });

    this.dom.modeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        audioEngine.playTap();
        this.dom.modeBtns.forEach(b => b.classList.remove('mode-active'));
        btn.classList.add('mode-active');
        this.game.setGameMode(btn.dataset.mode);
        this.dom.menuHighScore.textContent = this.game.loadHighScoreForMode();
      });
    });

    this.dom.btnStartGame.addEventListener('click', () => this.startGame());
    this.dom.btnOpenRanking.addEventListener('click', () => this.showRanking());
    this.dom.btnOpenMissions.addEventListener('click', () => this.showMissions());
    this.dom.btnOpenSettings.addEventListener('click', () => this.showSettings());

    this.dom.btnToggleSound.addEventListener('click', () => this.toggleSound());
    this.dom.btnToggleSuspense.addEventListener('click', () => {
      const isSus = this.game.toggleSuspense();
      this.dom.btnToggleSuspense.textContent = isSus ? '🎵 Suspense: ON' : '🎵 Suspense: OFF';
      if (!isSus) audioEngine.stopSuspense();
      else audioEngine.startSuspense();
    });

    this.dom.btnResetData.addEventListener('click', () => {
      if (confirm('Tem certeza que deseja resetar seus recordes, missões e ranking?')) {
        this.game.resetAllData();
        alert('Estatísticas resetadas com sucesso!');
        this.showMainMenu();
      }
    });

    this.dom.btnPause.addEventListener('click', () => this.pauseGame());
    this.dom.btnResumeGame.addEventListener('click', () => this.resumeGame());
    this.dom.btnQuitToMenu.addEventListener('click', () => this.quitToMenu());
    this.dom.btnMute.addEventListener('click', () => this.toggleSound());
    this.dom.btnPauseSettings.addEventListener('click', () => this.showSettings());

    this.dom.btnCloseHint.addEventListener('click', () => {
      audioEngine.playTap();
      this.dom.hintModal.classList.remove('active');
    });
    this.dom.btnCloseRanking.addEventListener('click', () => this.hideRanking());
    this.dom.btnCloseSettings.addEventListener('click', () => this.hideSettings());
    this.dom.btnCloseMissions.addEventListener('click', () => this.hideMissions());

    this.dom.options.forEach((btn, index) => {
      btn.addEventListener('click', () => this.handleOptionClick(index));
    });
    this.dom.btn5050.addEventListener('click', () => this.handle5050());
    this.dom.btnHint.addEventListener('click', () => this.handleHint());
    this.dom.btnSkip.addEventListener('click', () => this.handleSkip());

    this.dom.btnNext.addEventListener('click', () => {
      audioEngine.playTap();
      this.hideFeedback();
      this.loadQuestion();
    });

    this.dom.btnRestartGame.addEventListener('click', () => {
      audioEngine.playTap();
      this.dom.gameoverModal.classList.remove('active');
      this.startGame();
    });

    this.dom.btnGameoverToMenu.addEventListener('click', () => {
      audioEngine.playTap();
      this.dom.gameoverModal.classList.remove('active');
      this.showMainMenu();
    });
  }

  showMainMenu() {
    this.game.stopTimer();
    audioEngine.stopSuspense();
    this.dom.screenGame.classList.remove('screen-active');
    this.dom.screenMenu.classList.add('screen-active');
    this.dom.menuHighScore.textContent = this.game.loadHighScoreForMode();
  }

  startGame() {
    this.game.setPlayerName(this.dom.playerNameInput.value);
    audioEngine.playTap();
    if (this.game.suspenseEnabled) audioEngine.startSuspense();
    this.dom.screenMenu.classList.remove('screen-active');
    this.dom.screenGame.classList.add('screen-active');
    this.game.startNewGame();
    this.loadQuestion();
  }

  loadQuestion() {
    const qData = this.game.nextQuestion();
    this.currentSources = qData.imageSources;
    this.sourceIndex = 0;

    if (qData.isCapitalMode) {
      this.dom.flagImg.removeAttribute('src');
      this.dom.flagImg.style.display = 'none';
      this.dom.textQuestionBox.style.display = 'block';
      this.dom.textQuestionTitle.textContent = `Qual é a capital de...`;
      this.dom.textQuestionTarget.textContent = qData.question.name;
    } else {
      this.dom.textQuestionBox.style.display = 'none';
      this.dom.flagImg.style.display = 'block';
      if (this.currentSources && this.currentSources.length > 0) {
        this.dom.flagImg.src = this.currentSources[0];
      }
      this.dom.flagImg.alt = `Imagem de ${qData.question.name}`;
    }

    this.updateHeaderUI();

    const totalOpts = qData.options.length;
    this.dom.optionsGrid.style.gridTemplateColumns = totalOpts > 4 ? '1fr 1fr' : '1fr 1fr';

    this.dom.options.forEach((btn, idx) => {
      if (idx < totalOpts) {
        btn.style.display = 'flex';
        btn.textContent = qData.options[idx].optionText || qData.options[idx].name;
        btn.disabled = false;
        btn.className = 'option-btn';
      } else {
        btn.style.display = 'none';
      }
    });

    this.startTimer();
  }

  updateHeaderUI() {
    this.dom.score.textContent = this.game.score;
    this.dom.streak.textContent = `🔥 Sequência: ${this.game.streak}`;

    const remainingLives = Math.max(0, 5 - this.game.errors);
    this.dom.lives.textContent = '❤️'.repeat(remainingLives) + '🖤'.repeat(5 - remainingLives);

    this.dom.btn5050.disabled = !this.game.lifelines.fiftyFifty;
    this.dom.btnHint.disabled = !this.game.lifelines.hint;
    this.dom.btnSkip.disabled = false;
  }

  startTimer() {
    this.game.stopTimer();
    this.game.timeLeft = this.game.maxTime;
    this.updateTimerDisplay(this.game.maxTime);

    this.game.timerInterval = setInterval(() => {
      this.game.timeLeft--;
      this.updateTimerDisplay(this.game.timeLeft);

      if (this.game.timeLeft <= 5 && this.game.timeLeft > 0) {
        audioEngine.playTick(true);
      } else if (this.game.timeLeft > 0) {
        audioEngine.playTick(false);
      }

      if (this.game.timeLeft <= 0) {
        this.game.stopTimer();
        this.handleTimeOut();
      }
    }, 1000);
  }

  updateTimerDisplay(seconds) {
    this.dom.timerText.textContent = seconds;
    const progress = (seconds / this.game.maxTime) * 126;
    this.dom.timerCircle.style.strokeDashoffset = (126 - progress);
    this.dom.timerCircle.style.stroke = seconds <= 5 ? 'var(--error-color)' : 'var(--primary-color)';
  }

  handleOptionClick(selectedIndex) {
    audioEngine.playTap();
    const result = this.game.checkAnswer(selectedIndex);

    this.dom.options.forEach((btn, idx) => {
      btn.disabled = true;
      if (this.game.options[idx]) {
        if (this.game.options[idx].code === result.correctItem.code) {
          btn.classList.add('correct');
        } else if (idx === selectedIndex && !result.isCorrect) {
          btn.classList.add('wrong');
        }
      }
    });

    if (result.isCorrect) {
      audioEngine.playCorrect();
      this.triggerConfetti();
    } else {
      audioEngine.playWrong();
    }

    setTimeout(() => {
      if (result.isGameOver) {
        this.showGameOver();
      } else {
        const correctText = result.correctItem.capital || result.correctItem.name;
        this.showFeedback(
          result.isCorrect ? '🎉 Resposta Certa!' : '❌ Ops! Quase lá!',
          `${result.message}<br><br><b>Correto:</b> ${correctText}`
        );
      }
    }, 600);
  }

  handleTimeOut() {
    audioEngine.playWrong();
    const res = this.game.registerTimeout();

    if (res.isGameOver) {
      this.showGameOver();
    } else {
      const correctText = res.correctItem.capital || res.correctItem.name;
      this.showFeedback(
        '⏰ Tempo Esgotado!',
        `O tempo de ${this.game.maxTime} segundos acabou!<br><br><b>O item correto era:</b> ${correctText}`
      );
    }
  }

  handle5050() {
    audioEngine.playHelp();
    const toRemove = this.game.useFiftyFifty();
    if (toRemove) {
      toRemove.forEach(idx => this.dom.options[idx].classList.add('hidden-option'));
      this.updateHeaderUI();
    }
  }

  handleHint() {
    audioEngine.playHelp();
    const hintInfo = this.game.useHint();
    if (hintInfo) {
      this.updateHeaderUI();
      this.dom.hintModalText.innerHTML = `
        <b>Categoria / Região:</b> ${hintInfo.info}<br><br>
        <b>Pista:</b> ${hintInfo.hintText}
      `;
      this.dom.hintModal.classList.add('active');
    }
  }

  handleSkip() {
    audioEngine.playHelp();
    const res = this.game.useSkip();
    if (res.isGameOver) {
      this.showGameOver();
    } else {
      this.loadQuestion();
    }
  }

  pauseGame() {
    audioEngine.playTap();
    this.game.stopTimer();
    this.dom.pauseModal.classList.add('active');
  }

  resumeGame() {
    audioEngine.playTap();
    this.dom.pauseModal.classList.remove('active');
    this.startTimer();
  }

  quitToMenu() {
    audioEngine.playTap();
    this.dom.pauseModal.classList.remove('active');
    this.showMainMenu();
  }

  toggleSound() {
    const isMuted = audioEngine.toggleMute();
    this.dom.btnMute.innerHTML = isMuted ? '🔇' : '🔊';
    this.dom.btnToggleSound.textContent = isMuted ? '🔊 Som: OFF' : '🔊 Som: ON';
  }

  showRanking() {
    audioEngine.playTap();
    const leaderboard = this.game.getLeaderboard();
    const medals = ['🥇', '🥈', '🥉'];

    if (leaderboard.length === 0) {
      this.dom.rankingContainer.innerHTML = '<p class="modal-text">Nenhum registro no ranking ainda.<br>Seja o primeiro a jogar!</p>';
    } else {
      this.dom.rankingContainer.innerHTML = leaderboard.map((entry, idx) => `
        <div class="ranking-item">
          <span class="ranking-medal">${medals[idx] || `${idx + 1}º`}</span>
          <span><strong>${entry.name}</strong> [${entry.mode || 'Geral'}] (${entry.date})</span>
          <strong>${entry.score} pts</strong>
        </div>
      `).join('');
    }
    this.dom.rankingModal.classList.add('active');
  }

  hideRanking() {
    audioEngine.playTap();
    this.dom.rankingModal.classList.remove('active');
  }

  showSettings() {
    audioEngine.playTap();
    this.dom.settingsModal.classList.add('active');
  }

  hideSettings() {
    audioEngine.playTap();
    this.dom.settingsModal.classList.remove('active');
  }

  showMissions() {
    audioEngine.playTap();
    const stats = this.game.stats;
    this.dom.missionsContainer.innerHTML = MISSIONS_LIST.map(m => {
      const current = Math.min(m.target, stats[m.key] || 0);
      const percent = Math.floor((current / m.target) * 100);
      const isDone = current >= m.target;
      return `
        <div class="mission-card">
          <div class="mission-title">${m.icon} ${m.title} ${isDone ? '✅' : ''}</div>
          <div class="mission-desc">${m.desc} (${current}/${m.target})</div>
          <div class="mission-progress"><div class="mission-progress-bar" style="width: ${percent}%"></div></div>
        </div>
      `;
    }).join('');
    this.dom.missionsModal.classList.add('active');
  }

  hideMissions() {
    audioEngine.playTap();
    this.dom.missionsModal.classList.remove('active');
  }

  showFeedback(title, htmlMessage) {
    this.dom.feedbackTitle.innerHTML = title;
    this.dom.feedbackText.innerHTML = htmlMessage;
    this.dom.feedbackOverlay.classList.add('active');
  }

  hideFeedback() {
    this.dom.feedbackOverlay.classList.remove('active');
  }

  showGameOver() {
    this.game.stopTimer();
    audioEngine.stopSuspense();
    this.dom.gameoverStats.innerHTML = `
      Você cometeu 5 erros.<br><br>
      <b>Jogador:</b> ${this.game.playerName}<br>
      <b>Modo:</b> ${this.game.getModeName()}<br>
      <b>Dificuldade:</b> ${this.game.getDiffName()}<br>
      <b>Pontuação Final:</b> ${this.game.score} pontos<br>
      <b>Acertos:</b> ${this.game.correctCount} itens<br>
      <b>Recorde Pessoal:</b> ${this.game.highScore} pontos
    `;
    this.dom.gameoverModal.classList.add('active');
  }

  triggerConfetti() {
    const canvas = this.dom.confettiCanvas;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 40 }, () => ({
      x: canvas.width / 2, y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.7) * 12,
      color: ['#fbbf24', '#38bdf8', '#22c55e', '#ec4899', '#a855f7'][Math.floor(Math.random() * 5)],
      size: Math.random() * 6 + 4
    }));

    let frames = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.3;
        ctx.fillStyle = p.color; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
      });
      frames++;
      if (frames < 50) requestAnimationFrame(animate);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    animate();
  }
}
