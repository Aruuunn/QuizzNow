import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {QARepository} from './qa.repository'
import { QaService } from './qa.service';
import { QaController } from './qa.controller';

@Module({
    imports:[TypeOrmModule.forFeature([QARepository])],
    providers:[QARepository, QaService],
    exports:[QARepository,QaService],
    controllers: [QaController]
})
export class QaModule {}
