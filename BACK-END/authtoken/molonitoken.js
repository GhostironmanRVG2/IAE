const http = require('http');
const options = {
    hostname: 'https://api.moloni.pt',
    path: '/v1/grant/?grant_type=password&client_id=winxgroup&client_secret=a8156283c4aa7866e1a2f8bf4737d0ca16e59af9&username=a92877@alunos.uminho.pt&password=winx2021',
    method: 'GET'
  }


  //FUNCAO
  callback = function(response) {
    var str = '';
  
    //another chunk of data has been received, so append it to `str`
    response.on('data', function (chunk) {
      str += chunk;
    });
  
    //the whole response has been received, so we just print it out here
    response.on('end', function () {
      console.log(str);
    });
  }

//FAZER UMA FUNCAO QUE EXECUTE O REQUEST E EXPORTAR
function credit(){
    http.request(options, callback).end();
}


module.exports={
  credit:credit,
}