const auth = require('../auth');
const TABLA = 'posts';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if(!store){
        store = require('../../store/mysql');
    }
    
    function list(){
        return store.list(TABLA);
    }

    function get(userId) {
        return store.get(TABLA,userId);
    }

    async function set(user) {
        if(user.password || user.username) {
            await auth.upset({
                username: user.username,
                password: user.password
            });
        }
        const data = {}
        if(user.id){
            data.id = user.id
        }
        if(user.name){
            data.name = user.name
        }
        if(user.username){
            data.username = user.username
        }
        
        return store.upset(TABLA, data);
    }

    function remove(userId) {
        return store.remove(TABLA, userId);
    }

    return {
        list,
        get,
        set,
        remove
    }
}
