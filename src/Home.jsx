import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Home({ todos, addTodo, searchTodos, toggleSort }) {
    const [newTodo, setNewTodo] = useState('');
  
    const handleAddTodo = () => {
      if (newTodo.trim() !== '') {
        addTodo(newTodo);
        setNewTodo('');
      }
    };
  
    return (
      <div className="todo-list">
        <h1>Список дел</h1>
        <div>
          <input
            type='text'
            placeholder='Новая задача'
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
          />
          <button onClick={handleAddTodo}>Добавить задачу</button>
        </div>
  
        <div>
          <input
            type='text'
            placeholder='Поиск задачи'
            onChange={(event) => searchTodos(event.target.value)}
          />
          <button>Поиск</button>
        </div>
  
        <div>
          <label>
            <input
              type='checkbox'
              onChange={toggleSort}
            />
            Сортировать по алфавиту
          </label>
        </div>
  
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <Link to={`/task/${todo.id}`} className="task-text">{todo.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }


  Home.propTypes = {
    todos: PropTypes.array.isRequired,
    addTodo: PropTypes.func.isRequired,
    searchTodos: PropTypes.func.isRequired,
    toggleSort: PropTypes.func.isRequired,
};

  export default Home;