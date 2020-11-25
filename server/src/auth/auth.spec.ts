import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import UserEntity from '../user/user.entity';
import { Repository } from 'typeorm';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';

describe('--- Auth Module ---', () => {
  let authService: AuthService;
  let authController: AuthController;
  let module: TestingModule;

  let userService = { findByEmail: () => undefined };
  let jwtService = {};

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
       
      ],
      providers: [AuthService, {
        provide: getRepositoryToken(UserEntity),
        useFactory: repositoryMockFactory,
      },UserService,JwtService],
      controllers: [AuthController],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .overrideProvider(JwtService)
      .useValue(jwtService)
      .compile();
    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);
  });

  describe('* Authorize User from id_token', () => {
    it('should fail if passed a fake id_token', done => {
      authController
        .auth('yufytfvyv5dftcg')
        .then(() => done.fail('Should have Thrown BadRequest error'))
        .catch(err => {
          expect(err.status).toBe(400);
          done();
        });
    });
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });
});

// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(
  () => ({
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    save: jest.fn(),
  }),
);
export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};
