(function (window) {
	'use strict';

	window.todoAppLocalStore = {
		todos: JSON.parse(localStorage.getItem('stored-todo-app') || '[]'),

		save() {
			localStorage.setItem('stored-todo-app', JSON.stringify(this.todos));
		}
	};

	window.todoApp = () => {
		return {
			...todoAppLocalStore,
			newTodo: '',
			editTodo: '',
			filter: 'all',

			addTodo() {
				if (this.newTodo.trim().length) {
					this.todos.push({
						body: this.newTodo,
						id: Date.now(),
						completed: false,
						editing: false
					});
					this.newTodo = '';
					this.save();
				}
			},

			toggleAllTodos() {
				let isCompleted = this.allCompleted;
				this.todos.forEach(todo => todo.completed = ! isCompleted);
				this.save();
			},

			toggleTodo(todo) {
				todo.completed = ! todo.completed;
			},

			removeTodo(target) {
				this.todos = this.todos.filter((todo) => todo.id != target.id);
				this.save();
			},

			updateTodo(todo) {
				if (this.editTodo.trim().length) {
					todo.body = this.editTodo;
					todo.editing = false;
					this.editTodo = '';
				} else {
					this.removeTodo(todo);
				}
				this.save();
			},

			toggleEdit(todo) {
				todo.editing = ! todo.editing;
				this.editTodo = todo.body;
			},

			clearCompletedTodos() {
				this.todos = this.active;
				this.save();
			},

			filterBy(filter) {
				this.filter = filter;
			},

			get active() {
				return this.todos.filter(todo => ! todo.completed);
			},

			get completed() {
				return this.todos.filter(todo => todo.completed);
			},

			get filteredTodos() {
				return {
					all: this.todos,
					active: this.active,
					completed: this.completed
				}[this.filter];
			},

			get allCompleted() {
				return this.todos.length == this.completed.length;
			}
		}
	}
})(window);
