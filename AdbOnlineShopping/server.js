var mysql = require('mysql');
var express =require('express');
var exphbs = require('express-handlebars');
var app = express();
const SqlProvider = require('./sql.provider');


var router = require('./produkti.js');
app.use(router);

var allowedExtension = ['jpeg', 'jpg', 'png', 'gif', 'bmp'];
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//set port
var port= process.env.PORT || 5000

app.use(express.static('public'));


app.post("/insert_data", async function(req, res){
  const connection = await SqlProvider.getConnection();

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
  await connection.query(sql,[emri,cmimi,pesha,pershkrimi,ikona,kategoria,nenkategoria,madhesia,ngjyra,oferta], (err, results, fields) => {
  if (err) {
    console.log("Insertimi deshtoi. " + err)
    res.sendStatus(500)
    return
  }
    console.log("Insertimi u krye me sukses")
    res.end()
 })})
  
 

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get("/",function(req,res){
  res.render("index", {data: req.bodyParser});
})

app.get("/index", function(req, res){
  res.render("index");
})

app.get("/oram", function(req, res){
  res.render("oram");
})
  
~app.get("/oraf", function(req, res){
  res.render("oraf");
})

app.get("/kontakt", function(req, res){
  res.render("kontakt");
})

app.get("/single", function(req, res){
  res.render("single");
})

app.get("/single:id", function(req, res){
  res.render("single", {data: req.bodyParser});
})


app.listen(port, function(){
    console.log("app running");
})