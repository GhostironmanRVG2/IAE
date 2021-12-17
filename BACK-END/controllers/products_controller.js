const properties=require('../server');

//FUNCAO GET ALL PRODUCTS MOLONI
function getAll(req, res) {
    //IR BUSCAR OS PARAMETROS AO BODY
    const company_id = req.sanitize('company_id').escape();
    const category_id = req.sanitize('category_id').escape();  
    //EXPLICITAR OS PARAMETROS
    var params = {
        company_id: company_id,
        category_id: category_id,
      };
    //MOLONI GET ALL
    properties.moloni.products('getAll',params, function (error, result) {
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

//EXPORTAR FUNCOES
module.exports={
  getAll: getAll,
}