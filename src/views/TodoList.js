import React, {useState} from 'react'
import Todos from '../components/todos/Todos'
import TodosForm from '../components/todos/TodosForm'

const TodoList = () => {

    // const initialState = [
    //     {id: 1, title: "شراء مستلزمات", done: false},
    //     {id: 2, title: "شراء منتجات", done: true},
    //     {id: 3, title: "مشاهدة الكورس", done: false},
    //     {id: 4, title: "كتابة الكود", done: true},
    // ];

    const initialState = localStorage.getItem("todos") ? 
        JSON.parse(localStorage.getItem("todos")) : [];

    const setToLocal = (todos) => {
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    const [todos, setTodos] = useState(initialState);

    // Mode => "add" || "not-add"
    const [mode, setMode] = useState("add");
    const [activeTodo, setActiveTodo] = useState({});

    let currentTodos = [...todos];
    if (mode === "not-add") {
        currentTodos = currentTodos.filter((todo) => !todo.done);
    }

    const editTodo = (todo) => {
        setMode("edit");
        setActiveTodo(todo);
    }

    // ChangeTodo True & False
    const changeTodoCompletion = (id) => {
        const curTodos = [...todos];
        const newTodos = curTodos.map((el) => {
            if (el.id == id) {
                el.done = !el.done;
                return el;
            }
            return el;
        });
        setToLocal(newTodos);
        setTodos(newTodos);
    }

    // DeleteTodo
    const deleteTodo = (id) => {
        const curTodos = [...todos];
        const newTodos = curTodos.filter((el) => el.id !== id);
        setToLocal(newTodos);
        setTodos(newTodos);
    }

    // AddTodoHandler
    const addTodoHandler = (title) => {
        if (mode !== "edit") {
            const newTodo = {
                id: Date.now(),
                title: title,
                done: false
            };

            const newTodos = [...todos, newTodo];
            setToLocal(newTodos);
            setTodos(newTodos);
        } else {
            const curTodos = [...todos];
            const newTodos = curTodos.map((el) => {
                if (el.id === activeTodo.id) {
                    el.title = title;
                    return el;
                }
                return el;
            });
            setToLocal(newTodos);
            setTodos(newTodos);
            setActiveTodo({});
            setMode("add");
        }
    }

    // showUnCompleteHandler
    const showUnCompleteHandler = () => {
        if (mode === "not-add") {
            setMode("add");
        } else {
            setMode("not-add");
        }
    };


    return (
        <main>
            <div className="container">
                <div className="todos">
                    <TodosForm 
                        addTodoHandler={addTodoHandler} 
                        showUnCompleteHandler={showUnCompleteHandler}
                        todos={mode !== "edit" ? currentTodos : [activeTodo]} 
                        mode={mode}
                    />
                    <Todos 
                        todos={mode !== "edit" ? currentTodos : [activeTodo]} 
                        changeTodoCompletion={changeTodoCompletion} 
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                    />
                </div>
            </div>
        </main>
    )
}

export default TodoList
