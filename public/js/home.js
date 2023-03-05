const newTaskForm = $('#new-task__form');
const newTaskInput = $('#new-task__input');
const tasks = $('#tasks');
const taskApi = window.location.href + 'api/task';
console.log(taskApi);

const addNewTask = (event) => {
	event.preventDefault();
	
	let title = newTaskInput.val();
	newTaskInput.val('');
	
	if(!title) {
		return;
	}
	
	$.ajax({
		url: taskApi,
		type: 'POST',
		data: {
			title: title
		}
	})
	.then(data => {
		renderTask(data._id, data.title);
	})
	.catch(err => {
		console.log(err);
	})
}

const renderTask = (taskId, textInput) => {	
	let taskHTML = `
		<div class="task" data-id="${taskId}">
			<div class="task__content">
				<input type="text" class="task__content__text" value="${textInput}" readonly>
				<div class="task__actions">
					<button class="task__edit-button">Edit</button>
					<button class="task__delete-button">Delete</button>
				</div>
			</div>
		</div>
	`;
	
	tasks.append(taskHTML);
}

const saveTask = (taskId, inputText) => {
	$.ajax({
		url: `${taskApi}/${taskId}`,
		type: 'PUT',
		data: {
			title: inputText
		}
	})
	.then(data => {
		console.log(`Successful update task: ${taskId}`);
	})
	.catch(err => {
		console.log(err);
	})
}

const editTask = (event) => {
	let buttonTarget = $(event.target) ;
	let task = buttonTarget.closest('.task');
	let content = buttonTarget.closest('.task__content');
	let contentInput = content.find('.task__content__text');
	let taskId = task.data('id');
	
	if(contentInput.prop('readonly')) {
		contentInput.prop('readonly', false);
		buttonTarget.text('Save');
	} else { // Editting
		let newTitle = contentInput.val();
		
		if(!newTitle) { //Check validate 
			return;
		}
		
		contentInput.prop('readonly', true)
		buttonTarget.text('Edit');
		
		saveTask(taskId, newTitle);
	}
}

const deleteTask = (event) => {
	let task = $(event.target).closest('.task');
	let taskId = task.data('id');
	
	$.ajax({
		url: `${taskApi}/${taskId}`,
		type: 'DELETE'
	})
	.then(data => {
		task.remove()
		console.log(data);
	})
	.catch(err => {
		console.log(err);
	})
}

const loadTask = () => {
	$.ajax({
    url: taskApi,
    type: 'GET'
  })
	.then(data => {
		for(let i = 0; i < data.length; i++) {
			renderTask(data[i]._id, data[i].title);
		}
	})
	.catch(err => {
    console.log(err);
  })
}

$(document).ready(loadTask);
$(document).on('submit', newTaskForm, addNewTask);
$(document).on('click', '.task__edit-button', editTask);
$(document).on('click', '.task__delete-button', deleteTask);