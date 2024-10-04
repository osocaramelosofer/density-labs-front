import { useState } from 'react'
import { IComment } from 'types/comment'
import { createContext } from 'react'
import { commentApi } from 'api'

interface ICommentContext {
  comments: IComment[]
  setComments: (comments: IComment[]) => void
  handleDelete: (id: string) => void
  updateComment: (comment: IComment) => void
  addComment: (comment: IComment) => void
}
export const CommentContext = createContext<ICommentContext | null>(null)

export function CommentProvider({ children }: { children: React.ReactNode }) {
  const [comments, setComments] = useState<IComment[]>([])

  const handleDelete = async (id: string) => {
    const { success, message } = await commentApi.deleteComment(id)
    if (!success) alert('We could not delete the todo, try later')

    const newComments = comments.filter((comment) => comment.id !== id)
    setComments(newComments)
    alert(message)
  }

  const updateComment = async (comment: IComment) => {
    const updatedComment = await commentApi.updateComment(comment)
    if (updatedComment) {
      const newComments = comments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
      setComments(newComments)
      alert('comment updated successfully')
    }
  }

  const addComment = (comment: IComment) => {
    setComments((prevComments) => {
      return [...prevComments, comment]
    })
  }

  return (
    <CommentContext.Provider
      value={{ comments, setComments, handleDelete, updateComment, addComment }}
    >
      {children}
    </CommentContext.Provider>
  )
}
