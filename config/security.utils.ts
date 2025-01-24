import crypto = require('crypto');
import { Hmac } from 'crypto';
import { SecurityPassword } from '../common/variable.utils';

export function generateRandomString(length: number): string {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);
}

export function sha512(password: string, salt: string): SecurityPassword {
  const hash: Hmac = crypto.createHmac('sha512', salt);
  hash.update(password);
  const hashedPassword: string = hash.digest('hex');

  return {
    salt: salt,
    hashedPassword: hashedPassword,
  };
}

export function saltHashPassword(password: string): SecurityPassword {
  const salt: string = generateRandomString(16);
  return sha512(password, salt);
}

export function validatePassword(password: string, salt: string, hashedPassword: string): boolean {
  const passwordData: SecurityPassword = sha512(password, salt);
  return passwordData.hashedPassword == hashedPassword;
}
