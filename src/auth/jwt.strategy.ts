import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { AccessTokenPayload } from "./model/AccessTokenPayload.model";
import { UserInReq } from "./model/UserInReq.model";
import envConfig from "../environment.config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: envConfig.app_jwt_secret_key
    });
  }

  /**
   * This will took user info from access token and put it into req.user.
   *
   * If we will need some more info about a user, then
   * this is the place where we can get info from db
   * and include it into user object in request.
   *
   * @param payload Payload from access token.
   */
  async validate(payload: AccessTokenPayload): Promise<UserInReq> {
    return { userId: payload.sub, email: payload.email };
  }
}
