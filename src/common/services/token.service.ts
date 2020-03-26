import { Injectable } from "@nestjs/common";
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

const privateKEY  = fs.readFileSync('./private.key', 'utf8');
const publicKEY  = fs.readFileSync('./public.key', 'utf8');

@Injectable()
export class TokenService {
  async generateToken(user): Promise<string> {
    return new Promise((resolve, reject) => {
      const userData = {
        id: user.id,
        username: user.username,
        email: user.email,
      }

      jwt.sign(userData, privateKEY, {
          algorithm: 'RS256',
          expiresIn: process.env.ACCESS_TOKEN_LIFE,
        }, (error, token) => {
          if (error) {
            return reject(error);
          }
          resolve(token);
        });
    });
  }

  verifyToken(token: string): Promise<object> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, publicKEY, (error, decoded) => {
        if (error) {
          return reject(error);
        }
        resolve(decoded);
      });
    });
  }

  async generateRefreshToken(user): Promise<string> {
    return new Promise((resolve, reject) => {
      const userData = { id: user.id };

      jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFE }, (error, token) => {
          if (error) {
            return reject(error);
          }
          resolve(token);
        });
    });
  }

  async verifyRefreshToken(token: string): Promise<object> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
        if (error) {
          return reject(error);
        }
        resolve(decoded);
      });
    });
  }
}
