const path = require('path');
const { application } = require('express');
const express = require('express');
const router = require('express').Router();
const routes = require('./routes/api');
const session = require('express-session');
const bcrypt = require('bcrypt');


const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUnitialized: true,
    store: new SequelizeStore({
        db: Sequelize
    })
};

app.use(session(sess));

app.use(require('./controllers/'));

app.use(routes);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));




sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});