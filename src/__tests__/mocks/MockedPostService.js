const MockedPostService = (id) => {
  const successPostService = Promise.resolve(() => ({ data: { id } }))

  return { successPostService }
}

export default MockedPostService;