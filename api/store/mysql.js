const mysql = require('mysql');

const dbconf = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
}
let connection;

function handleConnection() {
    connection = mysql.createConnection(dbconf);

    connection.connect((err)=>{
        console.error('[db_error]',err);
        if(err){
            setTimeout(handleConnection, 2000);
        }
    })

    connection.on('error', (err) => {
        console.log('[db_error]', err);
        if(err) {
            handleConnection();
        }
        else{
            throw err
        }
    })
}

handleConnection();

function list(table) {
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ORDER BY 'id';`, (err, data) => {
            if(err) return reject(err);
            resolve(data);
        })
    })
};

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id='${id}';`, (err, data) =>{
            if(err) return reject(err);
            resolve(data);
        });
    });
}

function upset(table, params) {
    if(params && params.id) {
        return update(table, params)
    }
    else{
        return insert(table, params);
    }

}

function insert(table, data) {
    return new Promise( (resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) =>{
            err && reject(err);
            resolve(result);
        })
    })
}

function update(table, data) {
    return new Promise( (resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`,[data, data.id], (err, result) => {
            err && reject(err);
            resolve(result);
        })
    })
}

function query (table, query, join) {
    let joinQuery = '';
    if(join) {
        const key = Object.keys(join)[0];
        const val = join[key];
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
    }
    return new Promise( (resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?;`, query, (err, result) => {
            console.log("query",{err, result})
            err && reject(err);
            resolve(result[0] || null);
        })
    })
}


module.exports = {
    list,
    get,
    upset,
    query
}