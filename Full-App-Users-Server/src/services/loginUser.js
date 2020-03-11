const loginService = async (useMongo) => {
    try {
        // const resu = await getUsersFromDb();
        // Перевірка на валідність
        if(username === useMongo.username && password === useMongo.password) { 
            // Якщо все добре - то добре
            jwt.sign({useMongo}, 'privatekey', { expiresIn: '1h' }, (error, token) => {
                if(error) { console.log(err) }    
                response.send(token);
            });
        }
    } catch (error) {
        response.status(500).send(error);
        console.error(error);
    }
}

module.exports = {
    login: loginService
}