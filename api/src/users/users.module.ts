import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { UsersController } from './users.controller';
import { FactureSchema } from 'src/factures/entities/facture.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'factures', schema: FactureSchema}], 'db1'),
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema}], 'db1')
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
