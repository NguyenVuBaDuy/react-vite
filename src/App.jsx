import TodoListNew from './components/todo/TodoListNew'
import TodoListData from './components/todo/TodoListData'
import './components/todo/todo.css'
import reactLogo from './assets/react.svg'
import { useState } from 'react'
import Header from './components/layout/header'
import Footer from './components/layout/footer'
import { Outlet } from 'react-router-dom'

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

  const deleteToDo = (id) => {
    var newTodo = todoList.filter(todo => todo.id !== id)
    setTodoList(newTodo);
  }

  return (
    <>
      <Header />
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
      <Outlet />
      <Footer />
    </>
  )
}

export default App
