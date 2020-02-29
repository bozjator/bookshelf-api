import { Dialect } from "sequelize/types";

class ConfigParam {
  evironment: string;
  app_jwt_secret_key: string;
  app_port: number;
  db_username: string;
  db_password: string;
  db_name: string;
  db_host: string;
  db_dialect: Dialect;
  db_port: number;
}

const allEnvConfigs: ConfigParam[] = [
  {
    evironment: "development",
    app_jwt_secret_key: "APP_SECRET_DONT_TELL_ANYONE",
    app_port: 3000,
    db_username: "root",
    db_password: "root",
    db_name: "bookshelf",
    db_host: "127.0.0.1",
    db_dialect: "mysql",
    db_port: 3306
  },
  {
    evironment: "production",
    app_jwt_secret_key: process.env.APP_JWT_SECRET_KEY,
    app_port: parseInt(process.env.PORT, 10) || 3000,
    db_username: process.env.DB_USERNAME,
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME,
    db_host: process.env.DB_HOSTNAME,
    db_dialect: "mysql",
    db_port: parseInt(process.env.DB_PORT, 10) || 3306
  }
];

class ConfigService {
  public envConfig: ConfigParam = null;

  constructor() {
    const environment = process.env.NODE_ENV || "development";
    this.prepareConfig(environment);
  }

  private prepareConfig(environment: string) {
    const config = allEnvConfigs.find(
      config => config.evironment === environment
    );
    if (config) {
      this.envConfig = config;
    } else {
      this.envConfig = allEnvConfigs.find(
        config => config.evironment === "development"
      );
    }
  }
}

const envConfig: ConfigParam = new ConfigService().envConfig;
export default envConfig;
