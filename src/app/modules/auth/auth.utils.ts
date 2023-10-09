import bcrypt from 'bcrypt';
import config from '../../../config';

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(
    password,
    Number(config.bycrypt_salt_rounds)
  );
  return hashedPassword;
};

export const comparePassword = async (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> => {
  return await bcrypt.compare(givenPassword, savedPassword);
};

