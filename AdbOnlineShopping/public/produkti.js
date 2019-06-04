var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const SqlProvider = require('./sql.provider');
const ProductService = require('./product.service');
const HTTPStatus = require('http-status');

var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false}));

function getConnection()
{ return mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'drilon',
  database : 'adb'
})}
getConnection().connect(function(error){
    if(!!error){
      console.log('Error');
    } else{
      console.log('Connected');
    }
  });
  router.get("/produktet/:id", function(req, res){
    console.log("Eshte marr produkti me id" + req.params.id)
      var sql = "Select * from Produktet where ProduktId=?";
     getConnection().query(sql,[req.params.id], (err, rows, fields) => {
        console.log("Produktet jane marr nga databaza")
        res.json(rows)
     })
      ;})

  router.get("/produktet1", function(req, res){
    
    var sql = "Select * from Produktet where oferta=1";
   getConnection().query(sql, (err, rows, fields) => {
      console.log("Produktet jane marr nga databaza")
       res.json(rows);
       })
    ;})

    router.get("/produktet", function(req, res){
      var sql = "SELECT * FROM adb.productview;";
     getConnection().query(sql, (err, rows, fields) => {
        console.log("Produktet jane marr nga databaza")
         res.json(rows);
         })
      ;})

   

    

        router.get("/admini.html", function(req, res){
          res.render('admini',{layout: 'admini1.handlebars'});
        })
        
        router.delete('/produkt/:id', async function (req, res) {
          if (isNaN(req.params.id)) {
              return res.send(HTTPStatus.BAD_REQUEST).end();
          }
           const connection = await SqlProvider.getConnection();

          const result = await connection.query('Delete from produktet where id=?',req.params.id);
          const deletedObject = result[0];
      
          if (deletedObject.affectedRows === 0) {
              return res.send(HTTPStatus.NOT_FOUND).end();
          }
      
          return res.send(result);
      });

      router.put('/:id', async function (req, res) {
        if (isNaN(req.params.id)) {
            return res.send(HTTPStatus.BAD_REQUEST).end();
        }
    
        const produkt = {}
    
        if (req.body.name) {
            produkt.emri = req.body.emri1;
        }
        if (req.body.price) {
            produkt.cmimi = req.body.cmimi1;
        }
        if (req.body.weight) {
            produkt.pesha = req.body.pesha1;
        }
    
        const connection = await SqlProvider.getConnection();
    
        const result = await connection.query('Update produktet SET ? where id=?', [produkt, req.params.id]);
        const udpatedObject = result[0];
    
        if (udpatedObject.affectedRows === 0) {
            return res.send(HTTPStatus.NOT_FOUND).end();
        }
    
        return res.send(HTTPStatus.OK).end();
    });

module.exports = router;