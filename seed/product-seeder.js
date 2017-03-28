var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');

var products = [
    new Product({
        imagePath:'https://cdn.shopify.com/s/files/1/0831/9463/products/Notebook-Chambray-Web.png?v=1480102116',
        title: 'NoteBook',
        description: 'Awesome!',
        price: 10
    }),
    new Product({
        imagePath:'https://cdn.shopify.com/s/files/1/0831/9463/products/Notebook-Chambray-Web.png?v=1480102116',
        title: 'NoteBook',
        description: 'Awesome!',
        price: 10
    }),
    new Product({
        imagePath:'https://cdn.shopify.com/s/files/1/0831/9463/products/Notebook-Chambray-Web.png?v=1480102116',
        title: 'NoteBook',
        description: 'Awesome!',
        price: 10
    }),
    new Product({
        imagePath:'https://cdn.shopify.com/s/files/1/0831/9463/products/Notebook-Chambray-Web.png?v=1480102116',
        title: 'NoteBook',
        description: 'Awesome!',
        price: 10
    }),
    new Product({
        imagePath:'https://cdn.shopify.com/s/files/1/0831/9463/products/Notebook-Chambray-Web.png?v=1480102116',
        title: 'NoteBook',
        description: 'Awesome!',
        price: 10
    }),
    new Product({
        imagePath:'https://cdn.shopify.com/s/files/1/0831/9463/products/Notebook-Chambray-Web.png?v=1480102116',
        title: 'NoteBook',
        description: 'Awesome!',
        price: 10
    })
];

var done=0;
for(var i =0; i<products.length; i++){
    products[i].save(function(err,result) {
        done++;
        if(done===products.length){
            exit();
        }
    });
}
function exit() {
    mongoose.disconnect();
}
