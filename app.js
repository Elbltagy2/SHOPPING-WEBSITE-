

var express = require('express');

var path = require('path');
var app = express();
var fs= require('fs');
const { MongoClient } = require('mongodb');
const { disable } = require('express/lib/application');

var uri = 'mongodb+srv://admin:admin@cluster0.mxtmt.mongodb.net/cluster0?retryWrites=true&w=majority';
var mongoClient = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
var alert = require('alert');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));






/// add Items
async function addItems(){
    try{
        await mongoClient.connect();
        let Items = mongoClient.db('Project_dp').collection('Items');
        try{
           await Items.insertMany([{name:'Boxing Bag',url:'/boxing'},{name:'Tennis Racket',url:'/tennis'},{name:'Leaves of Grass',url:'/leaves'},{name:'The Sun and Her Flowers',url:'/sun'},{name:'Galaxy S21 Ultra',url:'/galaxy'},{name:'iPhone 13 Pro',url:'/iphone'}]);
           await Items.createIndex({name:'text'});
        }catch(e){
           console.log('error in the insert the Items');
        }
        finally{
            await mongoClient.close();
        }
    }
    catch(e){
        console.log("error is happened");
    }
}
//// first call the function addItem and we let it be called only once then we comment it;
//addItems();

async function FindItem(Item){
    try{
    await mongoClient.connect();
    let Items = mongoClient.db('Project_dp').collection('Items');
        try{
            let ret=await Items.find( { $text: { $search: Item } } ).toArray();
            return ret;
        }
        catch(e){
            console.log('error in find Item');
            return null;
        }
        finally{
            await mongoClient.close();
        }
   }
   catch(e){
       console.log("error in the Connection of FindItem");
       return null;
   }
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',function(req, res){
res.render('login', {title: "express"})
});


//whenever you get a request for the page 'books' excute function
app.get('/books',function(req, res){
    res.render('books');
    });

app.get('/boxing',function(req, res){
    res.render('boxing');
    });


app.get('/cart',function(req, res){
    res.render('cart');
    });


app.get('/galaxy',function(req, res){
    res.render('galaxy');
    });

app.get('/home',function(req, res){
    res.render('home');
    });


app.get('/iphone',function(req, res){
    res.render('iphone');
    });

app.get('/leaves',function(req, res){
    res.render('leaves');
    });  


app.get('/login',function(req, res){
    res.render('login');
    });

app.get('/phones',function(req, res){
    res.render('phones');
    });


app.get('/registration',function(req, res){
    res.render('registration');
    });


app.get('/searchresults',function(req, res){
    res.render('searchresults');
    });


app.get('/sports',function(req, res){
    res.render('sports');
    });

app.get('/sun',function(req, res){
    res.render('sun');
    });
    
    
app.get('/tennis',function(req, res){
    res.render('tennis');
    });

app.post('/search',async function(req,res){
    var x=await FindItem(req.body.Search);
    if(x==null){
        alert("You don't have a connection");
    }
    else 
    res.render('searchresults',{list:x});
});

app.post('/',function(req,res){
var x=req.body.username;
res.render('home');
});




app.listen(3000);

  


