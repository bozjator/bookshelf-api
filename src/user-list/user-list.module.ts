import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { EntitiesProviders_UserList } from "../database/entities.providers";
import { UserListService } from "./user-list.service";
import { UserListController } from "./user-list.controller";

@Module({
  imports: [DatabaseModule],
  exports: [UserListService],
  controllers: [UserListController],
  providers: [UserListService, ...EntitiesProviders_UserList]
})
export class UserListsModule {}
