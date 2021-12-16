const properties=require('../server');
const users=require('../controllers/users_controller');
//GET DE TODOS OS USERS (NAO PRECISA DE PARAMETROS)
properties.app.get("/usersgetall",users.getAll);
