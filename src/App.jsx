import './components/todo/todo.css'
import TodoListNew from './components/todo/TodoListNew'
import TodoListData from './components/todo/TodoListData'
import reactLogo from './assets/react.svg'

const App = () => {

  const name = "Nguyen Vu Ba Duy";
  const age = 19;
  const data = {
    address: "Binh Duong",
    country: "Viet Nam"
  }

  const addNewToDo = (name) => {
    alert(`call me ${name}`);
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo list</div>
      <TodoListNew addNewToDo={addNewToDo} />
      <TodoListData name={name} age={age} data={data} />
      <div>
        <img src={reactLogo} className='todo-image logo' />
      </div>
    </div>
  )
}

export default App
