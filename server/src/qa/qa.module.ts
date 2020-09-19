import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {QARepository} from './qa.repository'
import { QaService } from './qa.service';

@Module({
    imports:[TypeOrmModule.forFeature([QARepository])],
    providers:[QARepository, QaService],
    exports:[QARepository,QaService]
})
export class QaModule {}
