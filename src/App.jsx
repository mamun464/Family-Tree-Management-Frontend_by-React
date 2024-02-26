import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {
                    taskID: 1,
                    task: '1) Planning about the project'
                },
                {
                    taskID: 2,
                    task: '2) Risk analysis'
                },
                {
                    taskID: 3,
                    task: '3) Start development of the project'
                }
            ],
            completedTasks: [],
            draggedTask: {}
        }
    }

    onDrag = (event, todo) => {
        event.preventDefault();
        this.setState({
            draggedTask: todo
        });
    }

    onDragOver = (event) => {
        event.preventDefault();
    }

    onDrop = (event) => {
        const { completedTasks, draggedTask, todos } = this.state;
        this.setState({
            completedTasks: [...completedTasks, draggedTask],
            todos: todos.filter(task => task.taskID !== draggedTask.taskID),
            draggedTask: {},
        });
    }

    render() {
        const { todos, completedTasks } = this.state;

        return (
            <div className="App">
                <div className="todos-container">
                    <h2>Todo</h2>
                    <div className="todos">
                        {todos.map(todo =>
                            <div
                                key={todo.taskID}
                                draggable
                                onDrag={(event) => this.onDrag(event, todo)}
                                className="todo"
                            >
                                {todo.task}
                            </div>
                        )}
                    </div>
                </div>
                <div
                    onDrop={event => this.onDrop(event)}
                    onDragOver={(event => this.onDragOver(event))}
                    className="done-container"
                >
                    <h2>Completed</h2>
                    <div className="done">
                        {completedTasks.map(task =>
                            <div
                                key={task.taskID}
                                className="completed-task"
                            >
                                {task.task}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
