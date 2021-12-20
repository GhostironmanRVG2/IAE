const properties=require('../server');
//FUNÇÃO DE GET DE TODAS AS FATURAS DE UM C
function getOne(req, res){
    //IR BUSCAR OS PARAMETROS AO BODY
    const associated_id = req.sanitize('associated_id').escape();
    
    var params = {
        company_id: 205166,
        customer_id: 57185941,
    };
    //MOLONI GET ONE
    properties.moloni.documents('getOne', params, function (error, result){
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
            console.log(result.document_id);
            res.send(result);
        }
    });
}


//EXPORTAR FUNÇÕES
module.exports={
    getOne: getOne,
}