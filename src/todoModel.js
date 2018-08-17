/*jshint quotmark:false */
/*jshint white:false */
/*jshint trailing:false */
/*jshint newcap:false */

import React from 'react';
import Utils from './utils';
// Generic "model" object. You can use whatever
// framework you want. For this application it
// may not even be worth separating this logic
// out, but we do this to demonstrate one way to
// separate out parts of your application.
    
export default class TodoModel extends React.Component{
//  constructor(key) {
  constructor() {
		console.log('todomodel constructor')
		super()
		this.key = 'a'
		this.utils = new Utils
		this.todos = this.utils.store('a')
		console.log(this.todos)
  	this.onChanges = []
  }
  
  subscribe(onChange) {
  	this.onChanges.push(onChange);
  }
  
  inform() {
  	this.utils.store(this.key, this.todos);
  	this.onChanges.forEach(function (cb) { cb(); });
  }
  
  addTodo(title) {
  	this.todos = this.todos.concat({
  		id: Utils.uuid(),
  		title: title,
  		completed: false
  	});
  
  	this.inform();
  }
  
  toggleAll(checked) {
  	// Note: it's usually better to use immutable data structures since they're
  	// easier to reason about and React works very well with them. That's why
  	// we use map() and filter() everywhere instead of mutating the array or
  	// todo items themselves.
  	this.todos = this.todos.map(function (todo) {
  		return Utils.extend({}, todo, {completed: checked});
  	});
 
  	this.inform();
  }

  toggle(todoToToggle) {
  	this.todos = this.todos.map(function (todo) {
  		return todo !== todoToToggle ?
  			todo :
  			Utils.extend({}, todo, {completed: !todo.completed});
  	});
  
  	this.inform();
  }

  destroy(todo) {
  	this.todos = this.todos.filter(function (candidate) {
  		return candidate !== todo;
  	});
  
  	this.inform();
  };

  save(todoToSave, text) {
  	this.todos = this.todos.map(function (todo) {
  		return todo !== todoToSave ? todo : Utils.extend({}, todo, {title: text});
  	});

  	this.inform();
  };

  clearCompleted() {
  	this.todos = this.todos.filter(function (todo) {
  		return !todo.completed;
  	});

  	this.inform();
	}
}