import { useState } from "react";

const TodoListNew = (props) => {

    //useState hook
    const [valueInput, setValueInput] = useState('');

    const handleOnChange = (name) => {
        setValueInput(name);
    }

    const handleOnClick = () => {
        console.log(valueInput);
    }

    return (
        <div className='todo-new'>
            <input type="text"
                placeholder='Enter your task'
                onChange={(event) => handleOnChange(event.target.value)} />
            <button onClick={() => handleOnClick()}>Add</button>
            <span>
                My text input = {valueInput}
            </span>
        </div>
    )
}

export default TodoListNew;