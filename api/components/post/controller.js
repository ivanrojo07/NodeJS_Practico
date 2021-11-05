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

    function get(postId) {
        return store.get(TABLA,postId);
    }
    
    function getUserPost(userId){
        const join = {};
        join['users'] = 'user_id'; // { users: 'user_id' }
        const query = { user_id: userId}
        return store.query(TABLA, query, join);
    }

    async function set(post) {
        const data = {}
        if(post.id){
            data.id = post.id
        }
        if(post.post){
            data.post = post.post
        }
        if(post.text){
            data.text = post.text
        }
        if(post.user_id) {
            data.user_id = post.user_id
        }
        return store.upset(TABLA, data);
    }

    function remove(postId) {
        return store.remove(TABLA, postId);
    }

    return {
        list,
        get,
        set,
        remove,
        getUserPost
    }
}
