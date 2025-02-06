import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../models/model";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";

import "./styles.css";

interface Props {
    index: number;
    activeTodo: Todo;
    activeTodos: Todo[];
    setActiveTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export function TodoItem({
    index,
    activeTodo,
    activeTodos,
    setActiveTodos,
}: Props) {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodoDescription, setEditTodoDescription] = useState<string>(
        activeTodo.description
    );

    const handleDone = (id: number) => {
        setActiveTodos(
            activeTodos.map((activeTodo) =>
                activeTodo.id === id
                    ? { ...activeTodo, isDone: !activeTodo.isDone }
                    : activeTodo
            )
        );
    };

    const handleDelete = (id: number) => {
        setActiveTodos(activeTodos.filter((todo) => todo.id !== id));
    };

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setActiveTodos(
            activeTodos.map((todo) =>
                todo.id === id ? { ...todo, description: editTodoDescription } : todo
            )
        );
        setEdit(false);
    };

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const editInput = (
        <input
            value={editTodoDescription}
            onChange={(e) => setEditTodoDescription(e.target.value)}
            className="todos__single--text"
            ref={inputRef}
        />
    )

    const activeTodoStriken = (
        <s className="todos__single--text">{activeTodo.description}</s>
    )

    const activeTodoNotStriken = (
        <span className="todos__single--text">{activeTodo.description}</span>
    )



    return (
        <Draggable draggableId={activeTodo.id.toString()} index={index}>
            {(provided) => (
                <form
                    className="todos__single"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleEdit(e, activeTodo.id);
                        inputRef.current?.blur();
                    }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {edit ? (
                        editInput
                    ) : activeTodo.isDone ? (
                        activeTodoStriken
                    ) : (
                        activeTodoNotStriken
                    )}
                    <div>
                        <span
                            className="icon"
                            onClick={() => {
                                if (!edit && !activeTodo.isDone) {
                                    setEdit(!edit);
                                }
                            }}
                        >
                            <AiFillEdit />
                        </span>
                        <span className="icon" onClick={() => handleDelete(activeTodo.id)}>
                            <AiFillDelete />
                        </span>
                        <span className="icon" onClick={() => handleDone(activeTodo.id)}>
                            <MdDone />
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    );
}
