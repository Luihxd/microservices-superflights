import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { ProxyModule } from 'src/common/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [UsersController],
})
export class UsersModule {}
