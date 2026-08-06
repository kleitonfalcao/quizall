// js/game-logic.js - Lógica QuizAll com Suporte a Capitais (6 Opções) e Recordes Individuais por Tema
import { FLAGS_DATA, getIntelligentDistractors } from './flags-data.js';
import { LOGOS_DATA, getLogoDistractors } from './logos-data.js';
import { CRESTS_DATA, getCrestDistractors } from './crests-data.js';
import { CAPITALS_DATA, getCapitalDistractors } from './datasets/capitals.js';

export const MICRO_VICTORIES = [
  "Caramba! Você é um mestre supremo! 🌟",
  "Sensacional! Acertou em cheio! 🚀",
  "Incrível! Conhecimento nota 1000! 🎯",
  "Parabéns! Essa foi na mosca! 👏",
  "Uau! Seu cérebro é fantástico! 🧠✨"
];

export const MICRO_TRY_AGAIN = [
  "Ops! Essa era bem parecida! 🧐",
  "Quase lá! Foco na próxima! 💪",
  "Passou perto! Você consegue! 🎯",
  "Foi por pouco! Restam poucas chances! ⭐"
];

export const MISSIONS_LIST = [
  { id: 'm1', title: 'Iniciante', desc: 'Acertar 10 itens no QuizAll', target: 10, key: 'correct_count', icon: '🌱' },
  { id: 'm2', title: 'Desafiante', desc: 'Acertar 50 itens', target: 50, key: 'correct_count', icon: '⚔️' },
  { id: 'm3', title: 'Expert QuizAll', desc: 'Acertar 100 itens', target: 100, key: 'correct_count', icon: '🏆' },
  { id: 'm4', title: 'Lenda Suprema', desc: 'Acertar 200 itens', target: 200, key: 'correct_count', icon: '👑' },
  { id: 'm5', title: 'Imparável', desc: 'Conseguir sequência de 10 acertos', target: 10, key: 'best_streak', icon: '🔥' },
  { id: 'm6', title: 'Mestre da Sequência', desc: 'Conseguir sequência de 20 acertos', target: 20, key: 'best_streak', icon: '⚡' },
  { id: 'm7', title: 'Explorador Hard', desc: 'Jogar 50 perguntas', target: 50, key: 'total_played', icon: '🌎' },
  { id: 'm8', title: 'Viciado em Quiz', desc: 'Jogar 100 perguntas', target: 100, key: 'total_played', icon: '🎮' },
  { id: 'm9', title: 'Detetive Máximo', desc: 'Usar a ajuda Dica 10 vezes', target: 10, key: 'hints_used', icon: '💡' }
];

export class GameLogic {
  constructor() {
    this.playerName = localStorage.getItem('quizall_player_name') || 'Campeão';
    this.gameMode = 'flags';
    this.difficulty = localStorage.getItem('quizall_difficulty') || 'medium';
    this.theme = localStorage.getItem('quizall_theme') || 'dark-blue';
    this.suspenseEnabled = localStorage.getItem('quizall_suspense') !== 'false';
    this.updateDifficultyTime();
    this.score = 0;
    this.streak = 0;
    this.errors = 0;
    this.maxErrors = 5;
    this.correctCount = 0;
    this.loadHighScoreForMode();
    this.currentQuestion = null;
    this.options = [];
    this.timeLeft = this.maxTime;
    this.timerInterval = null;
    this.lifelines = { fiftyFifty: true, hint: true, skip: true };
    this.usedIds = new Set();
    this.loadStats();
  }

  loadHighScoreForMode() {
    const key = `quizall_highscore_${this.gameMode}`;
    this.highScore = parseInt(localStorage.getItem(key) || '0', 10);
    return this.highScore;
  }

  setPlayerName(name) {
    this.playerName = name.trim() || 'Campeão';
    localStorage.setItem('quizall_player_name', this.playerName);
  }

  setGameMode(mode) {
    this.gameMode = mode;
    this.loadHighScoreForMode();
  }

  setDifficulty(diff) {
    this.difficulty = diff;
    localStorage.setItem('quizall_difficulty', diff);
    this.updateDifficultyTime();
  }

  updateDifficultyTime() {
    switch(this.difficulty) {
      case 'easy': this.maxTime = 20; break;
      case 'hard': this.maxTime = 10; break;
      case 'medium': default: this.maxTime = 15; break;
    }
  }

  setTheme(theme) {
    this.theme = theme;
    localStorage.setItem('quizall_theme', theme);
  }

