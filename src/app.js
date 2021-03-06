import React from 'react';
// import Router from 'director';
import axios from'axios';
import TodoFooter from './footer';
import TodoItem from './todoItem';
import TodoModel from './todoModel';
import Utils from './utils';

const ENTER_KEY = 13;
const ALL_TODOS = 'all';
const ACTIVE_TODOS = 'active';
const COMPLETED_TODOS = 'completed';
const caller = axios.create({
	baseURL: 'http://localhost:8080',
	headers: {
		'ContentType': 'application/json',
		'X-Requested-With': 'XMLHttpRequest'
	},
	responseType: 'json'
})

export default class TodoApp extends React.Component{
	constructor() {
		console.log('initializing app.js')
		super()
		this.state = {
			nowShowing: ALL_TODOS,
			editing: null,
			newTodo: '',
			todos: [] 
		}
		this.toggle = this.toggle.bind(this)
		this.addTodo = this.addTodo.bind(this)
		this.save = this.save.bind(this)
		this.destroy = this.destroy.bind(this)
		this.edit = this.edit.bind(this)
		this.cancel = this.cancel.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleNewTodoKeyDown = this.handleNewTodoKeyDown.bind(this)
	}
	getInitialState() {
		return {
			nowShowing: ALL_TODOS,
			editing: null,
			newTodo: ''
		};
	}

	componentDidMount() {
		var todos = []
		caller
		  .get('/todos/')
		  .then((res) => {
				for(let t of res.data){
		      var todo = {
	      	  id: t.id,
  		      title: t.title,
		        completed: t.completed
					}
					todos.push(todo)
				}
        this.setState({todos: todos})
		  })
 			.catch(error => console.error(error))

		//ここでエラーが出る。directorをインポートできたら勝ちっぽい
		// これfinagleでやれば良い
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
			this.addTodo(val);
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

  addTodo(title) {
		var utils = new Utils
  //	this.todos = this.state.todos.concat({
  //		id: utils.uuid(),
  //		title: title,
  //		completed: false
	//  })
		var data = ({
			id: 999,
			title: title, 
			completed: false,
			user_id: 1
		})
		var todos = []
		caller
		  .post('/todos/', data)
		  .then((res) => {
				for(let t of res.data){
		      var todo = {
	      	  id: t.id,
  		      title: t.title,
		        completed: t.completed
					}
					todos.push(todo)
				}
        this.setState({todos: todos})
		  })
			.catch(error => console.error(error))
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
		var todos = this.state.todos
		var toggle = this.state.toggle
		var destroy = this.state.destroy
		var edit = this.state.edit
		var cancel = this.state.cancel
		var save = this.state.save

		// TODO: todosの持ってきかた考える
		var utils = new Utils
		console.log(todos);

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
		var todoItems = todos.map(function (todo) {
			return(
			  <TodoItem
			  	key={todo.id}
			  	todo={todo}
			  	onToggle={toggle}
			  	onDestroy={destroy}
			  	onEdit={edit}
			  	editing={edit === todo.id}
			  	onSave={save}
			  	onCancel={cancel}
			  />
			)
		})

//		var activeTodoCount = 1
		var activeTodoCount = todoItems.reduce(function (accum, todo) {
			if(todo) {
				return todo.completed ? accum : accum + 1;
			} else {
				return 
			}
		}, 0);

		var completedCount = todos.length - activeTodoCount;
		// var completedCount = 0

		if (activeTodoCount || completedCount) {
			footer =
				<TodoFooter
					count={activeTodoCount}
					completedCount={completedCount}
					nowShowing={this.state.nowShowing}
					onClearCompleted={this.clearCompleted}
				/>;
		}

		if (this.state.todos.length) {
		//if (true) {
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