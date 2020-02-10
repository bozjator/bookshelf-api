import { Controller, Request, Get, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiTags, ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { ApiRequest } from "../models/ApiRequest.model";

@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Returns currently logged in user data." })
  @Get("me")
  getCurrentUserData(@Request() req: ApiRequest) {
    return req.user;
  }
}
