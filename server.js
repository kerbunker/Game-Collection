const path = require('path');
const { application } = require('express');
const express = require('express');
const router = require('express').Router();
const session = require('express-session');
const exphbs = require('express-handlebars');
const bcrypt = require('bcrypt');



const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.use(require('./controllers/'));

app.use(routes);

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(_dirname, 'public')));




sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});