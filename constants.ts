
import { ZodiacSign, SamjaeType } from './types';

export const ZODIAC_ORDER: ZodiacSign[] = [
  ZodiacSign.Rat,
  ZodiacSign.Ox,
  ZodiacSign.Tiger,
  ZodiacSign.Rabbit,
  ZodiacSign.Dragon,
  ZodiacSign.Snake,
  ZodiacSign.Horse,
  ZodiacSign.Sheep,
  ZodiacSign.Monkey,
  ZodiacSign.Rooster,
  ZodiacSign.Dog,
  ZodiacSign.Pig
];

// Based on traditional Sam-jae logic
// Shin-Ja-Jin (Monkey, Rat, Dragon) -> Year of Tiger, Rabbit, Dragon
// Hae-Myo-Mi (Pig, Rabbit, Sheep) -> Year of Snake, Horse, Sheep
// In-Oh-Sul (Tiger, Horse, Dog) -> Year of Monkey, Rooster, Dog
// Sa-Yu-Chuk (Snake, Rooster, Ox) -> Year of Pig, Rat, Ox

export const getZodiacFromYear = (year: number): ZodiacSign => {
  // 1924 was Year of the Rat (index 0)
  const baseYear = 1924;
  const index = (year - baseYear) % 12;
  return ZODIAC_ORDER[index < 0 ? index + 12 : index];
};

export const getSamjaeStatus = (birthYear: number, targetYear: number): { type: SamjaeType; isSamjae: boolean } => {
  const birthZodiac = getZodiacFromYear(birthYear);
  const targetZodiac = getZodiacFromYear(targetYear);

  const groups = [
    { signs: [ZodiacSign.Monkey, ZodiacSign.Rat, ZodiacSign.Dragon], years: [ZodiacSign.Tiger, ZodiacSign.Rabbit, ZodiacSign.Dragon] },
    { signs: [ZodiacSign.Pig, ZodiacSign.Rabbit, ZodiacSign.Sheep], years: [ZodiacSign.Snake, ZodiacSign.Horse, ZodiacSign.Sheep] },
    { signs: [ZodiacSign.Tiger, ZodiacSign.Horse, ZodiacSign.Dog], years: [ZodiacSign.Monkey, ZodiacSign.Rooster, ZodiacSign.Dog] },
    { signs: [ZodiacSign.Snake, ZodiacSign.Rooster, ZodiacSign.Ox], years: [ZodiacSign.Pig, ZodiacSign.Rat, ZodiacSign.Ox] }
  ];

  const matchGroup = groups.find(g => g.signs.includes(birthZodiac));
  if (!matchGroup) return { type: SamjaeType.None, isSamjae: false };

  const yearIndex = matchGroup.years.indexOf(targetZodiac);
  if (yearIndex === 0) return { type: SamjaeType.Deul, isSamjae: true };
  if (yearIndex === 1) return { type: SamjaeType.Nul, isSamjae: true };
  if (yearIndex === 2) return { type: SamjaeType.Nal, isSamjae: true };

  return { type: SamjaeType.None, isSamjae: false };
};

export const ZODIAC_EMOJIS: Record<ZodiacSign, string> = {
  [ZodiacSign.Rat]: '🐭',
  [ZodiacSign.Ox]: '🐮',
  [ZodiacSign.Tiger]: '🐯',
  [ZodiacSign.Rabbit]: '🐰',
  [ZodiacSign.Dragon]: '🐲',
  [ZodiacSign.Snake]: '🐍',
  [ZodiacSign.Horse]: '🐴',
  [ZodiacSign.Sheep]: '🐑',
  [ZodiacSign.Monkey]: '🐵',
  [ZodiacSign.Rooster]: '🐔',
  [ZodiacSign.Dog]: '🐶',
  [ZodiacSign.Pig]: '🐷'
};

export const KOREAN_YEAR_NAMES: Record<number, string> = {
  2024: '갑진년(甲辰年)',
  2025: '을사년(乙巳年)',
  2026: '병오년(丙午年)',
  2027: '정미년(丁未年)'
};
