import {Repository,EntityRepository} from 'typeorm';

import QAEntity from './qa.entity';

@EntityRepository(QAEntity)
export class QARepository extends Repository<QAEntity> {

}

export default QARepository;