const express = require('express');
const router = require('./router');
const app = express();

app.use(express.json());//parsing application/json
app.use(express.urlencoded({
    extended : true
})); // for parsing application/x-www-form-urlencoded
const port = process.env.MYSQL_SERVICE_PORT || 8080;
app.use('/',router)
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});