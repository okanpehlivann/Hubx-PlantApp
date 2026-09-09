import type { RefObject } from 'react';
import type { ViewInstance } from 'react-native';
import { Question } from './question';
import { Category } from './category';

export type HomeContentProps = {
  width: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchEmpty: boolean;
  questionsLoading: boolean;
  questionsError?: unknown;
  filteredQuestions: Question[];
  categoriesLoading: boolean;
  categoriesError?: unknown;
  filteredCategories: Category[];
  lastCategoryRowStartIndex: number;
  searchTargetRef: RefObject<ViewInstance | null>;
  voiceButtonRef: RefObject<ViewInstance | null>;
  questionsTargetRef: RefObject<ViewInstance | null>;
};
