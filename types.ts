
export enum ZodiacSign {
  Rat = '쥐',
  Ox = '소',
  Tiger = '범',
  Rabbit = '토끼',
  Dragon = '용',
  Snake = '뱀',
  Horse = '말',
  Sheep = '양',
  Monkey = '원숭이',
  Rooster = '닭',
  Dog = '개',
  Pig = '돼지'
}

export enum SamjaeType {
  None = '해당 없음',
  Deul = '들삼재', // Entry
  Nul = '눌삼재',  // Middle
  Nal = '날삼재'   // Exit
}

export interface SamjaeResult {
  isSamjae: boolean;
  type: SamjaeType;
  zodiac: ZodiacSign;
  birthYear: number;
  yearName: string;
}

export interface ZodiacInfo {
  sign: ZodiacSign;
  element: string;
  years: number[];
}
