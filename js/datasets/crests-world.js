// js/datasets/crests-world.js - Escudos dos Principais Clubes Internacionais (Expansão Completa)
export const CRESTS_WORLD = [
  // Espanha (La Liga)
  { code: 'real-madrid', name: 'Real Madrid', region: 'Espanha', domain: 'realmadrid.com', hint: 'Maior campeão da Champions League com o escudo redondo e a coroa real.' },
  { code: 'barcelona', name: 'FC Barcelona', region: 'Espanha', domain: 'fcbarcelona.com', hint: 'Clube catalão famoso pelas cores azul e grená e a bola no centro.' },
  { code: 'atletico-madrid', name: 'Atlético de Madrid', region: 'Espanha', domain: 'atleticodemadrid.com', hint: 'Colchoneros de Madri com o urso e o morangueiro no escudo.' },
  { code: 'sevilla', name: 'Sevilla FC', region: 'Espanha', domain: 'sevillafc.es', hint: 'Maior campeão da Liga Europa em Sevilha na Espanha.' },
  { code: 'valencia', name: 'Valencia CF', region: 'Espanha', domain: 'valenciacf.com', hint: 'Clube espanhol do morcego no topo do escudo.' },
  { code: 'real-betis', name: 'Real Betis', region: 'Espanha', domain: 'realbetisbalompie.es', hint: 'Verdiblancos de Sevilha com as listras verdes e brancas.' },
  { code: 'athletic-bilbao', name: 'Athletic Bilbao', region: 'Espanha', domain: 'athletic-club.eus', hint: 'Tradicional clube basco que joga apenas com atletas formados na região.' },

  // Inglaterra (Premier League)
  { code: 'man-city', name: 'Manchester City', region: 'Inglaterra', domain: 'mancity.com', hint: 'Citizens de Manchester treinados por Pep Guardiola.' },
  { code: 'man-united', name: 'Manchester United', region: 'Inglaterra', domain: 'manutd.com', hint: 'Diabos Vermelhos de Old Trafford.' },
  { code: 'liverpool', name: 'Liverpool FC', region: 'Inglaterra', domain: 'liverpoolfc.com', hint: 'Reds de Anfield com o pássaro Liver Bird no escudo.' },
  { code: 'arsenal', name: 'Arsenal FC', region: 'Inglaterra', domain: 'arsenal.com', hint: 'Gunners de Londres com o canhão vermelho no escudo.' },
  { code: 'chelsea', name: 'Chelsea FC', region: 'Inglaterra', domain: 'chelseafc.com', hint: 'Blues de Londres com o leão segurando o cetro.' },
  { code: 'tottenham', name: 'Tottenham Hotspur', region: 'Inglaterra', domain: 'tottenhamhotspur.com', hint: 'Spurs de Londres com o galo sobre a bola de futebol.' },
  { code: 'newcastle', name: 'Newcastle United', region: 'Inglaterra', domain: 'nufc.co.uk', hint: 'Magpies alvinegros com os cavalos-marinhos no brasão.' },
  { code: 'aston-villa', name: 'Aston Villa', region: 'Inglaterra', domain: 'avfc.co.uk', hint: 'Tradicional clube de Birmingham com o leão em fundo azul celestial.' },

  // Alemanha (Bundesliga)
  { code: 'bayern-munich', name: 'Bayern de Munique', region: 'Alemanha', domain: 'fcbayern.com', hint: 'Gigante da Baviera com o escudo redondo vermelho e azul.' },
  { code: 'dortmund', name: 'Borussia Dortmund', region: 'Alemanha', domain: 'bvb.de', hint: 'Auralinegros da Muralha Amarela com a sigla BVB 09.' },
  { code: 'leverkusen', name: 'Bayer Leverkusen', region: 'Alemanha', domain: 'bayer04.de', hint: 'Campeão invicto da Bundesliga com o leão da Bayer.' },
  { code: 'rb-leipzig', name: 'RB Leipzig', region: 'Alemanha', domain: 'rbleipzig.com', hint: 'Clube dos touros vermelhos na Alemanha.' },

  // Itália (Serie A)
  { code: 'juventus', name: 'Juventus', region: 'Itália', domain: 'juventus.com', hint: 'Velha Senhora de Turim com as listras alvinegras e a letra J.' },
  { code: 'inter-milan', name: 'Inter de Milão', region: 'Itália', domain: 'inter.it', hint: 'Nerazzurri de Milão com as cores azul e preta.' },
  { code: 'ac-milan', name: 'AC Milan', region: 'Itália', domain: 'acmilan.com', hint: 'Rossoneri de San Siro com as cores vermelha e preta.' },
  { code: 'roma', name: 'AS Roma', region: 'Itália', domain: 'asroma.com', hint: 'Giallorossi de Roma com a loba amamentando Rômulo e Remo.' },
  { code: 'napoli', name: 'SSC Napoli', region: 'Itália', domain: 'sscnapoli.it', hint: 'Partenopei de Nápoles imortalizado por Diego Maradona com a letra N.' },
  { code: 'lazio', name: 'SS Lazio', region: 'Itália', domain: 'sslazio.it', hint: 'Biancocelesti de Roma com a águia azul e branca.' },
  { code: 'fiorentina', name: 'ACF Fiorentina', region: 'Itália', domain: 'acffiorentina.com', hint: 'Viola de Florença com o lírio roxo.' },

  // França & Portugal
  { code: 'psg', name: 'Paris Saint-Germain', region: 'França', domain: 'psg.fr', hint: 'Clube de Paris na França com a Torre Eiffel vermelha.' },
  { code: 'marseille', name: 'Olympique de Marseille', region: 'França', domain: 'om.fr', hint: 'Campeão europeu francês das cores azul celeste e branca.' },
  { code: 'lyon', name: 'Olympique Lyonnais', region: 'França', domain: 'ol.fr', hint: 'Clube de Lyon com o leão azul e vermelho.' },
  { code: 'benfica', name: 'SL Benfica', region: 'Portugal', domain: 'slbenfica.pt', hint: 'Águias de Lisboa em Portugal.' },
  { code: 'sporting', name: 'Sporting CP', region: 'Portugal', domain: 'sporting.pt', hint: 'Leões de Lisboa com o escudo verde e branco.' },
  { code: 'porto', name: 'FC Porto', region: 'Portugal', domain: 'fcporto.pt', hint: 'Dragões do Porto com as cores azul e branca.' },

  // América do Sul & Holanda
  { code: 'boca-juniors', name: 'Boca Juniors', region: 'Argentina', domain: 'bocajuniors.com.ar', hint: 'Xeneizes de La Bombonera em Buenos Aires.' },
  { code: 'river-plate', name: 'River Plate', region: 'Argentina', domain: 'cariverplate.com.ar', hint: 'Millonarios do Monumental de Nuñez com a faixa diagonal.' },
  { code: 'independiente', name: 'CA Independiente', region: 'Argentina', domain: 'clubaindependiente.com.ar', hint: 'Rei de Copas da Argentina de cor vermelha.' },
  { code: 'racing', name: 'Racing Club', region: 'Argentina', domain: 'racingclub.com.ar', hint: 'Academia de Avellaneda azul celeste e branca.' },
  { code: 'penarol', name: 'CA Peñarol', region: 'Uruguai', domain: 'penarol.org', hint: 'Gigante uruguaio aurinegro de Montevidéu.' },
  { code: 'nacional-uru', name: 'CN de Football', region: 'Uruguai', domain: 'nacional.uy', hint: 'Tricolor uruguaio de Montevidéu.' },
  { code: 'ajax', name: 'AFC Ajax', region: 'Holanda', domain: 'ajax.nl', hint: 'Gigante holandês de Amsterdã com a cabeça do herói grego Ájax.' },
  { code: 'psv', name: 'PSV Eindhoven', region: 'Holanda', domain: 'psv.nl', hint: 'Clube da Philips em Eindhoven de listras vermelhas e brancas.' },

  // Ásia, EUA & Mundo
  { code: 'inter-miami', name: 'Inter Miami CF', region: 'Estados Unidos', domain: 'intermiamicf.com', hint: 'Clube de Lionel Messi nos EUA com os flamingos rosa.' },
  { code: 'al-nassr', name: 'Al-Nassr FC', region: 'Arábia Saudita', domain: 'alnassr.sa', hint: 'Clube de Cristiano Ronaldo na Arábia Saudita.' },
  { code: 'al-hilal', name: 'Al-Hilal FC', region: 'Arábia Saudita', domain: 'alhilal.com', hint: 'Maior campeão da Arábia Saudita de azul e branco.' },
  { code: 'al-ittihad', name: 'Al-Ittihad FC', region: 'Arábia Saudita', domain: 'ittihadclub.sa', hint: 'Tigres de Jeddah na Arábia Saudita de cor amarela e preta.' }
];
