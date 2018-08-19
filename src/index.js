import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './app.js';
import styles from './css/index.css';

ReactDOM.render(
	<TodoApp />,
	document.getElementsByClassName('todoapp')[0]
)