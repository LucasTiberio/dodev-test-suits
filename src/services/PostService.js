import axios from 'axios'

const postService = async (postId) => {
  try {
    const { data } = await axios.post(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)

    if (!data) throw new Error('no data')
    return data
  } catch (error) {
    return { error: true }
  }
}

export default postService;