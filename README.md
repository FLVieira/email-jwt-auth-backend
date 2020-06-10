<h1 align="center">
Email-JWT-Auth
</h1>

<br />

This repository contains the backend of a simple template (frontend is [here](https://github.com/FLVieira/email-jwt-auth-front))
made with React and Node for verifying users via email and authenticating them with JWT. Whenever a user signs
up, an email is sent automatically to the user's inbox, the email contains a link in order for the user to click and be 
verified (for sending the email I use mailtrap.io, so this will only works on a development environment, for production 
environment use AMAZON SES or related). If the user's email has not been verified, the user in a attempt to log in will get a warning and will 
not be able the enter his account. Another funcionality that I implemented is the famous "recover your password", here the 
user will provide his information and an email will be sent to his inbox with instructions to change his current password.

## 📥  Installation 

1. git clone https://github.com/FLVieira/email-jwt-auth-backend.git
2. cd email-jwt-auth-backend

### Prerequisites:

Tools -

- Yarn/Npm
- Docker

Services -

- Postgres

## Setting up environment variables 

1. Rename the file '.env_example' to '.env' and insert the config data as explained below.

2. Create an instance of a postgres db and then create a db with any name, after that add the related data to the .env related fields.

> \$ sudo docker run --name emailjwtauth-postgres -e POSTGRES_PASSWORD=1234 -p 5432:5432 -d postgres:11

```
# Database
DB=
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=1234
```

3. To simulate sending emails we will use [mailtrap.io](https://mailtrap.io). Create an account and put the given data by them in the .env fields below

```
MAIL_HOST=
MAIL_PORT=
MAIL_USER=
MAIL_PASS=
```

### Starting the application

   > $ yarn

   > $ yarn sequelize db:migrate

   > $ yarn dev

## Routes

If everything worked fine by now, to be able to test the routes of this api, you just have to import the insomnia.json file in the root
directory of the project to your insomnia.

