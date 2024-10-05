
const TodoListNew = (props) => {
    const { addNewToDo } = props;

    const handleOnChange = (name) => {
        console.log('>>> handleOnChange : ' + name);
    }

    const handleOnClick = () => {
        console.log('>>> handleOnclick run...');
    }

    return (
        <div className='todo-new'>
            <input type="text"
                placeholder='Enter your task'
                onChange={(event) => handleOnChange(event.target.value)} />
            <button onClick={() => handleOnClick()}>Add</button>
        </div>
    )
}

export default TodoListNew;