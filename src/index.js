import React from 'react';
import ReactDOM from 'react-dom';
import TodoModel from './todoModel';
import TodoApp from './app.js';
import styles from './css/index.css';

var model = new TodoModel('react-todos');
console.log(model.todos)

ReactDOM.render(
	<TodoApp model={model}/>,
	document.getElementsByClassName('todoapp')[0]
)