  toggleSuspense() {
    this.suspenseEnabled = !this.suspenseEnabled;
    localStorage.setItem('quizall_suspense', this.suspenseEnabled.toString());
    return this.suspenseEnabled;
  }

  resetAllData() {
    localStorage.removeItem('quizall_highscore_flags');
    localStorage.removeItem('quizall_highscore_logos');
    localStorage.removeItem('quizall_highscore_crests');
    localStorage.removeItem('quizall_highscore_capitals');
    localStorage.removeItem('quizall_highscore_mixed');
    localStorage.removeItem('quizall_highscore');
    localStorage.removeItem('quizall_leaderboard');
    localStorage.removeItem('quizall_missions_stats');
    this.highScore = 0;
    this.loadStats();
  }

  loadStats() {
    const saved = localStorage.getItem('quizall_missions_stats');
    this.stats = saved ? JSON.parse(saved) : { correct_count: 0, best_streak: 0, total_played: 0, hints_used: 0 };
  }

  saveStats() {
    localStorage.setItem('quizall_missions_stats', JSON.stringify(this.stats));
  }

  getLeaderboard() {
    const saved = localStorage.getItem('quizall_leaderboard');
    return saved ? JSON.parse(saved) : [];
  }

  saveToLeaderboard() {
    if (this.score <= 0) return;
    let board = this.getLeaderboard();
    board.push({
      name: this.playerName,
      score: this.score,
      correct: this.correctCount,
      mode: `${this.getModeName()} (${this.getDiffName()})`,
      date: new Date().toLocaleDateString('pt-BR')
    });
    board.sort((a, b) => b.score - a.score);
    board = board.slice(0, 10);
    localStorage.setItem('quizall_leaderboard', JSON.stringify(board));
  }

  getModeName() {
    switch(this.gameMode) {
      case 'flags': return 'Bandeiras';
      case 'logos': return 'Logomarcas';
      case 'crests': return 'Escudos';
      case 'capitals': return 'Capitais';
      case 'mixed': return 'Misturado';
      default: return 'QuizAll';
    }
  }

  getDiffName() {
    switch(this.difficulty) {
      case 'easy': return 'Fácil';
      case 'hard': return 'Difícil';
      case 'medium': default: return 'Médio';
    }
  }

  startNewGame() {
    this.score = 0;
    this.streak = 0;
    this.errors = 0;
    this.correctCount = 0;
    this.usedIds.clear();
    this.lifelines = { fiftyFifty: true, hint: true, skip: true };
    this.loadHighScoreForMode();
    return this.nextQuestion();
  }

  nextQuestion() {
    this.stopTimer();
    this.timeLeft = this.maxTime;

    let targetType = this.gameMode;
    if (this.gameMode === 'mixed') {
      const types = ['flags', 'logos', 'crests', 'capitals'];
      targetType = types[Math.floor(Math.random() * types.length)];
    }

    let dataset = FLAGS_DATA;
    let distractorFn = getIntelligentDistractors;
    let optionCount = 4;

    if (targetType === 'logos') {
      dataset = LOGOS_DATA;
      distractorFn = getLogoDistractors;
    } else if (targetType === 'crests') {
      dataset = CRESTS_DATA;
      distractorFn = getCrestDistractors;
    } else if (targetType === 'capitals') {
      dataset = CAPITALS_DATA;
      distractorFn = getCapitalDistractors;
      optionCount = 6;
    }

    const available = dataset.filter(item => !this.usedIds.has(item.code));
    if (available.length === 0) {
      this.usedIds.clear();
    }

    const activeList = available.length > 0 ? available : dataset;
    const randomIndex = Math.floor(Math.random() * activeList.length);
    this.currentQuestion = activeList[randomIndex];
    this.usedIds.add(this.currentQuestion.code);

    const distractors = distractorFn(this.currentQuestion, optionCount - 1);
    const allChoices = [this.currentQuestion, ...distractors];
    
    // Se for modo capitais, mapeia o nome da opção para a capital
    this.options = allChoices.map(item => ({
      ...item,
      optionText: targetType === 'capitals' ? item.capital : item.name
    })).sort(() => Math.random() - 0.5);

    // Fontes de imagem em Alta Definição (apenas para desafios visuais)
    const domain = this.currentQuestion.domain || `${this.currentQuestion.code}.com`;
    const codeLower = (this.currentQuestion.code || '').toLowerCase();
    const imageSources = [];

    if (targetType !== 'capitals') {
      if (this.currentQuestion.img) {
        imageSources.push(this.currentQuestion.img);
      }
      if (codeLower.length === 2 && !this.currentQuestion.img) {
        imageSources.push(`https://flagcdn.com/w640/${codeLower}.png`);
        imageSources.push(`https://flagcdn.com/${codeLower}.svg`);
        imageSources.push(`https://cdn.jsdelivr.net/gh/lipis/flag-icons@main/flags/4x3/${codeLower}.svg`);
      }
      imageSources.push(`https://logo.clearbit.com/${domain}`);
      imageSources.push(`https://asset.brandfetch.io/${domain}/logo`);
      imageSources.push(`https://unavatar.io/${domain}?fallback=false`);
      imageSources.push(`https://t1.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE&url=https://${domain}&size=512`);
    }

    this.stats.total_played++;
    this.saveStats();

    return {
      question: this.currentQuestion,
      isCapitalMode: targetType === 'capitals',
      imageSources,
      options: this.options,
      score: this.score,
      streak: this.streak,
      errors: this.errors,
      maxErrors: this.maxErrors,
      maxTime: this.maxTime
    };
  }

