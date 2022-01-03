const {moloni}=require('../server');



//FUNCAO GET ALL
function getAll(req,res){

    moloni.companies('getAll',function (error, result) {
        //caso de erro ,manda msg de erro
          if (error){
            //ENVIAR STATUS DE ERRO
            res.status(400).send({
              "msg": "Error, something went wrong"
          });
          //PRINTAR NA CONSOLA ERRO
            return console.error(error);
          }else{
          //CASO DE CERTO , PRINTAR ERRO E MANDAR O ERRO
          console.log(result);
          res.send(result);
          }
        });



}





module.exports={

getAll: getAll

}