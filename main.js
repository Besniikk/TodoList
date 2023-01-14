window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');

	const username = localStorage.getItem('username') || '';

	nameInput.value = username;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('username', e.target.value);
	})

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		if (e.target.elements.content.value.trim() !== "") {
			const todo = {
				content: e.target.elements.content.value,
				done: false,
				createdAt: new Date().toLocaleDateString()
			}
	
			todos.push(todo);
	
			localStorage.setItem('todos', JSON.stringify(todos));
	
			// Reset the form
			e.target.reset();
	
			DisplayTodos()
		}
	})

	DisplayTodos()
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const actions = document.createElement('div');
		const cancel = document.createElement('button');
		const edit = document.createElement('button');
		const save = document.createElement('button');
		const deleteButton = document.createElement('button');
    const date = document.createElement('span');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
    span.classList.add('business');

		content.classList.add('todo-content');
		actions.classList.add('actions');
		cancel.classList.add('cancel');
		edit.classList.add('edit');
		save.classList.add('save');
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
		cancel.innerHTML = 'Cancel';
		edit.innerHTML = 'Edit';
		save.innerHTML = 'Save';
		deleteButton.innerHTML = 'Delete';

    date.innerHTML = todo.createdAt;

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(cancel);
		actions.appendChild(edit);
		actions.appendChild(save);
		actions.appendChild(deleteButton);
		actions.appendChild(date);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}

		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();

			e.target.parentNode.querySelector('.edit').classList.add('deactivate-edit');
			e.target.parentNode.querySelector('.cancel').classList.add('active-edit');
			e.target.parentNode.querySelector('.save').classList.add('active-edit');
		})

		cancel.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.setAttribute('readonly', true);

			e.target.parentNode.querySelector('.edit').classList.remove('deactivate-edit');
			e.target.parentNode.querySelector('.cancel').classList.remove('active-edit');
			e.target.parentNode.querySelector('.save').classList.remove('active-edit');
			// DisplayTodos()
		})

		save.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			console.log(input.value);
			

			if (input.value.trim() !== "") {
				input.setAttribute('readonly', true);
				todo.content = input.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				e.target.parentNode.querySelector('.edit').classList.remove('deactivate-edit');
				e.target.parentNode.querySelector('.cancel').classList.remove('active-edit');
				e.target.parentNode.querySelector('.save').classList.remove('active-edit');
				// DisplayTodos()
			} else {
				input.focus();
			}
			
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})
}