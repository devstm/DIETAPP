import { Op } from 'sequelize';
import { CustomError } from 'src/common/utils';
import { UserSignUpDTO } from '../dto';
import { User } from '../model/users.model';

export const CheckUsers = async (data: UserSignUpDTO) => {
  const { username, email } = data;

  const user = await User.findOne({
    where: {
      [Op.or]: [{ email: email }, { username: username }],
    },
  });

  if (user && user.username === username) {
    throw new CustomError('userAlreadyExists', 400);
  }
  if (user && user.email === email) {
    throw new CustomError('emailAlreadyExists', 400);
  }
};
