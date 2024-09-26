import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntiti } from '../../orm/user/user.entiti';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntiti)
    private readonly userRepository: Repository<UserEntiti>,
  ) {}

  async createUser(username: string, email: string): Promise<void> {
    const uuid = uuidv4();
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      await queryRunner.query('CALL InsertUser(?, ?, ?)', [
        uuid,
        username,
        email,
      ]);
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException(`Error al crear usuario - ${e}`);
    } finally {
      await queryRunner.release();
    }
  }
}
