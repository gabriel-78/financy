import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export type JwtPayload = {
  id: string;
  email: string;
};

export function signJwt(payload: JwtPayload, expiresIn?: string): string {
  const secret = process.env.JWT_SECRET as unknown as Secret;

  const expiration = expiresIn;

  let options: SignOptions = expiration
    ? { expiresIn: expiration as unknown as NonNullable<SignOptions['expiresIn']> }
    : {};

  return jwt.sign(payload, secret, options);
}
