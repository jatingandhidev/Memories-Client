import axios from 'axios'

const API = axios.create({
  baseURL: 'https://mern-memories-server-wqsz.onrender.com',
})

//adding this to each req
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    if (JSON.parse(localStorage.getItem('profile')).result._id) {
      req.headers.Authorization = `Custom ${
        JSON.parse(localStorage.getItem('profile')).token
      }`
    } else {
      req.headers.Authorization = `Google ${
        JSON.parse(localStorage.getItem('profile')).token
      }`
    }
  }

  return req
})

export const fetchPosts = (page) => API.get(`/posts?page=${page}`)
export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPostsBySearch = (searchQuery) =>
  API.get(
    `/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${
      searchQuery.tags
    }`
  )
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const comment = (value, id) =>
  API.post(`/posts/${id}/commentPost`, { value })

export const signin = (formData) => API.post(`/user/signin`, formData)
export const signup = (formData) => API.post(`/user/signup`, formData)
