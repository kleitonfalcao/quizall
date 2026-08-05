// js/crests-data.js - União de Escudos do Brasil e do Mundo
import { CRESTS_BR } from './datasets/crests-br.js';
import { CRESTS_WORLD } from './datasets/crests-world.js';

export const CRESTS_DATA = [
  ...CRESTS_BR,
  ...CRESTS_WORLD
];

export function getCrestDistractors(correctCrest, count = 3) {
  const sameReg = CRESTS_DATA.filter(c => c.code !== correctCrest.code && c.region === correctCrest.region);
  const others = CRESTS_DATA.filter(c => c.code !== correctCrest.code && c.region !== correctCrest.region);
  const shuffle = arr => arr.sort(() => 0.5 - Math.random());
  return [...shuffle(sameReg), ...shuffle(others)].slice(0, count);
}
