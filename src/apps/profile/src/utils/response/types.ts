export type ErrorType =
  | 'Bad Request'
  | 'Unauthorized'
  | 'Not Found'
  | 'Forbidden'
  | 'Internal Server Error';

export interface HTTPSuccessResponse {
  httpStatusCode: number;
  body: string | { [key: string]: any };
}
