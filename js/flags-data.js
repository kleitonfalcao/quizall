// js/flags-data.js - União de Países (195+), Estados Brasileiros (27) e Cidades do Mundo
import { COUNTRIES_LIST } from './datasets/countries.js';
import { BRAZIL_STATES_AND_CITIES } from './datasets/brazil-states.js';

export const FLAGS_DATA = [
  ...COUNTRIES_LIST,
  ...BRAZIL_STATES_AND_CITIES
];

export function getIntelligentDistractors(correctCountry, count = 3) {
  const sameTag = FLAGS_DATA.filter(f => f.code !== correctCountry.code && f.tag && f.tag === correctCountry.tag);
  const sameContinent = FLAGS_DATA.filter(f => f.code !== correctCountry.code && f.continent === correctCountry.continent && !sameTag.includes(f));
  const others = FLAGS_DATA.filter(f => f.code !== correctCountry.code && !sameTag.includes(f) && !sameContinent.includes(f));
  const shuffle = arr => arr.sort(() => 0.5 - Math.random());
  return [...shuffle(sameTag), ...shuffle(sameContinent), ...shuffle(others)].slice(0, count);
}
