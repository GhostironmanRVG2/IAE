const {app}=require('../server');
const company=require('../controllers/company_controller');



//GET ALL DE TODAS AS EMPRESAS
app.get("/EmpresasGetAll",company.getAll);