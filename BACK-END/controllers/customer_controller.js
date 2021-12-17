const properties=require('../server');
//FUNÇÃO DE GET DE TODAS AS FATURAS DE UM C
function getOne(req, res){
    //IR BUSCAR OS PARAMETROS AO BODY

    const company_id = req.sanitize('company_id').escape();
    const customer_id = req.sanitize('customer_id').escape();
    const associated_id = req.sanitize('associated_id').escape();
    var params = {
        company_id: company_id,
        customer_id: 57285941,
        associated_id: associated_id,
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