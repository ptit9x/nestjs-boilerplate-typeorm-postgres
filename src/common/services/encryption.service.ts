import { Injectable } from "@nestjs/common";
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  getSalt(length = 10): string {
    return crypto.randomBytes(Math.ceil(length / 2))
      .toString('hex') 		/** convert to hexadecimal format */
      .slice(0, length);
  }

  encryptPassword(password: string, salt: string): string {
    const hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    return hash.digest('hex');
  }

  isValidPassword(password: string, salt: string, hash: string) {
    return hash === this.encryptPassword(password, salt);
  }
}
