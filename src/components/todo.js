import React, { useEffect, useState } from 'react';

const Todo = () => {

    const [task, setTask] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("localTasks")) {
            const storedList = JSON.parse(localStorage.getItem("localTasks"));
            setTasks(storedList);
        }
    }, [])

    const addTask = (e) => {
        if (task) {
            const newTask = { id: new Date().getTime().toString(), title: task };
            setTasks([...tasks, newTask]);
            localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
            setTask("");
        }
    }

    const handleDelete = (task) => {
        const deleted = tasks.filter((t) => t.id !== task.id);
        setTasks(deleted);
        localStorage.setItem("localTasks", JSON.stringify(deleted))
    }

    const handleClear = () => {
        setTasks([]);
        localStorage.removeItem("localTasks");
    }

    return (
        <div className='container row'>
            <h1 className='mt-3 text-white'>To-Do App</h1>
            <div className='col-11'>
                <input
                    name="task"
                    type="text"
                    value={task}
                    placeholder="Escribe tu tarea..."
                    className="form-control"
                    onChange={(e) => setTask(e.target.value)}
                />
            </div>
            <div className="col-1">
            <button className='btn btn-primary form-control material-icons'
                    onClick={addTask}>
                    add</button>
            </div>
            <div className="badge">
                Tu tienes
                {!tasks.length
                    ? " 0 tareas"
                    : tasks.length === 1
                        ? " 1 tarea"
                        : tasks.length > 1
                            ? ` ${tasks.length} tareas`
                            : null}
            </div>
            {tasks.map((task) => (
                <React.Fragment key={task.id}>
                    <div className="col-11">
                        <span className="form-control bg-white btn mt-2"
                            style={{ textAlign: "left", fontWeight: "bold" }}>
                            {task.title}
                        </span>
                    </div>

                    <div className="col-1">
                        <button className="mt-2 btn btn-warning material-icons"
                            onClick={() => handleDelete(task)}
                        >delete</button>
                    </div>
                </React.Fragment>
            ))}
            {!tasks.length ? null : (
                <div>
                    <button className='btn btn-danger mt-4 mb-4' onClick={() => handleClear()}>
                        Limpiar
                    </button>
                </div>
            )}
        </div>
    );
}

export default Todo;
