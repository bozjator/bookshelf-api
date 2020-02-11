# Bookshelf API

Build using NestJS with Sequelize (using TypeScript wrapper) and Swagger.

# Setup

### environment.config.ts

Here you set connection to database and some other app settings.  
Take a look into environment.config.ts to see which environment variables needs to be set when building for production.  
Or to set valiables for your development environment.
### Database
Create new dastabase sheme with name that is specified inside environment.config.ts ('bookshelf' if you didn't changed it)
Tables will be created automaticaly after you run app.

## To run
 - Install NodeJS and npm (https://nodejs.org)
 - Install NestJS CLI (https://docs.nestjs.com/cli/overview)
 - Run 'npm i' in the project folder
 - Run 'nest start --watch' or check other commands inside package.json
 - Check http://localhost:3000/api to see available API end points
