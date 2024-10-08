import { useState } from "react";

const TodoListNew = (props) => {

    const { addNewToDo } = props;

    //useState hook
    const [valueInput, setValueInput] = useState('');

    const handleOnChange = (name) => {
        setValueInput(name);
    }

    const handleOnClick = () => {
        addNewToDo(valueInput);
        setValueInput('');
    }

    return (
        <div className='todo-new'>
            <input type="text"
                placeholder='Enter your task'
                onChange={(event) => handleOnChange(event.target.value)}
                value={valueInput} />
            <button className="btn" onClick={() => handleOnClick()}>Add</button>
            <span>
                My text input = {valueInput}
            </span>
        </div>
    )
}

export default TodoListNew;