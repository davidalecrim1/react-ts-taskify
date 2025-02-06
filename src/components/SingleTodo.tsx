import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../models/model';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';
import { Draggable } from 'react-beautiful-dnd';
interface Props {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export function SingleTodo({ index, todo, todos, setTodos }: Props) {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodoDescription, setEditTodoDescription] = useState<string>(todo.description);

    const handleDone = (id: number) => {
        setTodos(todos.map((todo) => todo.id === id ?
            { ...todo, isDone: !todo.isDone } :
            todo));
    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(todos.map((todo) => todo.id === id ?
            { ...todo, description: editTodoDescription } :
            todo));
        setEdit(false);
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {(provided) => (
                <form className='todos__single' onSubmit={(e) => {
                    e.preventDefault();
                    handleEdit(e, todo.id);
                    inputRef.current?.blur();
                }}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {
                        edit ? (
                            <input
                                value={editTodoDescription}
                                onChange={(e) => setEditTodoDescription(e.target.value)}
                                className="todos__single--text"
                                ref={inputRef}
                            />
                        ) : todo.isDone ? (
                            <s className='todos__single--text'>{todo.description}</s>
                        ) : (
                            <span className='todos__single--text'>{todo.description}</span>
                        )
                    }
                    <div>
                        <span className="icon" onClick={
                            () => {
                                if (!edit && !todo.isDone) {
                                    setEdit(!edit);
                                }
                            }
                        }>
                            <AiFillEdit />
                        </span>
                        <span className="icon" onClick={() => handleDelete(todo.id)}>
                            <AiFillDelete />
                        </span>
                        <span className="icon" onClick={() => handleDone(todo.id)}>
                            <MdDone />
                        </span>
                    </div>
                </form>
            )}
        </Draggable>
    )
}