import React from 'react';
import ReactDOM from 'react-dom';
import TodoModel from './todoModel';
import TodoApp from './app.js';

var model = new TodoModel('react-todos');
console.log(model.todos)

ReactDOM.render(
	<TodoApp model={model}/>,
	document.getElementsByClassName('todoapp')[0]
)

model.subscribe(render);
render();