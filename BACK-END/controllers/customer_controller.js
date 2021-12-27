const properties=require('../server');
//FUNÇÃO DE GET DE TODAS AS FATURAS DE UM C
function getOne(req, res){
    //IR BUSCAR OS PARAMETROS AO BODY


    const company_id = req.sanitize('company_id').escape();
    const associated_id = req.sanitize('associated_id').escape();
    
    var params = {
        company_id: 205166,
        customer_id: 57185941,
        reverse_associated_documents: [
            {
                associated_id : associated_id
            }
        ],
    };
    console.log(associated_id);
    console.log(company_id);
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
            console.log(result.reverse_associated_documents.document_id);
            console.log(result.company_id);
            console.log(result.customer_id);
            res.send(result);
        }
    });
}

function getAll(req, res){
    //IR BUSCAR OS PARAMETROS AO BODY
    var params = {
        company_id: 205166,
    };
    //MOLONI GET ONE
    properties.moloni.customers('getAll', params, function (error, result){
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
            res.send(result);
        }
    });
}

//EXPORTAR FUNÇÕES
module.exports={
    getOne: getOne,
    getAll: getAll,
}