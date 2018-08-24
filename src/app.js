import React from 'react';
// import Router from 'director';
import axios from'axios';
import TodoFooter from './footer';
import TodoItem from './todoItem';
import TodoModel from './todoModel'
import Utils from './utils';

const ENTER_KEY = 13;
const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';

export default class TodoApp extends React.Component{
	constructor() {
		console.log('initializing app.js')
		super()
		this.state = {
			nowShowing: ALL_TODOS,
			editing: null,
			newTodo: '',
			todos: {}
		}
	}
	getInitialState() {
		return {
			nowShowing: ALL_TODOS,
			editing: null,
			newTodo: ''
		};
	}

	componentDidMount() {
		const caller = axios.create({
			baseURL: 'http://localhost:8080',
			headers: {
				'ContentType': 'application/json',
				'X-Requested-With': 'XMLHttpRequest'
			},
			responseType: 'json'
		})
		function initializeTodo() {
			caller.get('/todos/').then((res) => {
			  var todo = {
		    	id: res.data.id,
			    title: res.data.title,
			    completed: res.data.completed
				}
				return todo
			}
			)
			.then((todo) => setState({todos: todo}))
			.catch(error => console.error(error))
		}
		initializeTodo()
			//return caller
			  //.get('/todos/')
			  //.catch(() => {
			  	//console.log('failed to communicate api server')
			  //})
		//}

		//ここでエラーが出る。directorをインポートできたら勝ちっぽい
		/*var router = Router({
			'/': setState.bind(this, {nowShowing: ALL_TODOS}),
			'/active': setState.bind(this, {nowShowing: ACTIVE_TODOS}),
			'/completed': setState.bind(this, {nowShowing: COMPLETED_TODOS})
		});
		router.init('/'); */
		
	}

	handleChange(event) {
		this.setState({newTodo: event.target.value});
	}

	handleNewTodoKeyDown(event) {
		if (event.keyCode !== ENTER_KEY) {
			return;
		}

		event.preventDefault();

		var val = this.state.newTodo.trim();

		if (val) {
			this.props.model.addTodo(val);
			this.setState({newTodo: ''});
		}
	}

	toggleAll(event) {
		var checked = event.target.checked;
		this.props.model.toggleAll(checked);
	}

	toggle(todoToToggle) {
		this.props.model.toggle(todoToToggle);
	}

	destroy(todo) {
		this.props.model.destroy(todo);
	}

	edit(todo) {
		this.setState({editing: todo.id});
	}

	save(todoToSave, text) {
		this.props.model.save(todoToSave, text);
		this.setState({editing: null});
	}

	cancel() {
		this.setState({editing: null});
	}

	clearCompleted() {
		this.props.model.clearCompleted();
	}

	render() {
		var footer;
		var main;

		// TODO: todosの持ってきかた考える
		var utils = new Utils
		console.log(this.state.todos);

		// 見せるtodoの制御
		/* var shownTodos = todos.filter(function (todo) {
			switch (this.state.nowShowing) {
			case ACTIVE_TODOS:
				return !todo.completed;
			case COMPLETED_TODOS:
				return todo.completed;
			default:
				return true;
			}
		}, this); */

		// var todoItems = shownTodos.map(function (todo) {
		// var todoItems = this.state.todos.map(function (todo) {
		var todo = this.state.todos
		var todoItems =
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={this.toggle.bind(this, todo)}
					onDestroy={this.destroy.bind(this, todo)}
					onEdit={this.edit.bind(this, todo)}
					editing={this.state.editing === todo.id}
					onSave={this.save.bind(this, todo)}
					onCancel={this.cancel}
				/>

		var activeTodoCount = 1
//		var activeTodoCount = todos.reduce(function (accum, todo) {
//			return todo.completed ? accum : accum + 1;
//		}, 0);

		//var completedCount = todos.length - activeTodoCount;
		var completedCount = 0

		if (activeTodoCount || completedCount) {
			footer =
				<TodoFooter
					count={activeTodoCount}
					completedCount={completedCount}
					nowShowing={this.state.nowShowing}
					onClearCompleted={this.clearCompleted}
				/>;
		}

		//if (todos.length) {
		if (true) {
			main = (
				<section className="main">
					<input
						id="toggle-all"
						className="toggle-all"
						type="checkbox"
						onChange={this.toggleAll}
						checked={activeTodoCount === 0}
					/>
					<label
						htmlFor="toggle-all"
					/>
					<ul className="todo-list">
						{todoItems}
					</ul>
				</section>
			);
		}

		return (
			<div>
				<header className="header">
					<h1>todos</h1>
					<input
						className="new-todo"
						placeholder="What needs to be done?"
						value={this.state.newTodo}
						onKeyDown={this.handleNewTodoKeyDown}
						onChange={this.handleChange}
						autoFocus={true}
					/>
				</header>
				{main}
				{footer}
			</div>
		);
	}
}