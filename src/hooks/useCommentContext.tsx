import { CommentContext } from 'context/comment-context'
import { useContext } from 'react'

export const useCommentContext = () => {
  const context = useContext(CommentContext)

  if (!context) {
    throw new Error('useCommentContext must be used within a CommentProvider')
  }

  return context
}
