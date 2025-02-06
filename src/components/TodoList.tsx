import React from "react";
import { Todo } from "../models/model";
import { TodoItem } from "./TodoItem";
import { Droppable } from "react-beautiful-dnd";

interface props {
    activeTodos: Array<Todo>;
    setActiveTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
    completedTodos: Array<Todo>;
    setCompletedTodos: React.Dispatch<React.SetStateAction<Array<Todo>>>;
}

const TodoList: React.FC<props> = ({
    activeTodos,
    setActiveTodos,
    completedTodos,
    setCompletedTodos,
}) => {
    return (
        <div className="container">
            <Droppable droppableId="todoslist">
                {(provided, snapshot) => (
                    <div
                        className={`active__todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        <span className="todos__heading">Active Tasks</span>
                        {activeTodos?.map((activeTodo, index) => (
                            <TodoItem
                                index={index}
                                activeTodos={activeTodos}
                                activeTodo={activeTodo}
                                key={activeTodo.id}
                                setActiveTodos={setActiveTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <Droppable droppableId="todosremove">
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={`
                            active__todos ${snapshot.isDraggingOver ?
                                "dragcomplete" : "remove"
                            }`}
                    >
                        <span className="todos__heading">Completed Tasks</span>
                        {completedTodos?.map((completedTodo, index) => (
                            <TodoItem
                                index={index}
                                activeTodos={completedTodos}
                                activeTodo={completedTodo}
                                key={completedTodo.id}
                                setActiveTodos={setCompletedTodos}
                            />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default TodoList;