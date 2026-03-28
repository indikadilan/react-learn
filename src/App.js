import React, { useState, useRef, useEffect} from 'react';
import Todolist from './Todolist';

const LOCAL_STORAGE_KEY = 'todosApp.todos';

function App() {
  
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTodos) {
      try {
        return JSON.parse(storedTodos);
      } catch (error) {
        console.error('Failed to parse stored todos:', error);
        return [];
      }
    }
    return [];
  });
  const todoNameRef = useRef();

  function test(description, callback) {
    console.log(`Running test: ${description}`);
    callback();
  }

  test('should add a todo', () => {
    const initialTodos = [];
    const newTodo = { id: 1, name: 'Test Todo', complete: false };
    const updatedTodos = [...initialTodos, newTodo];
    console.log('Updated todos:', updatedTodos);
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

function toggleTodo(id){
  const newTodos = [...todos];
  const todo = newTodos.find(todo => todo.id === id);
  todo.complete = !todo.complete;
  setTodos(newTodos);
}

function handleAddTodo(e) {
  const name = todoNameRef.current.value
  if (name === '') return;
  console.log(name);
  setTodos(prevTodos => {
    return [...prevTodos, {id: Math.random(), name: name, complete: false}]
  })
  todoNameRef.current.value =null;
}

function handleClearTodos() {
  const newTodos = todos.filter(todo => !todo.complete);
  setTodos(newTodos);
}

return (
  <>
  <Todolist todos={todos} toggleTodo={toggleTodo}/>
  <input ref={todoNameRef} type="text" placeholder="Add todo" />
  <button onClick={handleAddTodo}>Add Todo </button>
  <button onClick={handleClearTodos}>Clear Completed</button>
  <div>{todos.filter(todo => !todo.complete).length} left to do</div>
  </>
);
}
export default App;
