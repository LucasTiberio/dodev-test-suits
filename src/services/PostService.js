import axios from 'axios'

const postService = async (postId) => {
  try {
    const { data } = await axios.post(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)

    if (!data) throw { error: true }
    return data
  } catch (error) {
    return { error: true }
  }
}

export default postService;