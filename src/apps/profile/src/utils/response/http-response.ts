import { CustomError } from './CustomError';
import { Response } from 'express';

/**
 * Return 200 HTTP response
 *
 * @param {(string | { [key: string]: any })} [body='Success']
 * @param res
 * @returns {Response}
 */
function success(
  body: string | { [key: string]: any } = 'Success',
  res: Response
): Response {
  const responseBody = typeof body === 'string' ? body : JSON.stringify(body);
  return res.status(200).json({
    httpStatusCode: 200,
    body: responseBody,
  });
}

/**
 * Return 400 HTTP response
 *
 * @param {(string | { [key: string]: any })} [body='Bad Request']
 */
function badRequest(body: string | { [key: string]: any } = 'Bad Request') {
  return defaultError(400, body);
}

/**
 * Return 401 HTTP response
 *
 * @param {(string | { [key: string]: any })} [body='Unauthorized']
 */
function unauthorized(body: string | { [key: string]: any } = 'Unauthorized') {
  return defaultError(401, body);
}

/**
 * Return 403 HTTP response
 *
 * @param {(string | { [key: string]: any })} [body='Forbidden']
 */
function forbidden(body: string | { [key: string]: any } = 'Forbidden') {
  return defaultError(403, body);
}

/**
 * Return 404 HTTP response
 *
 * @param {(string | { [key: string]: any })} [body='Not Found']
 */
function notFound(body: string | { [key: string]: any } = 'Not Found') {
  return defaultError(404, body);
}

/**
 * Return Generic HTTP error
 *
 * @param {number} [statusCode=500]
 * @param {(string | { [key: string]: any })} [body='Internal Server Error']
 */
function defaultError(
  statusCode = 500,
  body: string | { [key: string]: any } = 'Internal Server Error'
): never {
  throw new CustomError(statusCode, body);
}

export default {
  success,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  defaultError,
};
