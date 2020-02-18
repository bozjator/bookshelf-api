import { Injectable, Inject } from "@nestjs/common";
import { DatabaseConstants } from "../database/database-constants";
import { UserList } from "./entities/user-list.entity";
import { Author } from "../author/author.entity";
import { Book } from "../book/book.entity";

@Injectable()
export class UserListService {
  constructor(
    @Inject(DatabaseConstants.USERLIST_REPOSITORY)
    private readonly userListRepository: typeof UserList
  ) {}

  addBookToUserList(userId: number, userListTypeId: number, bookId: number) {
    const userIdBookIdObject = {
      userId,
      bookId,
      userListTypeId
    };
    return this.userListRepository.create(userIdBookIdObject);
  }

  getUserListWithBooks(userId: number, userListTypeId: number) {
    const where = {
      userId,
      userListTypeId
    };
    return this.userListRepository.findAll({
      where,
      include: [{ model: Book, include: [Author] }]
    });
  }

  removeBookFromUserList(
    userId: number,
    userListTypeId: number,
    bookId: number
  ) {
    const where = {
      userId,
      bookId,
      userListTypeId
    };
    return this.userListRepository.destroy({ where });
  }
}
