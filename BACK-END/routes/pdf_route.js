const properties=require('../server');
const documents=require('../controllers/pdf_controller');
//GET DE TODOS OS PRODUTOS , PRECISA DE: 
//company_id e document_id
//TIPO: Body
properties.app.get("/documentsPDF/:company_id/:document_id",documents.getPDF);
