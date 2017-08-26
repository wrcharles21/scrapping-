var express = require("express");
var bodyParser= require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var Comment = require("./models/comment.js")
var Article = require ("./models/article.js")

var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise =Promise; 

var app = express();

app.use(express.static("public"));

app.use(logger("dev"));
app.use(bodyParser.urlencoded({
	extended: false
}));


mongoose.connect("mongodb://localhost/latimes", {
  useMongoClient: true
});
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.get("/scrape", function(req, res){
	request("http://www.latimes.com/sports",function(error, response, html){
		var $ =cheerio.load(html);

		$("li").each(function(i, element){

			var result = {};

			result.title = $(this).children("section").children("div").text();
			result.description = $(this).children("section").children("h3").text();
			result.link = $(this).children("section").children("h3").attr("href");
			result.img = $(this).children("a").children("img").attr("src");


			var newArticle = newArticle.result;

			newArticle.save(function(err, doc){
				if (err){
					console.log(err);
				}
				else {
					console.log(doc);
				}
			});

			console.log(result);  

		});

	});

	res.send("Completed Scrape");
});

app.get("/articles", function(req, res) {
  // Grab every doc in the Articles array
  Article.find({}, function(error, doc) {
    // Log any errors
    if (error) {
      console.log(error);
    }
    // Or send the doc to the browser as a json object
    else {
      res.json(doc);
    }
  });
});

app.get("/articles/:id", function(req, res){
	Article.find({"articles":req.params.articles})

		.populate("comment")

		.exec(function(error,doc){
			if (error) {
				console.log(error);
			}
			else{
				res.json(doc);
			}
		})
	})


app.post("/articles/:id", function(req,res){
	var newComment = new Comment(req.body);

	newComment.save(function(error, doc){
		if(error) {
			console.log(error);
		}
		else{
			Article.findOneAndUpdate({"_id": req.params.id}, {"comment":doc._id})
			.exec(function(err, doc){
				if(err) {
					console.log(error);
				}
				else{
					res.send(doc);
				}
			});
		}	

	});
});

app.listen(3000, function() {
  console.log("App running on port 3000!");
});
