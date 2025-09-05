# WhoKjeyLuy (WhoBorrowMoney)

A way to keep track of who borrow or give back your money. You can add the person, amount, type of transaction('borrow', 'receive'), date, and it will give you the summary.

**Currently WIP**

## Technologies used
- MySQL
- Express
- React
- NodeJS
## package
- CORS
- mysql2
- dotenv
- express

### TODO:
- [x] pagination
- [ ] delete
- [ ] edit
- [ ] language
- [ ] dark mode
- [ ] quick add user button in left display
- [ ] get user name and display in dropdown

## Screenshots

### display screen
![display-screen](/assets/screenshot1.png)
### Add person screen
![add-screen](/assets/screenshot2.png)

## How to use

```
# Clone the repo
git clone https://github.com/CarrotRP/whokjeyluy.git

# NOTE: use 2 terminal for this app

# Go to frontend and install dependencies
cd whokjeyluy/frontend; npm install

# Go to backend and install dependencies
cd whokjeyluy/backend; npm install

# Create your database in mysql and call it what you want, 'wkl' for default, then create .env file inside whokjeyluy/backend
# inside .env
# host = localhost_or_your_host_name
# user = root_or_your_user_name
# password = your_mysql_password
# database = wkl_or_your_own_database_name

# In the backend terminal run
node app
# Or if you have nodemon
nodemon

# In the frontend terminal run
npm run dev

```