
const TodoListData = (props) => {
    const { todoList } = props;
    return (
        <div className='todo-list'>
            {todoList.map((item, index) => {
                return (
                    <div className="todo-item" key={item.data}>
                        <div>{item.name}</div>
                        <button className="btn">Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default TodoListData;