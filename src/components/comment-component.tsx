import { Textarea, Tooltip } from '@nextui-org/react'
import { useCommentContext } from 'hooks/useCommentContext'
import { IoSend } from 'react-icons/io5'
import { EditableComment, IComment } from 'types/comment'

interface CommentComponentProps {
  editingComment: (value: string, id: string) => void
  enableEditing: (id: string) => void
  updateComment: (comment: IComment) => void
  currentComment: EditableComment
}

export function CommentComponent({
  editingComment,
  enableEditing,
  updateComment,
  currentComment
}: CommentComponentProps) {
  const { id, email, editing, comment } = currentComment
  const { handleDelete } = useCommentContext()
  return (
    <li className="mb-2 flex w-full gap-2">
      <div className="w-full">
        <Textarea
          label={email}
          isDisabled={!editing}
          variant="flat"
          labelPlacement="inside"
          value={comment}
          onValueChange={(value) => editingComment(value, id)}
        />
        <div className="ml-2 flex items-center gap-2 pt-1">
          <Tooltip content="Delete the comment">
            <span
              onClick={() => handleDelete(id)}
              className="m-0 flex items-center border-b-2 border-transparent p-0 text-[10px] font-bold text-stone-500 hover:cursor-pointer hover:border-stone-500"
            >
              delete
            </span>
          </Tooltip>
          <Tooltip content="Enable the edition of the comment">
            <span
              onClick={() => enableEditing(id)}
              className="m-0 flex items-center border-b-2 border-transparent p-0 text-[10px] font-bold text-stone-500 hover:cursor-pointer hover:border-stone-500"
            >
              edit
            </span>
          </Tooltip>
          <div className="mr-2 flex w-full justify-end">
            <Tooltip content="update comment">
              <button
                className={`${editing ? 'block' : 'hidden'} `}
                onClick={() => updateComment({ id, email, comment })}
              >
                <IoSend size={15} className="text-sky-600" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </li>
  )
}
