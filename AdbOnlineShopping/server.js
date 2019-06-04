var mysql = require('mysql');
var express =require('express');
var exphbs = require('express-handlebars');
var app = express();

var router = require('./public/produkti.js');
app.use(router);

var allowedExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

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

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//set port
var port= process.env.PORT || 5000

app.use(express.static('public'));


app.post("/insert_data", function(req, res){
  var emri = req.body.emri1
  var cmimi = req.body.cmimi1
  var pesha = req.body.pesha1
  var pershkrimi = req.body.pershkrimi1
  var ikona = req.body.ikona1
  var kategoria = req.body.kategoria1
  var nenkategoria = req.body.nenkategoria1
  var madhesia = req.body.madhesia1
  var ngjyra = req.body.ngjyra1
  var oferta = req.body.oferta1

  var sql = "INSERT INTO produktet (Emri, Cmimi, Pesha, Pershkrimi, Fotografia, Kategoria, Nenkategoria, Madhesia, Ngjyra, Oferta) VALUES (?,?,?,?,?,?,?,?,?,?)";
 getConnection().query(sql,[emri,cmimi,pesha,pershkrimi,ikona,kategoria,nenkategoria,madhesia,ngjyra,oferta], (err, results, fields) => {
  if (err) {
    console.log("Insertimi deshtoi. " + err)
    res.sendStatus(500)
    return
  }
    console.log("Insertimi u krye me sukses")
    res.end()
 })
  ;})
  app.get("/produktet/:id", function(req, res){
    console.log("Eshte marr produkti me id" + req.params.id)
      var sql = "Select * from Produktet where ProduktId=?";
     getConnection().query(sql,[req.params.id], (err, rows, fields) => {
        console.log("Produktet jane marr nga databaza")
        res.json(rows)
     })
      ;})

      app.get("/produktet1", function(req, res){
    
        var sql = "Select * from Produktet where oferta=1";
       getConnection().query(sql, (err, rows, fields) => {
          console.log("Produktet jane marr nga databaza")
           res.json(rows);
           })
        ;})
        app.get("/produktet", function(req, res){
    
          var sql = "SELECT * FROM adb.productview;";
         getConnection().query(sql, (err, rows, fields) => {
            console.log("Produktet jane marr nga databaza")
             res.json(rows);
             })
          ;})


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get("/", function(req, res){
    res.render('index');
})

app.get("/index.html", function(req, res){
  res.render("index");
})

app.get("/oram.html", function(req, res){
  res.render("oram");
})
  
~app.get("/oraf.html", function(req, res){
  res.render("oraf");
})

app.get("/kontakt.html", function(req, res){
  res.render("kontakt");
})

app.get("/single.html", function(req, res){
  res.render("single");
})


app.listen(port, function(){
    console.log("app running");
})

