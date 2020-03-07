import React, { createContext, useState, useReducer, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export const TaskListContext = createContext();

const TaskListContextProvider = props => {
    const initialState = {
        tasks: [],
        editTask: null
    };

    function reducer(state, action) {
        const newState = {...state}

        switch (action.type) {
            case 'addTask':
                newState.tasks = [...state.tasks, { title: action.title, id: uuid() }];
                return newState;
            case 'removeTask':
                newState.tasks = state.tasks.filter(task => task.id !== action.id)
                return newState;
            case 'clearList':
                newState.tasks = [];
                return newState;
            case 'findItem':
                newState.editItem = state.tasks.find(task => task.id === action.id);
                return newState;
            case 'editTask':
                newState.tasks = state.tasks.map(task => task.id === action.id ? {title: action.title, id: task.id} : task);
                newState.editItem = null;
                return newState;
            default:
                throw new Error();
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <TaskListContext.Provider value={{state, dispatch}}>
            {props.children}
        </TaskListContext.Provider>
    );
};

export default TaskListContextProvider;
