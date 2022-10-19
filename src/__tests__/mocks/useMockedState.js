export const useMockedState = () => {
  const mockedSetState = jest.fn()

  const mockedUseState = state => [state, mockedSetState]

  return { setState: mockedSetState, mockedUseState }
}