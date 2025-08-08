import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import { BaseService } from '../../common/services/base.service';
import { UserRole } from '../user-roles/user-role.entity';
import { Role } from '../roles/role.entity';
import { Op } from 'sequelize';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {
    super(userModel);
  }

  async findByEmailOrNull(email: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: { email, deleted_at: null },
    });
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.findByEmailOrNull(email);
    if (!user) throw new BadRequestException('No existe un usuario con ese email');
    return user;
  }

  async findByPhoneOrNull(phone: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: { phone, deleted_at: null },
    });
  }

  async findByPhone(phone: string): Promise<User> {
    const user = await this.findByPhoneOrNull(phone);
    if (!user) throw new BadRequestException('No existe un usuario con ese teléfono');
    return user;
  }

  async findByEmailOrPhoneOrNull(emailOrPhone: string): Promise<User | null> {
    return await this.userModel.findOne({
      where: {
        [Op.or]: [
          { email: emailOrPhone, deleted_at: null },
          { phone: emailOrPhone, deleted_at: null },
        ],
      },
    });
  }

  async findByEmailOrPhone(emailOrPhone: string): Promise<User> {
    const user = await this.findByEmailOrPhoneOrNull(emailOrPhone);
    if (!user) throw new BadRequestException('No existe un usuario con ese email o teléfono');
    return user;
  }

  async findByIdWithRoles(id: number): Promise<User> {
    const user = await this.userModel.findOne({
      where: { id, deleted_at: null },
      include: [
        {
          model: UserRole,
          as: 'userRoles',
          include: [
            {
              model: Role,
              as: 'role',
            },
          ],
        },
      ],
    });
    if (!user) throw new BadRequestException('No existe un usuario con ese ID');
    return user;
  }
}
