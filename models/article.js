var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	//title for article
	title: {
		type: String,
		required: true
	},

	description: {
		type: String,
		required: true
	},

	link: {
		type: String,
		required: true
	},

	img: {
		type: String,
		required: true
	},

	saved: {
		type: Boolean,
		default: false
	},

	comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article; 
