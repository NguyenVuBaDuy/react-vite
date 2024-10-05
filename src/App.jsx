import './components/todo/todo.css'
import TodoListNew from './components/todo/TodoListNew'
import TodoListData from './components/todo/TodoListData'
import reactLogo from './assets/react.svg'
import { useState } from 'react'

const App = () => {

  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const [todoList, setTodoList] = useState([
    { id: 1, name: "Learning React" },
    { id: 2, name: "Hoi Dan IT" }
  ]);

  const name = "Nguyen Vu Ba Duy";
  const age = 19;
  const data = {
    address: "Binh Duong",
    country: "Viet Nam"
  }

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
      <TodoListData name={name} age={age} data={data} todoList={todoList} />
      <div>
        <img src={reactLogo} className='todo-image logo' />
      </div>
    </div>
  )
}

export default App
