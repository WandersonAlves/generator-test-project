import GenericException from './GenericException';
import { UNAUTHORIZED } from 'http-status-codes';

export default class AuthException extends GenericException {
  constructor(message?: string) {
    const params = {
      name: 'AuthException',
      message: message || 'JWT expired or not received',
      statusCode: UNAUTHORIZED,
    };
    super(params);

    Object.setPrototypeOf(this, AuthException.prototype);
  }
}
