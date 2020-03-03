import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UsersService } from "../users/users.service";
import { User } from "../users/user.entity";
import { AccessTokenPayload } from "./model/AccessTokenPayload.model";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const userNotRaw: User = await this.usersService.findOneByEmail(email);
    if (userNotRaw) {
      const user: User = <User>userNotRaw.get({ plain: true });
      if (await bcrypt.compare(pass, user.password)) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  async login(user: User) {
    const payload: AccessTokenPayload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload)
    };
  }
}
