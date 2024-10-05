import './components/todo/todo.css'
import TodoListNew from './components/todo/TodoListNew'
import TodoListData from './components/todo/TodoListData'
import reactLogo from './assets/react.svg'
import { useState } from 'react'

const App = () => {

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
        <TodoListData todoList={todoList} />

        :
        <div>
          <img src={reactLogo} className='todo-image logo' />
        </div>
      }

    </div>
  )
}

export default App
