import { useState } from 'react';
import './App.css';
import { InputField } from './components/InputField';
import { Todo } from './models/model';
import TodoList from './components/TodoList';
import { DropResult } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
function App() {
  const [todoDescription, setTodoDescription] = useState<string>("")
  const [activeTodos, setActiveTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todoDescription) {
      setActiveTodos([...activeTodos, { id: Date.now(), description: todoDescription, isDone: false }])
      setTodoDescription("");
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    let add;
    let active = [...activeTodos];
    let complete = [...completedTodos];

    if (source.droppableId === "todoslist") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "todoslist") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setActiveTodos(active);
  }


  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField
          todoDescription={todoDescription}
          setTodoDescription={setTodoDescription}
          handleAdd={handleAdd}
        />
        <TodoList
          activeTodos={activeTodos}
          setActiveTodos={setActiveTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
