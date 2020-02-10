import { Sequelize } from "sequelize-typescript";
import { User } from "../users/user.entity";
import { Author } from "../author/author.entity";
import envConfig from "../environment.config";

export const databaseProviders = [
  {
    provide: "SEQUELIZE",
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: envConfig.db_dialect,
        host: envConfig.db_host,
        port: envConfig.db_port,
        username: envConfig.db_username,
        password: envConfig.db_password,
        database: envConfig.db_name,
        query: {
          // Setting raw to true, Sequelize will not return DAO objects, but will return raw model objects.
          raw: true
        }
      });
      sequelize.addModels([Author]);
      sequelize.addModels([User]);
      await sequelize.sync();
      // To recreate database tables, uncomment this.
      // await sequelize.sync({ force: true }); // Force set to true, will drop all tables and create new ones.
      return sequelize;
    }
  }
];
