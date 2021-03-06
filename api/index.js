require('dotenv').config()

const express = require('express');
const routes = require('./network/network');
const errors = require('./network/errors');

const app = express();

app.use(express.json());//parsing application/json
app.use(express.urlencoded({
    extended : true
})); // for parsing application/x-www-form-urlencoded
routes(app);
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('./swagger.json')
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))

const port = process.env.PORT || 8080;

app.use(errors)
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});