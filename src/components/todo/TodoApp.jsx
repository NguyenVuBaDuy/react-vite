import TodoListNew from './TodoListNew'
import TodoListData from './TodoListData'
import './todo.css'
import reactLogo from '../../assets/react.svg'
import { useState } from 'react'

const TodoApp = () => {
    const randomIntFromInterval = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const [todoList, setTodoList] = useState([]);


    const addNewToDo = (name) => {
        var newToDo = {
            id: randomIntFromInterval(1, 100000),
            name
        }
        setTodoList([...todoList, newToDo])
    }

    const deleteToDo = (id) => {
        var newTodo = todoList.filter(todo => todo.id !== id)
        setTodoList(newTodo);
    }

    return (
        <div className="todo-container">
            <div className="todo-title">Todo list</div>
            <TodoListNew addNewToDo={addNewToDo} />

            {/* {todoList.length > 0 &&
        <TodoListData todoList={todoList} />
      }

      {todoList.length === 0 &&
        <div>
          <img src={reactLogo} className='todo-image logo' />
        </div>
      } */}

            {todoList.length > 0 ?
                <TodoListData todoList={todoList} deleteToDo={deleteToDo} />

                :
                <div>
                    <img src={reactLogo} className='todo-image logo' />
                </div>
            }

        </div>
    );
}

export default TodoApp;