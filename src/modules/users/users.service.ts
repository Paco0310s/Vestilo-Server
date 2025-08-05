import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import { BaseService } from '../../common/services/base.service';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {
    super(userModel);
  }

  // Aquí puedes agregar métodos específicos para usuarios si los necesitas
  async findByEmail(email: string): Promise<User | null> {
    return await (this.userModel as any).findOne({
      where: { email, deleted_at: null },
    });
  }
}