  checkAnswer(selectedOptionIndex) {
    this.stopTimer();
    const selectedItem = this.options[selectedOptionIndex];
    const isCorrect = selectedItem.code === this.currentQuestion.code;

    if (isCorrect) {
      this.streak++;
      this.correctCount++;
      if (this.streak > this.stats.best_streak) this.stats.best_streak = this.streak;
      this.stats.correct_count++;

      const diffMultiplier = this.difficulty === 'hard' ? 1.5 : (this.difficulty === 'easy' ? 0.8 : 1);
      const timeBonus = Math.floor(this.timeLeft * 10 * diffMultiplier);
      const streakBonus = Math.floor(this.streak * 50 * diffMultiplier);
      this.score += Math.floor((100 + timeBonus + streakBonus) * diffMultiplier);

      if (this.score > this.highScore) {
        this.highScore = this.score;
        const key = `quizall_highscore_${this.gameMode}`;
        localStorage.setItem(key, this.highScore.toString());
      }
    } else {
      this.streak = 0;
      this.errors++;
    }

    this.saveStats();
    const isGameOver = this.errors >= this.maxErrors;
    if (isGameOver) this.saveToLeaderboard();

    return {
      isCorrect,
      isGameOver,
      correctItem: this.currentQuestion,
      score: this.score,
      streak: this.streak,
      errors: this.errors,
      maxErrors: this.maxErrors,
      highScore: this.highScore,
      message: isCorrect 
        ? MICRO_VICTORIES[Math.floor(Math.random() * MICRO_VICTORIES.length)]
        : MICRO_TRY_AGAIN[Math.floor(Math.random() * MICRO_TRY_AGAIN.length)]
    };
  }

  registerTimeout() {
    this.stopTimer();
    this.streak = 0;
    this.errors++;
    this.saveStats();
    const isGameOver = this.errors >= this.maxErrors;
    if (isGameOver) this.saveToLeaderboard();
    return {
      isGameOver,
      correctItem: this.currentQuestion,
      errors: this.errors,
      maxErrors: this.maxErrors
    };
  }

  useFiftyFifty() {
    if (!this.lifelines.fiftyFifty) return null;
    this.lifelines.fiftyFifty = false;
    const wrongIndices = [];
    this.options.forEach((opt, idx) => {
      if (opt.code !== this.currentQuestion.code) wrongIndices.push(idx);
    });
    const countToHide = this.options.length > 4 ? 3 : 2;
    return wrongIndices.sort(() => 0.5 - Math.random()).slice(0, countToHide);
  }

  useHint() {
    if (!this.lifelines.hint) return null;
    this.lifelines.hint = false;
    this.stats.hints_used++;
    this.saveStats();
    return {
      info: this.currentQuestion.continent || this.currentQuestion.category || this.currentQuestion.region || 'Desafio QuizAll',
      hintText: this.currentQuestion.hint || 'Observe bem os detalhes e cores!'
    };
  }

  useSkip() {
    this.streak = 0;
    this.errors++;
    this.saveStats();
    const isGameOver = this.errors >= this.maxErrors;
    if (isGameOver) {
      this.saveToLeaderboard();
      return { isGameOver: true, correctItem: this.currentQuestion };
    }
    return { isGameOver: false, questionData: this.nextQuestion() };
  }

  stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }
}
