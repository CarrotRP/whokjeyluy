# WhoKjeyLuy (WhoBorrowMoney)

A way to keep track of who borrow or give back your money. You can add the person, amount, type of transaction('borrow', 'receive'), date, and it will give you the summary.

**Currently WIP**

## Technologies used
- Mongodb
- Express
- React
- NodeJS
## package
- bcrypt
- cookie-parser
- cors
- dotenv
- express
- jsonwebtoken
- mongoose

### TODO:
- [x] get user name and display in dropdown
- [x] pagination
- [x] search
- [x] edit
- [x] delete
- [ ] proper logout button
- [ ] import/export data
- [ ] multi lang support
- [ ] dark mode - prob not?
- [ ] responsive

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

# Create your database in mongodb and call it what you want, then create .env file inside whokjeyluy/backend
# inside .env
# check .env.example for references
# also create .env in whokjeyluy/frontend

# In the backend terminal run
node app
# Or if you have nodemon
nodemon app

# In the frontend terminal run
npm run dev

```