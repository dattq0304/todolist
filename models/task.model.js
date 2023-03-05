const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

//TO FIX THIS WARNING: Mongoose: the `strictQuery` option will be switched back to `false` by default in Mongoose 7 ...
mongoose.set("strictQuery", false);

//Connect to the  mongodb cloud | database: todolist
const USERNAME = process.env.MONGODB_USERNAME;
const PASSWORD = process.env.MONGODB_PASSWORD;
const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.aemt99q.mongodb.net/todolist?retryWrites=true&w=majority`;

mongoose.connect(URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const TaskSchema = new Schema({
	title: String
}, {
	collection: 'works'
});	

const TaskModel = mongoose.model('works', TaskSchema);

module.exports = TaskModel;