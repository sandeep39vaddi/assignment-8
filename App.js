import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo('');
    }
  };

  const handleEditTodo = (todo) => {
    setIsEditing(true);
    setCurrentTodo({ ...todo });
  };

  const handleUpdateTodo = () => {
    setTodos(todos.map(todo => (todo.id === currentTodo.id ? currentTodo : todo)));
    setIsEditing(false);
    setCurrentTodo({});
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>To-dos</h1>
      <div>
        <input
          type="text"
          value={isEditing ? currentTodo.text : newTodo}
          onChange={(e) => isEditing ? setCurrentTodo({ ...currentTodo, text: e.target.value }) : setNewTodo(e.target.value)}
        />
        <button onClick={isEditing ? handleUpdateTodo : handleAddTodo}>
          {isEditing ? 'Update' : 'Add'}
        </button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.text}</span>
            <FontAwesomeIcon icon={faEdit} onClick={() => handleEditTodo(todo)} />
            <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteTodo(todo.id)} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
