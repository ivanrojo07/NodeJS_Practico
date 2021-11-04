const auth = require('../../auth');
const TABLA = "auth"

module.exports = function(injectedStore) {
    let store = injectedStore;
    if(!store) {
        store = require('../../store/dummy');
    }
    async function login(username, password) {
        const data = await store.query(TABLA, { username:username });
        if(data.password === password) {
            // generar token
            console.log(data);
            return auth.sign(data);
        }
        else{
            throw new Error('Credenciales incorrectas')
        }
    }

    function upset(data) {
        const authData = {
            id: data.id,
        }

        if(data.username) {
            authData.username = data.username;
        }
        if(data.password) {
            authData.password = data.password;
        }

        return store.upset(TABLA, authData)
    }

    return {
        upset,
        login
    }
}