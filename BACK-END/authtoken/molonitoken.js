const http = require('http');
var options =new URL('http://api.moloni.pt/v1/grant/?grant_type=password&client_id=winxgroup&client_secret=a8156283c4aa7866e1a2f8bf4737d0ca16e59af9&username=a92877@alunos.uminho.pt&password=winx2021');
//FUNCAO PARA RETORNAR AS ACESS KEYS DO MOLONI
function credit(callback){
  //FAZER O REQUEST E USAR O URL EM CIMA E DE SEGUIDA FAZER UMA FUNCAO PARA IR BUSCAR OS DADOS
   http.request(options, function(response) {
    var str = '';
    //RECEBER OS DADOS E ENVIAR PARA A CALLBACK
    response.on('data', function (chunk) {
      //ADICIONAR O CHUNK NA STRING
      str += chunk;
      //CONVERTER A STRING NUM JSON E ENVIAR NA CALLBACK
      return callback(JSON.parse(str));
    });
//FECHAR O PROGRAMA
  }).end();
}



module.exports={
  credit:credit,
  http: http
}