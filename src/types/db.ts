export interface Theme {
  id: string;
  name: string;
  primary: string | null;
  secondary: string | null;
  accent: string | null;
  dark: boolean | null;
  light: boolean | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionType {
  id: string;
  number: number;
  themeId: string;
  question: string;
  options?: OptionType[];
  type: "MULTIPLE_CHOICE" | "SCALE";
  createdAt: Date;
  updatedAt: Date;
}

export interface OptionType {
  id: string;
  questionId: string;
  description: string;
  value: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommunityType {
    id: string;
    themeId: string;
    name: string;
    description: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}
