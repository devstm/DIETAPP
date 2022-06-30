import { hash } from 'bcryptjs';
import { UserSignUpDTO } from '../dto';

export const hashPassword = async (data: UserSignUpDTO) => {
  const { password } = data;
  const hashedPassword = await hash(password, 10);
  const newUser = { ...data, password: hashedPassword };
  return newUser;
};
