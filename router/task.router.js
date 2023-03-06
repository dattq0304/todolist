const express = require('express');
const router = express.Router();
const TaskModel = require('../models/task.model.js');

//Get
router.get('/', (req, res, next) => {
	TaskModel.find({})
	.then((task) => {
		res.json(task);
	})
	.catch((err) => {
		res.status(500).json('Data not found');
	})
})

//Create
router.post('/', (req, res, next) => {
	TaskModel.create({
		title: req.body.title
	})
	.then((task) => {
		res.json(task);
	})
	.catch((err) => {
		res.status(500).json('Error creating task');
	})
})

//Update
router.put('/:id', (req, res, next) => {
	let id = req.params.id;
	let newTitle = req.body.title;
	
	TaskModel.findByIdAndUpdate(id, {
    title: newTitle
  })
	.then((task) => {
		res.json('Succesful update');
	})
	.catch((err) => {
		res.status(500).json('Data not found');
	})
})

//Delete
router.delete('/:id', (req, res, next) => {
  let id = req.params.id;
  
	TaskModel.findByIdAndRemove(id)
  .then(data => {
    res.json('Succesful delete task');
  })
  .catch(err => {
    res.status(500).json('Task not deleted');
  })
})

//Export router
module.exports = router;

