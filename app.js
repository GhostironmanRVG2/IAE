var url=require('url');
module.exports={





    handleRequest: function(request,response){
        response.writeHead(200,{'Content-Type': 'text/html'});
        var path=url.parse(request.url).pathname;
        switch(path){
            case '/':
            response.write("ALO");
            response.end();
            break;
            default:
            response.writeHead(404,"FUDEU");
            response.write("Route not defined");
            response.end();


        }
    }
 
    
}