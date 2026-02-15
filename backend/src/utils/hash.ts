import bcrypt from 'bcryptjs';

export async function hashPassword(value: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(value, salt);
}

export async function comparePassword(value: string, hashPassword: string): Promise<boolean> {
  return bcrypt.compare(value, hashPassword);
}
