var express = require('express');
var app = express(); //Object to represent the express application
var bodyParser = require('body-parser'); //Used for handling post requests through forms
var mongoose = require('mongoose'); //Used for interaction with MongoDB 

app.use(bodyParser.json()); //middleware - initializing bodyParser

Genre = require('./models/genre.js');
Book = require('./models/book.js');


// Connect to mongoose
mongoose.connect('mongodb://localhost/bookstore'); //the URL to my database
var db = mongoose.connection; //Database object


app.get('/', function(req, res){ 
    res.send('Please use /api/books or /api/genre');
}); 

app.get('/api/genres', function(req, res){
    Genre.getGenres(function(error, genres){
        if(error) {
            throw error;
        }
        res.json(genres);
    });
});

app.post('/api/genres', function(req, res){
    var genre = req.body;
    Genre.addGenre(genre, function(error, genre){
        if(error) {
            throw error;
        }
        res.json(genre);
    });
});

app.put('/api/genres/:_id', function(req, res){
    var id = req.params._id;
    var genre = req.body;
    Genre.updateGenre(id, genre, {}, function(error, genre){
        if(error) {
            throw error;
        }
        res.json(genre);
    });
});


app.get('/api/books', function(req, res){
    Book.getBooks(function(error, books){
        if(error) {
            throw error;
        }
        res.json(books);
    });
});

app.get('/api/book/:_id', function(req, res){
    Book.getBookById(req.params._id,function(error, book){
        if(error) {
            throw error;
        }
        res.json(book);
    });
});

app.post('/api/books', function(req, res){
    var book = req.body;
    Book.addBook(book, function(error, book){
        if(error) {
            throw error;
        }
        res.json(book);
    });
});

app.put('/api/books/:_id', function(req, res){
    var id = req.params._id;
    var book = req.body;
    Book.updateBook(id, book, {}, function(error, book){
        if(error) {
            throw error;
        }
        res.json(book);
    });
});

app.delete('/api/genres/:_id', function(req, res){
    var id = req.params._id;
    Genre.removeGenre(id, function(error, genre){
        if(error) {
            throw error;
        }
        res.json(genre);
    });
});
  
app.delete('/api/books/:_id', function(req, res){
    var id = req.params._id;
    Book.removeBook(id, function(error, book){
        if(error) {
            throw error;
        }
        res.json(book);
    });
});



app.listen(3000);
console.log('Running on port 3000...');
