import React, { useContext } from 'react';
import { TaskListContext } from '../context/TaskListContext';

const Task = ({task}) => {
    
    const { dispatch } = useContext(TaskListContext);

    return (
        <li className="list-item">
            <span>{task.title}</span>
            <div>
                <button onClick={() => dispatch({type: 'removeTask', id: task.id})} className="btn-delete task-btn">
                    <i className="fas fa-trash-alt"></i>
                </button>
                <button onClick={() => dispatch({type: 'findItem', id: task.id})} className="btn-edit task-btn">
                    <i className="fas fa-pen"></i>
                </button>
            </div>
        </li>
    );
}

export default Task;