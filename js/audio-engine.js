// js/audio-engine.js - Sintetizador de Som e Trilha de Suspense via Web Audio API
class AudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.suspenseOsc = null;
    this.suspenseGain = null;
    this.isSuspensePlaying = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopSuspense();
    } else {
      this.startSuspense();
    }
    return this.isMuted;
  }

  // Toca o som tátil de botão clicado
  playTap() {
    if (this.isMuted) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  // Toca o som de resposta certa (Arpejo alegre C-E-G-C)
  playCorrect() {
    if (this.isMuted) return;
    this.init();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = this.ctx.currentTime + (idx * 0.08);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.25);
    });
  }

  // Toca o som de resposta errada (Tom grave descendente)
  playWrong() {
    if (this.isMuted) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(110, this.ctx.currentTime + 0.3);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  // Som de relógio (Tick-Tock) para o cronômetro
  playTick(isUrgent = false) {
    if (this.isMuted) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const freq = isUrgent ? 900 : 600;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(isUrgent ? 0.2 : 0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  // Som para quando ativa ajuda (50:50, Pular, Dica)
  playHelp() {
    if (this.isMuted) return;
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(900, this.ctx.currentTime + 0.2);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  // Trilha sonora contínua de suspense (Jogo do Milhão style suave)
  startSuspense() {
    if (this.isMuted || this.isSuspensePlaying) return;
    this.init();

    this.suspenseOsc = this.ctx.createOscillator();
    this.suspenseGain = this.ctx.createGain();

    this.suspenseOsc.type = 'sine';
    // Frequência baixa pulsa suavemente (65Hz = C2)
    this.suspenseOsc.frequency.setValueAtTime(65, this.ctx.currentTime);

    // LFO para criar o pulso de suspense
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.5, this.ctx.currentTime); // 0.5 Hz (pulsa a cada 2s)
    lfoGain.gain.setValueAtTime(3, this.ctx.currentTime);

    lfo.connect(this.suspenseOsc.frequency);
    lfo.start();

    this.suspenseGain.gain.setValueAtTime(0.03, this.ctx.currentTime); // Volume bem suave ao fundo

    this.suspenseOsc.connect(this.suspenseGain);
    this.suspenseGain.connect(this.ctx.destination);

    this.suspenseOsc.start();
    this.isSuspensePlaying = true;
  }

  stopSuspense() {
    if (this.suspenseOsc) {
      try {
        this.suspenseOsc.stop();
        this.suspenseOsc.disconnect();
      } catch (e) {}
      this.suspenseOsc = null;
    }
    this.isSuspensePlaying = false;
  }
}

export const audioEngine = new AudioEngine();
