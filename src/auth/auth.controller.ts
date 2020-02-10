import {
  Controller,
  Post,
  Body,
  Request,
  Res,
  HttpStatus,
  UseGuards
} from "@nestjs/common";
import { Response } from "express";
import { AuthGuard } from "@nestjs/passport";
import { ApiBody, ApiTags, ApiResponse, ApiOperation } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { UsersService } from "../users/users.service";
import { UserLogin } from "../users/dtos/UserLogin.dto";
import { UserRegister } from "../users/dtos/UserRegister.dto";
import errResMsgs from "../services/error-response-messages";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService
  ) {}

  @ApiOperation({ summary: "Returns JWT access token." })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description:
      "The user authentication successful and JWT access token is returned."
  })
  @ApiResponse({
    status: errResMsgs.ERROR_WRONG_LOGIN_CREDENTIALS.statusCode,
    description: errResMsgs.ERROR_WRONG_LOGIN_CREDENTIALS.message
  })
  @UseGuards(AuthGuard("local"))
  @Post("login")
  @ApiBody({ type: UserLogin })
  async login(@Request() req) {
    // User (and its password) is validated through local strategy validate method,
    // and the object that is returned from validate method is in req.user.
    // This object (req.user) is the real user object, because it is validated by local strategy.
    // If user valiedation is successful, then this method will be executed,
    // and we can then get jwt token through auth service login method.
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: "Creates a new user." })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: "The user has been successfully created."
  })
  @ApiResponse({
    status: errResMsgs.ERROR_USER_ALREADY_EXISTS.statusCode,
    description: errResMsgs.ERROR_USER_ALREADY_EXISTS.message
  })
  @ApiResponse({
    status: errResMsgs.ERROR_REQUIRED_DATA_MISSING.statusCode,
    description: errResMsgs.ERROR_REQUIRED_DATA_MISSING.message
  })
  @Post("register")
  @ApiBody({ type: UserRegister })
  async register(@Res() res: Response, @Body() userReg: UserRegister) {
    // Email and Password are required.
    if (
      !userReg.email ||
      !userReg.password ||
      userReg.email.length === 0 ||
      userReg.password.length === 0
    ) {
      return res
        .status(errResMsgs.ERROR_REQUIRED_DATA_MISSING.statusCode)
        .json(errResMsgs.ERROR_REQUIRED_DATA_MISSING);
    }
    // Check if user with this email already exists.
    const existingUser = await this.usersService.findOne(userReg.email);
    if (existingUser !== null) {
      return res
        .status(errResMsgs.ERROR_USER_ALREADY_EXISTS.statusCode)
        .json(errResMsgs.ERROR_USER_ALREADY_EXISTS);
    }
    // User with this email does not yet exists, so we can create it.
    const newUser = await this.usersService.createUser(
      userReg.firstName,
      userReg.lastName,
      userReg.email,
      userReg.password
    );
    return res.status(HttpStatus.CREATED).json(newUser);
  }
}
