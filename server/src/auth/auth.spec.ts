import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import UserEntity from '../user/user.entity';
import { Repository } from 'typeorm';
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
      imports: [],
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: repositoryMockFactory,
        },
        UserService,
        JwtService,
      ],
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
      jest.spyOn(authService, "fetchData").mockRejectedValue(undefined);
      authController
        .auth('yufytfvyv5dftcg')
        .then(() => done.fail('Should have Thrown BadRequest error'))
        .catch(err => {
          expect(err.status).toBe(400);
          done();
        });
    });

    it('should fail if id_token is not passed', done => {
      jest.spyOn(authService, "fetchData").mockRejectedValue(undefined);
      authController
        .auth(undefined)
        .then(() => done.fail('Should have Thrown BadRequest error'))
        .catch(err => {
          expect(err.status).toBe(400);
          done();
        });
    });

    it("should create a new user entity when id_token is valid and user does not exist", (done) => {
      const user = new UserEntity();
      const MOCK_ACCESS_TOKEN = ""
      const VALID_MOCK_ID_TOKEN = "wdobiausbdcasc";
      
      jest.spyOn(userService, "findByEmail").mockResolvedValue(undefined);
      jest.spyOn(authService, "createUserEntity").mockResolvedValue(user);
      jest.spyOn(authService, "getUserAndAccessToken").mockReturnValue({ user, accessToken: MOCK_ACCESS_TOKEN });
      jest.spyOn(authService,"fetchData").mockResolvedValue({name:"name",email:"email",picture:""})
      authController.auth(VALID_MOCK_ID_TOKEN).then(res => {
        expect(res.user).toBe(user);
        expect(res.accessToken).toEqual(MOCK_ACCESS_TOKEN);
        done();
      }
      ).catch(err => done.fail());
    })
    it("should not create a new user entity when id_token is valid and user does exist", (done) => {
      const user = new UserEntity();
      const MOCK_ACCESS_TOKEN = ""
      const VALID_MOCK_ID_TOKEN = "wdobiausbdcasc";
      
      jest.spyOn(userService, "findByEmail").mockResolvedValue(user);
      jest.spyOn(authService, "createUserEntity").mockResolvedValue(user);
      jest.spyOn(authService, "getUserAndAccessToken").mockReturnValue({ user, accessToken: MOCK_ACCESS_TOKEN })
      jest.spyOn(authService,"fetchData").mockResolvedValue({name:"name",email:"email",picture:""})
      authController.auth(VALID_MOCK_ID_TOKEN).then(res => {
        expect(res.user).toBe(user);
        expect(res.accessToken).toEqual(MOCK_ACCESS_TOKEN);
        done();
      }
      ).catch(err => done.fail());
    })
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
