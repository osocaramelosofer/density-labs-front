import { useEffect, useState } from 'react'
import { EditableComment, IComment } from 'types/comment'
import { CommentComponent } from './comment-component'
import { useCommentContext } from 'hooks/useCommentContext'

interface CommentListProps {
  comments: IComment[]
}

export function CommentList({ comments }: CommentListProps) {
  const [editableComments, setEditableComments] = useState<EditableComment[]>(
    []
  )
  const { updateComment } = useCommentContext()
  const enableEditing = (id: string) => {
    const newComments = editableComments.map((comment) =>
      comment.id === id ? { ...comment, editing: !comment.editing } : comment
    )
    setEditableComments(newComments)
  }
  const editingComment = (value: string, id: string) => {
    setEditableComments(
      editableComments.map((comment) =>
        comment.id === id ? { ...comment, comment: value } : comment
      )
    )
  }

  useEffect(() => {
    const transformedComments: EditableComment[] = comments.map((comment) => ({
      ...comment,
      editing: false
    }))
    setEditableComments(transformedComments)
  }, [comments])

  return (
    <ul className="min-w-[300px] rounded-md">
      {editableComments && editableComments.length > 0 ? (
        editableComments.map((currentComment) => {
          return (
            <CommentComponent
              key={currentComment.id}
              editingComment={editingComment}
              enableEditing={enableEditing}
              updateComment={updateComment}
              currentComment={currentComment}
            />
          )
        })
      ) : (
        <div className="w-full text-center">
          <span>no comments yet</span>
        </div>
      )}
    </ul>
  )
}
