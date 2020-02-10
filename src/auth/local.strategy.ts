import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { User } from "../users/user.entity";
import errResMsgs from "../services/error-response-messages";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: "email",
      passwordField: "password"
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user: User = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException(
        errResMsgs.ERROR_WRONG_LOGIN_CREDENTIALS.message,
        errResMsgs.ERROR_WRONG_LOGIN_CREDENTIALS.error
      );
    }
    return user;
  }
}
