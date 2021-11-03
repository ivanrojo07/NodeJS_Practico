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

    function set(user) {
        user.id = Date.now();
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
