import {
  Controller,
  Request,
  Get,
  UseGuards,
  HttpStatus,
  Post,
  Param
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam
} from "@nestjs/swagger";
import { ApiRequest } from "../models/ApiRequest.model";
import { UserListService } from "./user-list.service";
import { BookWithAuthors } from "../book/dtos/BookWithAuthors.dto";
import {
  UserListType,
  UserListTypeDescription
} from "./entities/user-list-type.enum";

@UseGuards(AuthGuard("jwt"))
@ApiBearerAuth()
@ApiTags("user-lists")
@Controller("user-lists")
export class UserListController {
  constructor(private readonly userListService: UserListService) {}

  @ApiOperation({
    summary: "Add the book to the user list of books."
  })
  @ApiResponse({
    status: HttpStatus.CREATED
  })
  @ApiParam({
    name: "userListTypeId",
    enum: UserListType,
    description: UserListTypeDescription
  })
  @ApiParam({ name: "bookId" })
  @Post("add/:userListTypeId/:bookId")
  async addBookToUserList(
    @Request() req: ApiRequest,
    @Param("userListTypeId") listTypeId: number,
    @Param("bookId") bookId: number
  ) {
    return this.userListService.addBookToUserList(
      req.user.userId,
      listTypeId,
      bookId
    );
  }

  @ApiOperation({ summary: "Get user list with books." })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [BookWithAuthors]
  })
  @ApiParam({
    name: "userListTypeId",
    enum: UserListType,
    description: UserListTypeDescription
  })
  @Get(":userListTypeId")
  async getUserListWithBooks(
    @Request() req: ApiRequest,
    @Param("userListTypeId") listTypeId: number
  ) {
    return this.userListService.getUserListWithBooks(
      req.user.userId,
      listTypeId
    );
  }
}
