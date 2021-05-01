import { useState } from "react"

function Todo() {
    const [todos, setTodos] = useState([])
    const [input, setInput] = useState('')

    const handleChange = (e) => {
        const { value } = e.target
        setInput(value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let newTodo = [...todos, { value: input }]
        setTodos(newTodo)
    }

    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="text"
                    placeholder='add a todo.....'
                    onChange={handleChange}
                    value={input}
                />
                <button>add todo</button>
            </form>
            <div>
                todolist
            {todos.map((todo, index) => (
                <div key={index}>{todo.value}</div>
            ))}
            </div>
        </>
    )
}

export default Todo
