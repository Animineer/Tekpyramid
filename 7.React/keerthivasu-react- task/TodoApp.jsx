import { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');


  const addTodo = () => {
    if (inputValue.trim() !== '') {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
      }]);
      setInputValue('');
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };



  return (
    <div>
      <h1>React Todo App</h1>
      
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task"
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
        />
        <button onClick={addTodo}>
          Add
        </button>
      </div>

      <ol >
        {todos.map(todo => (
          <li key={todo.id} >
              <div>
                <span >{todo.text}</span>
                  <button onClick={() => deleteTodo(todo.id)}>
                    Delete
                  </button>
          <hr />
                </div>
          </li>
          
        ))}
      </ol>
    </div>
  );
}

export default TodoApp;


