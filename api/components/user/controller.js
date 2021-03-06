const auth = require('../auth');
const TABLA = 'users';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if(!store){
        store = require('../../store/mysql');
    }
    
    function list(){
        return store.list(TABLA);
    }

    function follow (user_id_from, user_id_to) {
        return store.upset('user_follows',{
            user_from: user_id_from,
            user_to: user_id_to
        });
    }

    async function following (user_id) {
        const join = {};
        join[TABLA] = 'user_to'; // { users: 'user_to' }
        const query = { user_from: user_id}
        return await store.query("user_follows", query, join);
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
        remove,
        follow,
        following
    }
}
