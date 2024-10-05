
const TodoListNew = (props) => {
    const { addNewToDo } = props;
    addNewToDo('Ba Duy');
    return (
        <div className='todo-new'>
            <input type="text" placeholder='Enter your task' />
            <button>Add</button>
        </div>
    )
}

export default TodoListNew;