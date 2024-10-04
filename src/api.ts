import { IComment } from 'types/comment'

export const commentApi = {
  list: async (): Promise<IComment[] | []> => {
    try {
      const requestOptions: RequestInit = {
        method: 'GET',
        redirect: 'follow'
      }
      const response = await fetch(
        'http://localhost:3000/comment/list',
        requestOptions
      )
      if (!response.ok) return []

      const json = await response.json()
      const { data } = json

      return data as IComment[]
    } catch (error) {
      console.error({ error })
      return []
    }
  },
  postComment: async (
    email: string,
    comment: string
  ): Promise<IComment | null> => {
    try {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const raw = JSON.stringify({ email, comment })

      const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      const res = await fetch(
        'http://localhost:3000/comment/post',
        requestOptions
      )

      if (!res.ok) return null
      const { data } = await res.json()
      return data as IComment
    } catch (error) {
      return null
    }
  },
  deleteComment: async (
    commentId: string
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const requestOptions: RequestInit = {
        method: 'DELETE',
        redirect: 'follow'
      }

      const res = await fetch(
        `http://localhost:3000/comment/delete?id=${commentId}`,
        requestOptions
      )
      if (!res.ok) {
        return {
          success: false,
          message: 'Something went wrong deleting the todo'
        }
      }
      const { data } = await res.json()
      console.log(data)
      return { ...data }
    } catch (error) {
      return {
        success: false,
        message: 'Something went wrong deleting the todo'
      }
    }
  },
  updateComment: async (comment: IComment): Promise<IComment | null> => {
    try {
      const myHeaders = new Headers()
      myHeaders.append('Content-Type', 'application/json')

      const raw = JSON.stringify({ ...comment })

      const requestOptions: RequestInit = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      }

      const res = await fetch(
        'http://localhost:3000/comment/put',
        requestOptions
      )

      if (!res.ok) return null

      const { data } = await res.json()
      return data
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
