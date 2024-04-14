import { Module } from '@nestjs/common';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './board.repository';
import { TypeOrmExModule } from '../custom-repository/typeorm-ex.module';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports: [
    // TypeOrmModule.forFeature([BoardRepository]),
    TypeOrmExModule.forCustomRepository([BoardRepository]),
    AuthModule,
  ],
  controllers: [BoardsController],
  providers: [BoardsService],
})

export class BoardsModule { } 
