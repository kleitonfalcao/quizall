// js/logos-data.js - União de Logomarcas do Brasil e do Mundo
import { LOGOS_BR } from './datasets/logos-br.js';
import { LOGOS_WORLD } from './datasets/logos-world.js';

export const LOGOS_DATA = [
  ...LOGOS_BR,
  ...LOGOS_WORLD
];

export function getLogoDistractors(correctLogo, count = 3) {
  const sameCat = LOGOS_DATA.filter(l => l.code !== correctLogo.code && l.category === correctLogo.category);
  const others = LOGOS_DATA.filter(l => l.code !== correctLogo.code && l.category !== correctLogo.category);
  const shuffle = arr => arr.sort(() => 0.5 - Math.random());
  return [...shuffle(sameCat), ...shuffle(others)].slice(0, count);
}
