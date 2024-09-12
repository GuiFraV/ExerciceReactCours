import React, { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App = () => {
  const [textTodo, setTextTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filtered, setFiltered] = useState<string>("");

  const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextTodo(e.target.value);
  };

  const handleSubmit = () => {
    if (textTodo.trim() !== "") {
      setTodos((prevTodo) => [
        ...prevTodo,
        { id: Date.now(), text: textTodo, completed: false },
      ]);
      setTextTodo("");
    }
  };

  const deleteTodo = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
  };

  const isCompleted = (id: number) => {
    setTodos((prevTodo) =>
      prevTodo.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const isFiltered = (value: string) => {
    setFiltered(value);
  };

  const filteredTodo = todos.filter((todo) => {
    if (filtered === "Completed") {
      return todo.completed;
    } else if (filtered === "En cours") {
      return !todo.completed;
    } else {
      return true;
    }
  });

  const generateTodo = () => {
    for (let i = 0; i < 50; i++) {
      setTodos((prevTodo) => [
        ...prevTodo,
        {
          id: prevTodo.length + 1,
          text: `Todo ${prevTodo.length + 1}`,
          completed: false,
        },
      ]);
    }
  };

  return (
    <div>
      <h1>Todo list</h1>
      <input
        onChange={handleText}
        type="text"
        placeholder="Add todo"
        value={textTodo}
      />
      <input onClick={handleSubmit} type="submit" />
      <input onClick={generateTodo} type="submit" value="Générer" />
      <div>
        <button onClick={() => isFiltered("All")}>All</button>
        <button onClick={() => isFiltered("Completed")}>Completed</button>
        <button onClick={() => isFiltered("En cours")}>En cours</button>
      </div>

      <ul>
        {filteredTodo.map((todo) => (
          <li
            key={todo.id}
            onClick={() => isCompleted(todo.id)}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
            <button onClick={(e) => deleteTodo(e, todo.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
