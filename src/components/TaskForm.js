import React, { useContext, useState, useEffect, useRef } from 'react';
import { TaskListContext } from '../context/TaskListContext';

const TaskForm = () => {
    const { addTask, clearList, editItem, editTask } = useContext(TaskListContext);

    const [title, setTitle] = useState("");

    const taskInputRef = useRef(null);

    const handleChange = e => {
        setTitle(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (editItem) {
            editTask(title, editItem.id);
        } else {
            addTask(title);
        }
        setTitle("");
        taskInputRef.current.focus();
    };

    useEffect(() => {
        if (editItem) {
            setTitle(editItem.title);
        } else {
            setTitle("");
        }
    }, [editItem]);

    return (
        <form onSubmit={handleSubmit} className="form">
            <input 
                onChange={handleChange}
                type="text"
                value={title}
                className="task-input"
                placeholder="Add Task..."
                ref={taskInputRef}
                required
            />
            <div className="buttons">
                <button type="submit" className="btn add-task-btn">
                    {editItem ? "Edit Task" : "Add Task"}
                </button>
                <button onClick={clearList} type="button" className="btn clear-btn">
                    Clear
                </button>
            </div>
        </form>
    );
}

export default TaskForm;