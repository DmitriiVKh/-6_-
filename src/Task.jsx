import { Link, useParams, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function Task({ todos, deleteTodo, updateTodo }) {
    const { id } = useParams();
    const task = todos.find((todo) => todo.id === parseInt(id));
  
    if (!task) {
      return <Navigate to="/404" />;
    }
  
    const handleDelete = () => {
      deleteTodo(task.id);
    };
  
    const handleUpdate = () => {
      const newTitle = prompt('Введите новое название задачи:', task.title);
      if (newTitle !== null) {
        updateTodo(task.id, newTitle);
      }
    };
  
    return (
      <div>
        <h2>Task Details</h2>
        <p>{task.title}</p>
        <button onClick={handleDelete}>Удалить</button>
        <button onClick={handleUpdate}>Изменить</button>
        <br />
        <Link to="/">Назад</Link>
      </div>
    );
  }

  Task.propTypes = {
    todos: PropTypes.array.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
};

  export default Task;