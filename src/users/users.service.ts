import { Injectable, Inject } from "@nestjs/common";
import { User } from "./user.entity";
import { DatabaseConstants } from "../database/database-constants";
import * as bcrypt from "bcryptjs";

@Injectable()
export class UsersService {
  constructor(
    @Inject(DatabaseConstants.USERS_REPOSITORY)
    private readonly usersRepository: typeof User
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    const whereParameters = {
      email
    };
    return this.usersRepository.findOne<User>({
      where: whereParameters
    });
  }

  async findOneById(userId: number): Promise<User> {
    return this.usersRepository.findByPk(userId);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }

  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Promise<User> {
    const newUser = {
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 10)
    };
    const createdNewUser = await this.usersRepository.create(newUser);
    const createdNewUserRaw: User = <User>createdNewUser.get({ plain: true });
    delete createdNewUserRaw.password;
    delete createdNewUserRaw.updatedAt;
    delete createdNewUserRaw.createdAt;
    return createdNewUserRaw;
  }
}
