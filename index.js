const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'))

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.cookieKey]
    })
)

app.use(passport.initialize());
app.use(passport.session());

require('./models/User');
require('./models/Survey');
require('./services/passport');

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

// DEFAULT 
if (process.env.NODE_ENV === 'production') {
    const path = require('path');
    app.get('/*', (req, res) => {
        res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html'))
    })
}


const Port = process.env.PORT || 5000;
app.listen(Port);