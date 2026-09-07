import type { BaseResponse } from './baseResponse';

export interface Question {
  id: number;
  title: string;
  subtitle: string;
  image_uri: string;
  uri: string;
  order: number;
}

export type GetQuestionsApiResponse = Question[];
export type GetQuestionsResponse = BaseResponse<Question[]>;
