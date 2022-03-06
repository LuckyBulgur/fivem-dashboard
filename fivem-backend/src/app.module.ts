import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OwnedVehiclesModule } from './owned-vehicles/owned-vehicles.module';
import { Owned_vehicles } from './owned-vehicles/owned_vehicles';
import { Users } from './users/users';
import { UsersModule } from './users/users.module';

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      entities: [Users, Owned_vehicles],
      synchronize: false,
    }),
    UsersModule,
    OwnedVehiclesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
