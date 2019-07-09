var express = require('express');
var router = express.Router();
var mysql = require('mysql');
const SqlProvider = require('./sql.provider');



var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: false})); 

  router.get("/", async function(req, res){
    const connection = await SqlProvider.getConnection();
    var sql = "Select * from Produktet";
    connection.query(sql, function (error, results, fields) {
      if (error) throw error;
      
      res.render("index",{ results: results});
    });

  });

router.get("/single:id", async function(req, res){
  const connection = await SqlProvider.getConnection();
  var sql = "Select * from SingleProduct where SingleId=?";
   connection.query(sql,[req.params.id], function (error, results1, fields1) {
    if (error) throw error;
    var sql1 = "Select * from Produktet where ProduktId=?";
   connection.query(sql1,[req.params.id], function (error, results2, fields2) {
      if (error) throw error;

    res.render("single",{ results1: results1, results2: results2 });
  });
   });
   res.json(results1);
});
   
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
   