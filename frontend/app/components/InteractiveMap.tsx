'use client'

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface PathElement {
  attributes: {
    [key: string]: string;
  };
  element?: SVGPathElement;
  isPin?: boolean;
  isPureStroke?: boolean;
}

interface PathCentroid {
  x: number;
  y: number;
}

export function InteractiveMap({ mapName }: { mapName: string }) {
  const [hoveredPath, setHoveredPath] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [paths, setPaths] = useState<PathElement[]>([]);
  const [pinToRegion, setPinToRegion] = useState<Map<number, number>>(new Map());
  const [regionToPins, setRegionToPins] = useState<Map<number, Array<{ pinIdx: number; pathIndex: number }>>>(new Map());
  const [svgContent, setSvgContent] = useState<{ viewBox: string; width: string; height: string }>({
    viewBox: '0 0 500 279',
    width: '400',
    height: '2790',
  });

  // Mapa de nomes das regiões (ajuste conforme necessário)
  const regionNames: { [key: number]: string } = {
    0: 'Baraúna',
    1: "Mossoró",
    2: "Governador Dix-Sept Rosado",
    3: "Apodi",
    5: "Upanema",
    6: "Riacho da Cruz",
    7: "Felipe Guerra",
    8: "Caraúbas",
    11: "Senador Georgino Avelino",
    12: "Tenente Laurentino Cruz",
    14: "Patu",
    15: "Umarizal",
    16: "Rafael Godeiro",
    17: "Viçosa",
    21: "Severiano Melo",
    22: "Itaú",
    23: "Tenente Ananias",
    24: "Alexandria",
    25: "Olho D'Água do Borges",
    26: "Antônio Martins",
    27: "João Dias",
    28: "Tangará",
    29: "São José do Campestre",
    30: "Sítio Novo",
    31: "Barcelona",
    32: "Lagoa de Velhos",
    33: "Ruy Barbosa",
    34: "São Paulo do Potengi",
    35: "São Pedro",
    36: "Ielmo Marinho",
    37: "Macaíba",
    38: "Ceará-Mirim",
    39: "São Gonçalo do Amarante",
    40: 'Natal',
    41: "Nísia Floresta",
    42: "São José de Mipib u",
    43: "Monte Alegre",
    44: "Vera Cruz",
    45: "Boa Saúde",
    46: "Lagoa Salgada",
    47: "Serrinha",
    48: "Santo Antônio",
    49: "Nova Cruz",
    50: "Pedro Velho",
    51: "Canguaretama",
    52: "Baía Formosa",
    53: "Goianinha",
    54: "Tíbau do Sul",
    55: "Arez",
    56: "Espírito Santo",
    57: "Riachuelo",
    58: "Lajes",
    59: "São Bento do Trairí",
    60: "Bodó",
    61: "Lagoa Nova",
    62: "Santana do Matos",
    63: "Cerro Corá",
    64: "Santa Cruz",
    65: "São Tomé",
    66: "Campo Redondo",
    67: "Coronel Ezequiel",
    68: "Jaçanã",
    69: "Currais Novos",
    70: " São Vicente",
    71: "São José do Seridó",
    72: "Carnaúba dos Dantas",
    73: "Parelhas",
    74: "Equador",
    75: "Santana do Seridó",
    77: "Jardim de Piranhas",
    76: "Timbaúba dos Batistas",
    78: "São Fernando",
    79: "Caicó",
    80: "São João do Sabugi",
    81: "Ipueira",
    82: "Ouro Branco",
    83: "Jardim do Seridó",
    84: "Acari",
    85: "Cruzeta",
    86: "Florânia",
    87: "Jucurutu",
    88: "São Rafael",
    89: "Serra Negra do Norte",
    90: "Paraú",
    91: "Triunfo Potiguar",
    92: "Janduis",
    93: "Campo Grande",
    94: "Messias Targino",
    95: "Serrinha dos Pintos",
    96: "Martins",
    97: "Portalegre",
    98: "Francisco Dantas",
    99: "São Francisco do Oeste",
    100: "Rodolfo Fernandes",
    101: "Taboleiro Grande",
    102: "Lucrécia",
    103: "Almino Afonso",
    104: "Frutuoso Gomes",
    105: "Pilões",
    106: "Pau dos Ferros",
    107: "Encanto",
    108: "Doutor Severiano",
    109: "Água Nova",
    110: "Rafael Fernandes",
    111: "Riacho de Santana",
    112: "São Miguel",
    113: "Venha-Ver",
    114: "Coronel João Pessoa",
    115: "Marcelino Vieira",
    116: "José da Penha",
    117: "Major Sales",
    118: "Luís Gomes",
    119: "Paraná",
    120: "Lajes Pintadas",
    121: "Pedra Preta",
    122: "Jardim de Angicos",
    123: "Caiçara do Rio do Vento",
    124: "Fernando Pedroza",
    125: "Areia Branca",
    126: "Grossos",
    127: "Tibau",
    128: "Alto do Rodrigues",
    129: "Pendências",
    130: "Macau",
    131: "Pedro Avelino",
    132: "São Bento do Norte",
    133: "Angicos",
    134: "Ipanguaçu",
    135: "Itajá",
    136: "Assú",
    137: "Caraúbas",
    138: "Serra do Mel",
    139: "Porto do Mangue",
    140: "Guamaré ",
    141: "Galinhos",
    144: "Touros",
    143: "João Câmara",
    145: "Pedra Grande",
    146: "São Miguel do Gostoso",
    147: "São Bento do Norte",
    148: "Caiçara do Norte",
    149: "Parazinho",
    150: "Pureza",
    151: "Taipu",
    152: "Poço Branco",
    153: "Bento Fernandes",
    154: "Santa Maria",
    155: "Rio do Fogo",
    156: "Maxaranguape",
    157: "Extremoz",
    158: "Serra Caiada",
    159: "Senador Elói de Souza",
    161: "Serra de São Bento",
    160: "Bom Jesus",
    162: "Monte das Gameleiras",
    163: "Japi",
    164: "Passa e Fica",
    165: "Lagoa D'Anta",
    166: "Jundiá",
    167: "Parnamirim",
    168: "Passagem,",
    169: "Brejinho",
    170: "Lagoa de Pedras",
    171: "Várzea",
    172: "Montanhas",
    173: "Vila Flor",

  };

  const MaRegionNames: { [key: number]: string } = {
    0: "Fortaleza dos Nogueiras",
    1: "Nova Colinas",
    2: "Loreto",
    3: "Sambaíba",
    4: "Benedito Leite",
    5: "São Domingos do Azeitão",
    6: "São Félix de Balsas",
    7: "São Raimundo das Mangabeiras",
    8: "Feira Nova do Maranhão",
    9: "Balsas",
    10: "Riachão",
    11: "Tasso Fragoso",
    12: "Alto Parnaíba",
    13: "Estreito",
    14: "Campestre do Maranhão",
    15: "Carolina",
    16: "São João do Paraíso",
    17: "São Pedro dos Crentes",
    18: "Porto Franco",
    19: "Mirador",
    20: "Colinas",
    21: "Jatobá",
    22: "São Francisco do Maranhão",
    23: "São João dos Patos",
    24: "Barão de Grajaú",
    25: "Nova Iorque",
    26: "Paraibano",
    27: "Pastos Bons",
    28: "Sucupira do Norte",
    29: "Sucupira do Riachão",
    30: "Lagoa do Mato",
    31: "Passagem Franca",
    32: "Buriti Bravo",
    33: "Parnarama",
    34: "Matões",
    35: "Timon",
    36: "Duque Bacelar",
    37: "Aldeias Altas",
    38: "Afonso Cunha",
    39: "Coelho Neto",
    40: "Alto Alegre do Maranhão",
    41: "Coroatá",
    42: "Peritoró",
    43: "Timbiras",
    44: "Capinzal do Norte",
    45: "Buriti",
    46: "Anapurus",
    47: "Chapadinha",
    48: "Mata Roma",
    49: "São Benedito do Rio Preto",
    50: "Urbano Santos",
    51: "Belágua",
    52: "Brejo",
    53: "Milagres do Maranhão",
    55: "Santana do Maranhão",
    54: "Santa Quitéria do Maranhão",
    56: "Magalhães de Almeida",
    57: "São Bernardo",
    58: "Água Doce do Maranhão",
    59: "Araioses",
    60: "São Domingos do Maranhão",
    61: "Fortuna",
    62: "Governador Eugênio Barros",
    63: "Governador Luiz Rocha",
    64: "Graça Aranha",
    65: "Presidente Dutra",
    66: "Governador Archer",
    67: "Dom Pedro",
    68: "Gonçalves Dias",
    69: "São José dos Basílios",
    70: "Senador Alexandre Costa",
    71: "Formosa da Serra Negra",
    72: "Sítio Novo",
    73: "Jenipapo dos Vieiras",
    74: "Grajaú",
    75: "Arame",
    76: "Barra do Corda",
    77: "Fernando Falcão",
    78: "Itaipava do Grajaú",
    79: "Joselândia",
    80: "Santa Filomena do Maranhão",
    81: "Tuntum",
    82: "Bernardo do Mearim",
    83: "São Luís Gonzaga do Maranhão",
    84: "Lima Campos",
    85: "São Raimundo do Doca Bezerra",
    86: "São Roberto",
    87: "Esperantinópolis",
    89: "Lago do Junco",
    88: "Igarapé Grande",
    90: "Lago dos Rodrigues",
    91: "Poção de Pedras",
    92: "Bernardo do Mearim",
    93: "Pedreiras",
    94: "Trizidela do Vale",
    95: "São João do Caru",
    96: "Governador Newton Bello",
    97: "Bom Jesus das Selvas",
    98: "Brejo de Areia",
    99: "Buriticupu",
    100: "Marajá do Sena",
    101: "Santa Luzia",
    102: "Tufilândia",
    103: "Zé Doca",
    104: "Nova Olinda do Maranhão",
    105: "Santa Luzia do Paruá",
    106: "Altamira do Maranhão",
    107: "Alto Alegre do Pindaré",
    108: "Araguanã",
    109: "Lagoa Grande do Maranhão",
    110: "Presidente Médici",
    111: "Buritirana",
    112: "Davinópolis",
    113: "Governador Edison Lobão",
    114: "Cidelândia",
    115: "São Pedro da Água Branca",
    116: "Vila Nova dos Martírios",
    117: "Imperatriz ",
    118: "Açailândia",
    119: "Bom Jardim",
    120: "Itinga do Maranhão",
    121: "Amarante do Maranhão",
    122: "João Lisboa",
    123: "Lajeado Novo",
    124: "Montes Altos",
    125: "Ribamar Fiquene",
    126: "São Francisco do Brejão",
    127: "Senador La Rocque",
    128: "Amapá do Maranhão",
    129: "Boa Vista do Gurupi",
    130: "Carutapera",
    131: "Governador Nunes Freire",
    132: "Junco do Maranhão",
    133: "Maracaçumé",
    135: "Cândido Mendes",
    148: "Godofredo Viana",
    151: "Luís Domingues",
    158: "Maranhãozinho",
    159: "Centro do Guilherme",
    160: "Turilândia",
    161: "Turiaçu",
    162: "Centro Novo do Maranhão",
    164: "Itapecuru-Mirim",
    166: "Matões do Norte",
    167: "Miranda do Norte",
    168: "Nina Rodrigues",
    169: "Pirapemas",
    165: "Cantanhede",
    170: "Presidente Vargas",
    171: "Vargem Grande",
    172: "Monção",
    173: "Codó",
    174: "Santo Antônio dos Lopes",
    175: "São João do Soter",
    176: "Caxias",
    177: "Santa Inês",
    178: "Pindaré-Mirim",
    179: "Pedro do Rosário",
    180: "Penalva",
    181: "Palmeirandia",
    182: "Peri Mirim",
    183: "Pinheiro",
    184: "Presidente Sarney",
    185: "Santa Helena",
    186: "São Bento",
    187: "Vitória do Mearim",                                                
    188: "Cajari",
    189: "Igarapé do Meio",
    190: "Matinha",
    191: "Olinda Nova do Maranhão",
    192: "São Vicente Férrer",
    193: "Viana",
    194: "Bela Vista do Maranhão",
    195: "Satubinha",
    196: "Pio XII",
    197: "Conceição do Lago Açu",
    198: "Olho d'Água das Cunhãs",
    199: "Vitorino Freire",
    200: "Paulo Ramos",
    201: "Lago da Pedra",
    202: "Bacabal",
    203: "Lago Verde",
    204: "São Mateus do Maranhão",
    205: "São João Batista",
    206: "Arari",
    207: "Anajatuba",
    208: "Paulino Neves",
    209: "Barreirinhas",
    210: "Humberto de Campos",
    211: "Primeira Cruz",
    212: "Santo Amaro do Maranhão",
    213: "Tutóia",
    215: "Bacabeira",
    214: "Santa Rita",
    216: "Morros",
    217: "Axixá",
    218: "Cachoeira Grande",
    219: "Icatu",
    220: "Presidente Juscelino",
    221: "Rosário",
    227: "Serrano do Maranhão",
    228: "Apicum-Açu",
    222: "São Luís",
    224: "Raposa",
    225: "Bacuri",
    226: "Mirinzal",
    245:"Cururupu",
    260: "Porto Rico do Maranhão",
    263: "Alcântara",
    264: "Bequimão",
    265: "Central do Maranhão",
    266: "Cedral ",
    268: "Guimarães",
    273: "Bacurituba",
    274: "Cajapió",
    275: "São José de Ribamar",
    276: "Paço do Lumiar",

  }

  useEffect(() => {
    const fetchAndParseSVG = async () => {
      try {
        const response = await fetch(`/${mapName}.svg`);
        const svgText = await response.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');

        const svgElement = svgDoc.querySelector('svg');
        if (svgElement) {
          setSvgContent({
            viewBox: svgElement.getAttribute('viewBox') || '0 0 440 279',
            width: svgElement.getAttribute('width') || '440',
            height: svgElement.getAttribute('height') || '279',
          });
        }

        const pathElements = svgDoc.querySelectorAll('path');
        const pathsArray: PathElement[] = [];
        const pinToRegionMap = new Map<number, number>();

        let regionIndex = 0;
        let pinIndex = 0;
        let lastRegionIndex = 0;

        // Primeira passagem: mapear pins para regiões baseado em cor
        // Regiões: cores escuras (azul), Pins: cores claras/laranja
        pathElements.forEach((path, fileIndex) => {
          const attributes: { [key: string]: string } = {};
          Array.from(path.attributes).forEach((attr) => {
            attributes[attr.name] = attr.value;
          });

          // Detecta pins pela cor: se tem fill="#FF6A00" (laranja RN) ou cores muito claras
          const fill = path.getAttribute('fill')?.toLowerCase() || '';
          const stroke = path.getAttribute('stroke')?.toLowerCase() || '';
          const isPin = fill === '#ff6a00' || fill.includes('ff6a00');
          
          // Detecta se é apenas um stroke (linha de divisão) - tem stroke mas não tem fill
          const isPureStroke = (fill === '' || fill === 'none') && stroke !== '';
          
          pathsArray.push({ attributes, isPin, isPureStroke });

          if (isPin) {
            // Mapear cada pin para a região mais recente que foi encontrada
            pinToRegionMap.set(pinIndex, lastRegionIndex);
            pinIndex++;
          } else if (!isPureStroke) {
            // É uma região (não é stroke puro)
            lastRegionIndex = regionIndex;
            regionIndex++;
          }
        });

        console.log('pinToRegionMap (primeiros 20):', Array.from(pinToRegionMap.entries()).slice(0, 20));

        // Criar mapa reverso: regionIndex → [{ pinIdx, pathIndex }]
        const regionToPinsMap = new Map<number, Array<{ pinIdx: number; pathIndex: number }>>();
        for (let i = 0; i < regionIndex; i++) {
          regionToPinsMap.set(i, []);
        }

        // Iterar sobre pathsArray e mapear pins para regiões
        let pinCounter = 0;
        pathsArray.forEach((p, idx) => {
          if (p.isPin) {
            if (pinToRegionMap.has(pinCounter)) {
              const regionIdx = pinToRegionMap.get(pinCounter)!;
              const pins = regionToPinsMap.get(regionIdx) || [];
              pins.push({ pinIdx: pinCounter, pathIndex: idx });
              regionToPinsMap.set(regionIdx, pins);
            }
            pinCounter++;
          }
        });

        // Debug final
        const regiõesComPins = Array.from(regionToPinsMap.entries()).filter(([_, pins]) => pins.length > 0);
        console.log(`Total de regiões com pins: ${regiõesComPins.length}`);
        console.log('Alguns exemplos de pins por região:', regiõesComPins.slice(0, 5).map(([region, pins]) => ({ region, count: pins.length })));

        setPaths(pathsArray);
        setPinToRegion(pinToRegionMap);
        setRegionToPins(regionToPinsMap);
      } catch (error) {
        console.error('Erro ao carregar SVG:', error);
      }
    };

    fetchAndParseSVG();
  }, [mapName]);

  if (paths.length === 0) {
    return <div className="w-full h-full bg-gray-100 rounded animate-pulse" />;
  }

  const isSP = mapName.includes('sp');

  return (
    <>
    <div className="relative w-full h-full flex justify-center items-center">      
    <svg
      viewBox={svgContent.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-auto"
      style={{ 
        maxWidth: mapName.includes('ma') ? '300px' : mapName.includes('pi') ? '300px' : mapName.includes('sp') ? '550px' : '100%',
        maxHeight: mapName.includes('ma') || mapName.includes('pi') ? '400px' : 'none'
      }}
    >
      <defs>
        <filter id="filter0_d_1212_1124" x="0" y="0" width="440" height="279" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="saturate" values="0" />
          <feOffset dx="2" dy="2" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1212_1124" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_1212_1124" result="shape" />
        </filter>
      </defs>

      <g filter="url(#filter0_d_1212_1124)">
        {(() => {
          let regionIndex = 0;

          return paths.map((path, pathIndex) => {
            if (path.isPin) return null;

            // Se é um stroke puro (linha de divisão), renderiza sem interatividade
            if (path.isPureStroke) {
              return (
                <path
                  key={`stroke-${pathIndex}`}
                  d={path.attributes.d}
                  fill="none"
                  stroke={path.attributes.stroke || '#7581BC'}
                  strokeWidth={
                    path.attributes['stroke-width'] || 
                    (mapName.includes('sp') ? 0.8 : mapName.includes('ma') ? 0.3 : 0.5)
                  }
                  strokeLinecap={path.attributes['stroke-linecap'] as any || 'round'}
                  strokeLinejoin={path.attributes['stroke-linejoin'] as any || 'round'}
                  fillRule={path.attributes['fill-rule'] as any}
                  clipRule={path.attributes['clip-rule'] as any}
                  pointerEvents="none"
                />
              );
            }

            const d = path.attributes.d;
            const currentRegionIndex = regionIndex;
            const isHovered = hoveredPath === currentRegionIndex;
            const originalFill = path.attributes.fill || '#081C43';
            const originalStroke = path.attributes.stroke || '#7581BC';

            const pinIndexes = regionToPins.get(currentRegionIndex) || [];

            regionIndex++;

            return (
              <g
                key={`region-${currentRegionIndex}`}
                style={{
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  transformOrigin: 'center',
                  transformBox: 'fill-box',
                  transition: 'transform 200ms ease-in-out',
                }}
              >
                <path
                  fillRule={path.attributes['fill-rule'] as any}
                  clipRule={path.attributes['clip-rule'] as any}
                  d={d}
                  fill={isHovered ? '#05235D' : originalFill}
                  fillOpacity={isHovered ? '1' : path.attributes['fill-opacity'] || '0.99'}
                  stroke={originalStroke}
                  strokeWidth={mapName.includes('ma') ? 0.3 : 0.5}
                  onMouseEnter={(e) => {
                    console.log(currentRegionIndex);
                    
                    setHoveredPath(currentRegionIndex);
                    
                    const pathElement = e.target as SVGPathElement;
                    const svg = pathElement.closest('svg') as SVGSVGElement;
                    
                    if (svg && pathElement) {
                      try {
                        // Pega o bounding box da região no espaço do SVG
                        const bbox = pathElement.getBBox();
                        const svgRect = svg.getBoundingClientRect();
                        const viewBox = svg.viewBox.baseVal;

                        // Centro da região no espaço SVG
                        const centerXinSVG = bbox.x + bbox.width / 2;
                        const centerYinSVG = bbox.y + bbox.height / 2;
                        
                        // Escala do SVG
                        const scaleX = svgRect.width / viewBox.width;
                        const scaleY = svgRect.height / viewBox.height;

                        // Posição do centro em pixels de tela
                        const centerX = svgRect.left + centerXinSVG * scaleX;
                        const centerY = svgRect.top + centerYinSVG * scaleY;

                        setMousePos({
                          x: centerX,
                          y: centerY,
                        });
                      } catch (err) {
                        console.error('Erro ao calcular posição:', err);
                      }
                    }
                  }}
                  onMouseLeave={() => setHoveredPath(null)}
                  className={`cursor-pointer ${isHovered ? 'filter drop-shadow-lg' : ''}`}
                />

                {pinIndexes.map(({ pinIdx, pathIndex: pinPathIndex }) => {
                  const pinPath = paths[pinPathIndex];
                  return (
                    <path
                      key={`pin-${currentRegionIndex}-${pinIdx}`}
                      d={pinPath.attributes.d}
                      fill={isHovered ? '#FF8C00' : (pinPath.attributes.fill || '#081C43')}
                      stroke={isHovered ? '#e68000' : (pinPath.attributes.stroke || '#e6800050')}
                      strokeWidth={isHovered ? 1 : 0.8}
                      fillRule={pinPath.attributes['fill-rule'] as any}
                      clipRule={pinPath.attributes['clip-rule'] as any}
                      className="transition-all duration-300 ease-out"
                      style={{
                        filter: isHovered
                          ? 'drop-shadow(0 2px 3px rgba(255,140,0,0.6))'
                          : 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))',
                        transform: isHovered ? 'scale(1.12) translateY(-2px)' : 'scale(1)',
                        transformOrigin: 'center',
                        transformBox: 'fill-box',
                      }}
                    />
                  );
                })}
              </g>
            );
          });
        })()}
      </g>
    </svg>
    </div>

      {/* Tooltip renderizado via Portal no body */}
      {hoveredPath !== null && typeof document !== 'undefined' && createPortal(
        (() => {
          const x = mousePos.x;
          const y = mousePos.y - 35;
          
          return (
            <div
              style={{
                position: 'fixed',
                left: `${x}px`,
                top: `${y}px`,
                transform: 'translate(-50%, -50%)',
                zIndex: 99999,
                pointerEvents: 'none',
              }}
            >
              <div
                className="bg-blue-900 text-white px-1.5 py-0.5 rounded text-[10px]"
                style={{
                  backgroundColor: 'rgba(15, 23, 42, 0.95)',
                  whiteSpace: 'nowrap',
                }}
              >
                {mapName.includes('rn') ? regionNames[hoveredPath] || `Região ${hoveredPath}` : mapName.includes('ma') ? MaRegionNames[hoveredPath] || `Região ${hoveredPath}` : `Região ${hoveredPath}`}
              </div>
            </div>
          );
        })(),
        document.body
      )}
    </>
  );
}

