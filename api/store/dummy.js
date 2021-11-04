const db = {
    'user': [
        {
            id: 1,
            name: "Ivan"
        }
    ],
    'auth': []
};

async function list(tabla){
    return db[tabla] || [];
}

async function get(tabla, id) {
    let col = await list(tabla);
    return col.filter(item => item.id == id)[0] || null;
}

async function upset(tabla, data){
    db[tabla].push(data);
    console.log(db);
    return data;
}

async function remove(tabla, id){
    let col = await list(tabla);
    let ids = col.map(item => parseInt(item.id));
    let removeIndex = ids.indexOf(parseInt(id))
    if(removeIndex !== -1) {
        col.splice(removeIndex, 1);
        return true;
    }
    else{
        return false;
    }
}

async function query(tabla, q) {
    let col = await list(tabla);
    let keys = Object.keys(q);
    let key = keys[0];
    return col.filter(item => item[key] === q[key])[0] || null;
}

module.exports = {
    list,
    get,
    upset, 
    remove,
    query
}