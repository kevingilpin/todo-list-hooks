import React, { useContext, useState, useRef, useEffect } from 'react';
import { TaskListContext } from '../context/TaskListContext';

const TaskForm = () => {
    const { state: { editItem }, dispatch } = useContext(TaskListContext);

    const [title, setTitle] = useState("");

    const taskInput = useRef(null);

    const handleChange = e => {
        setTitle(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (editItem) {
            dispatch({type: 'editTask', title, id: editItem.id});
        } else {
            dispatch({type: 'addTask', title});
        }
        setTitle("");
    };

    useEffect(() => {
        if (editItem) {
            setTitle(editItem.title);
        } else {
            setTitle("");
        }
        taskInput.current.focus();
    }, [editItem]);

    return (
        <form onSubmit={handleSubmit} className="form">
            <input 
                onChange={handleChange}
                type="text"
                value={title}
                ref={taskInput}
                className="task-input"
                placeholder="Add Task..."
                required
                autoFocus
            />
            <div className="buttons">
                <button type="submit" className="btn add-task-btn">
                    {editItem ? "Edit Task" : "Add Task"}
                </button>
                <button onClick={() => dispatch({type: 'clearList'})} type="button" className="btn clear-btn">
                    Clear
                </button>
            </div>
        </form>
    );
}

export default TaskForm;