import React, { useState, useEffect } from 'react';
import './index.css';

const Todolist = () => {
  const [todos, setTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');
  const [todoDescriptionInput, setTodoDescriptionInput] = useState('');
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (event) => {
    setTodoInput(event.target.value);
  };

  const handleDescriptionInputChange = (event) => {
    setTodoDescriptionInput(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (!todoInput.trim()) {
      return;
    }
    if (editing) {
      setTodos(todos.map((todo, index) => {
        if (index === editIndex) {
          return {
            title: todoInput,
            description: todoDescriptionInput,
          };
        }
        return todo;
      }));
      setTodoInput('');
      setTodoDescriptionInput('');
      setEditing(false);
      setEditIndex(null);
    } else {
      setTodos([...todos, {
        title: todoInput,
        description: todoDescriptionInput,
      }]);
      setTodoInput('');
      setTodoDescriptionInput('');
    }
  };

  const handleEditTodo = (index) => {
    const { title, description } = todos[index];
    setTodoInput(title);
    setTodoDescriptionInput(description);
    setEditing(true);
    setEditIndex(index);
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <section>
    <div className='container'>
      <h1>TODO LIST</h1>
      <form onSubmit={handleAddTodo} className='form'>
        <label>
          Title: <br/>
          <input type="text" value={todoInput} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Description: <br/>
          <textarea value={todoDescriptionInput} onChange={handleDescriptionInputChange} cols={50} rows={7}></textarea>
          {/* <input type="text" /> */}
        </label>
        <br />
        <div className='submit'>
          <button type="submit">{editing ? 'Edit' : 'Add'}</button>
        </div>
      </form>
      <div>
        {todos.map((todo, index) => (
          <div key={index} className='whole'>

            <div className='display-1'>
              <div className='display'>
                <h4>Title Value :</h4>
                <hr></hr>
                <p>{todo.title}</p>
              </div>

              <div className='display'>
              <h4>description Value :</h4>
              <hr></hr>
                <p>{todo.description}</p>
              </div>
            </div>
            <hr></hr>
           <div className='btn'>
                <div className='button-1'>
                    <button onClick={() => handleEditTodo(index)}>Edit</button>
                </div>
                <div className='button-1'>
                    <button onClick={() => handleDeleteTodo(index)}>Delete</button>
                </div>
              </div>
          </div>
        ))}
      </div>
    </div>
    </section>
  );
};

export default Todolist;