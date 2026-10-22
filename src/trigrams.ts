/**
 * The eight trigrams (bagua), each a fixed three-line pattern.
 *
 * `lines` is bottom-to-top, 1 = yang (solid), 0 = yin (broken) — the same
 * convention used throughout this pack. The family associations (eldest/
 * middle/youngest son or daughter) and the attribute/image glosses are
 * traditional correspondences found across I Ching literature; the wording
 * here is original, written for this pack.
 */

export type TrigramKey = 'qian' | 'dui' | 'li' | 'zhen' | 'xun' | 'kan' | 'gen' | 'kun';

export interface Trigram {
  key: TrigramKey;
  name: string;
  chinese: string;
  attribute: string;
  image: string;
  lines: [0 | 1, 0 | 1, 0 | 1];
}

export const TRIGRAMS: Record<TrigramKey, Trigram> = {
  qian: {
    key: 'qian',
    name: 'Qian',
    chinese: '乾',
    attribute: 'strong and untiring',
    image: 'heaven, pure yang, the father',
    lines: [1, 1, 1],
  },
  dui: {
    key: 'dui',
    name: 'Dui',
    chinese: '兌',
    attribute: 'joyous and open',
    image: 'lake, a marsh, the youngest daughter',
    lines: [1, 1, 0],
  },
  li: {
    key: 'li',
    name: 'Li',
    chinese: '離',
    attribute: 'clinging and illuminating',
    image: 'fire, the sun, the middle daughter',
    lines: [1, 0, 1],
  },
  zhen: {
    key: 'zhen',
    name: 'Zhen',
    chinese: '震',
    attribute: 'arousing and initiating',
    image: 'thunder, the eldest son',
    lines: [1, 0, 0],
  },
  xun: {
    key: 'xun',
    name: 'Xun',
    chinese: '巽',
    attribute: 'gentle and penetrating',
    image: 'wind and wood, the eldest daughter',
    lines: [0, 1, 1],
  },
  kan: {
    key: 'kan',
    name: 'Kan',
    chinese: '坎',
    attribute: 'perilous and flowing',
    image: 'water, a chasm, the middle son',
    lines: [0, 1, 0],
  },
  gen: {
    key: 'gen',
    name: 'Gen',
    chinese: '艮',
    attribute: 'still and bounding',
    image: 'mountain, a halt, the youngest son',
    lines: [0, 0, 1],
  },
  kun: {
    key: 'kun',
    name: 'Kun',
    chinese: '坤',
    attribute: 'yielding and nurturing',
    image: 'earth, pure yin, the mother',
    lines: [0, 0, 0],
  },
};

export const TRIGRAM_LIST: Trigram[] = Object.values(TRIGRAMS);
