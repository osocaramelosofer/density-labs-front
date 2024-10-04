import { Input, Textarea, Tooltip } from '@nextui-org/react'
import { commentApi } from 'api'
import { useCommentContext } from 'hooks/useCommentContext'
import { IoSend } from 'react-icons/io5'

export default function CommentForm() {
  const { addComment } = useCommentContext()

  const handleForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const email = (formData.get('email') as FormDataEntryValue as string) ?? ''
    const comment =
      (formData.get('comment') as FormDataEntryValue as string) ?? ''

    if (email === '' && comment === '') {
      alert('you must enter an email and your comment')
      return
    }

    const commentCreated = await commentApi.postComment(email, comment)
    if (commentCreated) {
      addComment(commentCreated)
      alert(`todo created successfully`)
      form.reset()
    }
  }

  return (
    <div className="mt-10 min-w-[300px] rounded-md">
      <form onSubmit={handleForm}>
        <Input
          type="email"
          label="Email"
          id="email"
          name="email"
          labelPlacement="outside"
          required
        />

        <Textarea
          id="comment"
          name="comment"
          label="Comment:"
          labelPlacement="outside"
          placeholder="Enter your comment here"
          required
        />

        <div className="mr-2 mt-2 flex justify-end">
          <Tooltip content="Create comment">
            <button type="submit">
              <IoSend size={15} className="text-sky-600" />
            </button>
          </Tooltip>
        </div>
      </form>
    </div>
  )
}
