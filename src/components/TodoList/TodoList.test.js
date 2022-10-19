import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { useMockedState } from '../../__tests__/mocks/useMockedState'
import TodoList from './index'

const mockedInitialTodoList = ['escovar os dentes', 'tomar café da manha']
const mockedNewTodoItemName = 'teste do teste'

const writeItemNameInput = (itemName) => {
  const inputItem = screen.getByTestId('test-input')

  fireEvent.change(inputItem, { target: { value: itemName } })
}

const fireButtonAddItem = () => {
  const buttonItem = screen.getByTestId('test-button')
  fireEvent.click(buttonItem);
}

it('should render todo list', () => {
  render(<TodoList />);
  const ulItem = screen.getByTestId('test-ul')
  const inputItem = screen.getByTestId('test-input')
  const buttonItem = screen.getByTestId('test-button')
  const buttonItemClear = screen.getByTestId('test-button-clear')

  expect(ulItem).toBeInTheDocument()
  expect(inputItem).toBeInTheDocument()
  expect(buttonItem).toBeInTheDocument()
  expect(buttonItemClear).toBeInTheDocument()
})

describe('todolist actions', () => {
  it('should add a todo item', () => {
    render(<TodoList />);

    writeItemNameInput(mockedNewTodoItemName);
    fireButtonAddItem();

    const newItemByText = screen.queryByText(mockedNewTodoItemName);
    expect(newItemByText).toBeInTheDocument();
  })

  it('should clear todo list', () => {
    render(<TodoList initialValue={mockedInitialTodoList} />);
    const elementButtonClear = screen.getByTestId('test-button-clear')

    fireEvent.click(elementButtonClear);

    mockedInitialTodoList.forEach(todoItem => {
      const elementByText = screen.queryByText(todoItem);
      expect(elementByText).not.toBeInTheDocument();
    })
  })

  it('should load todo list with initial value', () => {
    render(<TodoList initialValue={mockedInitialTodoList} />);

    mockedInitialTodoList.forEach(todoItem => {
      const elementByText = screen.queryByText(todoItem);
      expect(elementByText).toBeInTheDocument();
    })
  })

  it('should add a todo item in state', () => {
    const {
      mockedUseState: mockedUseStateTodoList,
      setState: setStateTodoList
    } = useMockedState();

    const {
      mockedUseState: mockedUseStateNewTodoValue,
    } = useMockedState();


    React.useState = jest.fn()
      .mockImplementationOnce(mockedUseStateTodoList)
      .mockImplementationOnce(mockedUseStateNewTodoValue);

    render(<TodoList />);

    writeItemNameInput(mockedNewTodoItemName);
    fireButtonAddItem();

    expect(setStateTodoList).toHaveBeenCalledTimes(1);
  })
})