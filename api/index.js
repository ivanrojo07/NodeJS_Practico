require('dotenv').config()

const express = require('express');
const routes = require('./network/network');

const app = express();

app.use(express.json());//parsing application/json
app.use(express.urlencoded({
    extended : true
})); // for parsing application/x-www-form-urlencoded
routes(app);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});