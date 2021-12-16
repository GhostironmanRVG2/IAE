const properties=require('../server');

//GET DOS USERS TODOS
function getAll(req, res){
      //IR BUSCAR OS USERS 
      properties.moloni.users('getMe',function(error,result){
      //CASO DE ERRO
      if(error){
      //ENVIAR ERRO PARA A MSG
      res.status(400).send({
          "msg": "Error"
      });
      //RETORNAR O ERRO PARA A CONSOLA
      console.error(error);
      }else{
      //CASO NAO DE ERRO , ENVIAR PARA A CONSOLA E PARA O REMETENTE A RESPOSTA
      res.setHeader('Content-Type', 'application/json');
      console.log(result);
      res.send(result);
      }
    });
  
    }

module.exports={
    getAll: getAll,
}