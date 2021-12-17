const {moloni}=require('../server');
const {credit}=require('../authtoken/molonitoken');
//FUNCAO PARA INSERIR
function insert(req,res){

//MOLONI







}


function getauth(req,res){

credit();
res.send("checka a consola");




}

module.exports={
    insert: insert,
    getauth: getauth,
}