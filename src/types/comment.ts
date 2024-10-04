export interface IComment {
  id: string
  email: string
  comment: string
}
export type CommentPost = Omit<Comment, 'id'>

export interface EditableComment extends IComment {
  editing: boolean
}
