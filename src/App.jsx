import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import Task from './Task';

function App() {
  const [todos, setTodos] = useState([]);
  const [sortMode, setSortMode] = useState(false);

  useEffect(() => {
      fetch('http://localhost:3002/todos')
      .then(response => response.json())
      .then(data => setTodos(data))
      .catch(error => console.log('Ошибка при получении данных', error));
  }, []);

  const addTodo = async (title) => {
    try {
      const response = await fetch('http://localhost:3002/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: title }),
      });

      const data = await response.json();
      setTodos([...todos, data]);
    } catch (error) {
      console.log('Ошибка при добавлении дела', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3002/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log('Ошибка при удалении дела', error);
    }
  };

  const updateTodo = async (id, newTitle) => {
    try {
      await fetch(`http://localhost:3002/todos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: newTitle }),
      });
      setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title: newTitle } : todo)));
    } catch (error) {
      console.log('Ошибка при обновлении дел', error);
    }
  };

  const searchTodos = (query) => {
    const filteredTodos = todos.filter((todo) =>
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
    setTodos(filteredTodos);
  };

  const toggleSort = () => {
    setSortMode(!sortMode);
    const sortedTodos = sortMode
      ? [...todos].sort((a, b) => a.title.localeCompare(b.title))
      : [...todos];
    setTodos(sortedTodos);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home todos={todos} addTodo={addTodo} searchTodos={searchTodos} toggleSort={toggleSort} />}
        />
        <Route
          path="/task/:id"
          element={<Task todos={todos} deleteTodo={deleteTodo} updateTodo={updateTodo} />}
        />
        <Route
          path="/404"
          element={
            <div>
              <h2>404 Not Found</h2>
              <p>Такая страница не найдена</p>
              <Link to="/">Возврат на главную страницу</Link>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
