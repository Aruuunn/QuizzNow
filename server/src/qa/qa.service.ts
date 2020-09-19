import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import QARepository from './qa.repository';

@Injectable()
export class QaService {
    constructor(
        @InjectRepository(QARepository)
        private qaRepo:QARepository){}

    
}
