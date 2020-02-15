import { Controller, Request, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { ApiRequest } from "../models/ApiRequest.model";
import { User } from "./user.entity";

@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Returns currently logged in user data." })
  @Get("me")
  getCurrentUserDataFromRequest(@Request() req: ApiRequest) {
    return req.user;
  }

  @ApiOperation({
    summary: "Returns currently logged in user data with more info."
  })
  @Get("me-more-info")
  async getCurrentUserDataFromDB(@Request() req: ApiRequest) {
    const user: User = <User>(await this.usersService.findOneById(
      req.user.userId
    )).get({
      plain: true
    });
    delete user.password;
    delete user.updatedAt;
    delete user.createdAt;
    return user;
  }
}
