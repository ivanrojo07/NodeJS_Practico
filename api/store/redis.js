// Redis
const redis = require('redis')

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
});


function list(table) {
    return new Promise((resolve, reject) =>{
        client.get(table, (err, data) => {
            err && reject(err);
            let res = data || null;
            
            if(data) {
                res = JSON.stringify(data)
            }
            console.log(res);
            resolve(res);
        })
    })
}

function get(table, id){

}



async function upsert(table, data) {
    let key = table;
    if(data && data.id){
        key = key+'_'+data.id;
    }
    client.setex(key, 10, JSON.stringify(data));
    return true;
}

module.exports = {
    list,
    get,
    upsert
}