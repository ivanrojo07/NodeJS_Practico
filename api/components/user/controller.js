const auth = require('../auth');
const TABLA = 'user';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if(!store){
        store = require('../../store/dummy');
    }
    
    function list(){
        return store.list(TABLA);
    }

    function get(userId) {
        return store.get(TABLA,userId);
    }

    async function set(user) {
        if(!user.id){
            user.id = Date.now();
        }
        if(user.password || user.username) {
            await auth.upset({
                id: user.id,
                username: user.username,
                password: user.password
            });
        }
        
        return store.upset(TABLA, user);
    }

    function remove(userId) {
        return store.remove(TABLA, userId);
    }

    return {
        list,
        get,
        set,
        remove, 
    }
}
