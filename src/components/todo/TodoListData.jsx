
const TodoListData = (props) => {
    const { name, age, data } = props;
    return (
        <div className='todo-list'>
            <div>My name is {name}</div>
            <div>Learning React</div>
            <div>Hoi Dan IT</div>
        </div>
    )
}

export default TodoListData;