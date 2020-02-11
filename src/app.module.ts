import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { AuthorsModule } from "./author/author.module";
import { BooksModule } from "./book/book.module";

@Module({
  imports: [AuthModule, UsersModule, AuthorsModule, BooksModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
