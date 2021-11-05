const bcrypt = require('bcrypt');
const auth = require('../../auth');
const TABLA = "auth"

module.exports = function(injectedStore) {
    let store = injectedStore;
    if(!store) {
        store = require('../../store/mysql');
    }
    async function login(username, password) {
        const data = await store.query(TABLA, { username:username });
        return bcrypt.compare(password, data.password)
            .then(sonIguales => {
                
                if(sonIguales === true) {
                    // generar token
                    token = auth.sign(data);
                    return token;
                }
                else{
                    throw new Error('Credenciales incorrectas')
                }
            })
            .catch((error)=>{
                throw new Error(error);
            });
    }

    async function upset(data) {
        const authData = {}

        if(data.username) {
            authData.username = data.username;
        }
        if(data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return store.upset(TABLA, authData)
    }

    return {
        upset,
        login
    }
}