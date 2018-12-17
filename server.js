// var express = require('express');
// var http = require('http');
// var path = require('path');

// var app = express();
// var port = 5000;

// app.use(express.static(__dirname + '/dist/hello-world'));

// app.get('/*',function(req,res){
//     res.sendFile(path.join(__dirname));
// })

// var server = http.createServer(app);
// server.listen(port,function(){
//     console.log('Running on port: ' + port);
// })

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 5000;

var server = http.createServer(app);
var io = require('socket.io')(server);

//-------------------------------

app.use(express.static(__dirname + '/dist/hello-world'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//-------------------------------

mongoose.connect('');

var db = mongoose.connection;
db.on('error',console.error.bind(console,'Błąd połączenia z bazą danych.'));
db.once('open',function(){
    console.log('Udało się połączyć z bazą danych.')
})

var Schema = mongoose.Schema;
var products = new Schema({
    id : String,
    name : String,
    count : Number,
    price : Number,
    description : String,
    img : String
});
mongoose.model('product',products);

//-------------------------------

app.get('/api/products',function(req,res){

    var Product = mongoose.model('product');
    // var product = new Product();
    Product.find({}, function(err,products){
        if(err) console.log("ERROR: " + err)
        // var list = {};
        // products.forEach(function(product){
        //     list[product.id] = product;
        // });
        // res.send(list);
        var list = [];
        products.forEach(function(product){
            list.push(product);
        })
        // res.render('products-list',products);
        res.send(list);
        console.log('Returned all products');
    });

});

app.get('/api/products/:id',function(req,res){
    var Product = mongoose.model('product');
    Product.findOne({id: req.params.id},function(err,product){
        if(err) console.log("ERROR: " + err)
        res.send(product);
    })
});

app.post('/api/products',function(req,res){
    mongoose.model('product',products);

    var Product = mongoose.model('product');
    // var product = new Product();
    var product = {
        id: req.body.id,
        name: req.body.name,
        count: req.body.count,
        price: req.body.price,
        description: req.body.description,
        img: req.body.img,
    }

    Product.findOneAndUpdate(
        {id: req.body.id},
        product,
        {upsert: true},
    function(err,product){
    if(err) console.log("Błąd zapisu");
    console.log('Zapisano: ' + product)
    return res.send(product);
})

    // product.save(function(err){
    //     if(err) throw err;
    //     console.log('Zapisano');
    // });

});

app.delete('/api/products/:id',function(req,res){
    mongoose.model('product',products);

    var Product = mongoose.model('product');
    Product.findOne({id: req.params.id},function(err,product){
        if(err) console.log("Błąd usuwania: " + err);
        product.remove();
        res.send(product);
    });

});

//---------------------------------------------

var promotions = new Schema({
    id : String,
    products: [String],
    discount: Number,
    time: Number
});
mongoose.model('promotion',promotions);

app.get('/api/promotions',function(req,res){
    var Promotion = mongoose.model('promotion');
    // var product = new Product();
    Promotion.find({}, function(err,promotions){
        if(err) console.log("ERROR: " + err)
        // var list = {};
        // products.forEach(function(product){
        //     list[product.id] = product;
        // });
        // res.send(list);
        var list = [];
        promotions.forEach(function(promotion){
            list.push(promotion);
        })
        // res.render('products-list',products);
        res.send(list);
        console.log('Returned all promotions');
    });
});

app.post('/api/promotions',function(req,res){
    mongoose.model('promotion',promotions);

    var Promotion = mongoose.model('promotion');
    // var product = new Product();
    var promotion = {
        id: req.body.id,
        products: req.body.products,
        discount: req.body.discount,
        time: req.body.time
    }

    Promotion.findOneAndUpdate(
        {id: req.body.id},
        promotion,
        {upsert: true},
    function(err,promotion){
    if(err) console.log("Błąd zapisu");
    console.log('Zapisano: ' + promotion)
    return res.send(promotion);
})

    // product.save(function(err){
    //     if(err) throw err;
    //     console.log('Zapisano');
    // });

});

app.delete('/api/promotions/:id',function(req,res){
    mongoose.model('promotion',promotions);

    var Promotion = mongoose.model('promotion');
    Promotion.findOne({id: req.params.id},function(err,promotion){
        if(err) console.log("Błąd usuwania: " + err);
        if(promotion != null){ promotion.remove(); }
        res.send(promotion);
    });

});

//---------------------------------------------

app.post('/api/sockets',function(req,res){
    io.emit('message',req.body);
});

//---------------------------------------------

app.get('/*',function(req,res){
    // console.log(path.join(__dirname));
    res.sendFile(path.join(__dirname + '/dist/hello-world/index.html'));
})

io.on('connection', (socket) => {

    console.log('user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('message', (message) => {
        console.log("Message Received: " + message);
        io.emit('message', message);    
    });
});

// var server = http.createServer(app);
server.listen(port,function(){
    console.log('Running on port: ' + port);
})