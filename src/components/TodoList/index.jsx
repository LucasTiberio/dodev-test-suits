import React from 'react'
import postService from '../../services/PostService'

const TodoList = ({ initialValue = [] }) => {
  const [todoList, setTodoList] = React.useState(initialValue);
  const [newTodoValue, setNewTodoValue] = React.useState('');

  const handleNewTodoItemInputChange = (evt) => {
    setNewTodoValue(evt.target.value);
  }

  const handleAddNewTodoItem = async () => {
    setTodoList([...todoList, newTodoValue])
    setNewTodoValue('')

    await postService(12345)
  }

  const handleClearTodoList = () => {
    setTodoList([])
  }

  return (
    <div>
      <input data-testid="test-input" onChange={handleNewTodoItemInputChange} value={newTodoValue} />
      <button data-testid="test-button" onClick={handleAddNewTodoItem}>Adicionar</button>
      <button data-testid="test-button-clear" onClick={handleClearTodoList}>Limpar</button>

      <div>
        <ul data-testid="test-ul">
          {todoList.map(todoItem => <li key={todoItem}>{todoItem}</li>)}
        </ul>
      </div>
    </div>
  )
}

export default TodoList;