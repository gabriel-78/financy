import bcrypt from 'bcryptjs';

export async function hashPassword(value: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);

  return bcrypt.hash(value, salt);
}
