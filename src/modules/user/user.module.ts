import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntiti } from '../../orm/user/user.entiti';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntiti])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
