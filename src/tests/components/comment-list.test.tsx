import { render, screen, fireEvent } from '@testing-library/react'
import { CommentList } from 'components/comment-list'
import { vi } from 'vitest'
import { CommentContext } from 'context/comment-context'

// Mocks
const mockComments = [
  {
    id: '1',
    comment: 'First comment',
    email: 'test1@example.com',
    editing: false
  },
  {
    id: '2',
    comment: 'Second comment',
    email: 'test2@example.com',
    editing: false
  }
]

const updateCommentMock = vi.fn()

const renderWithProvider = (comments: typeof mockComments) => {
  return render(
    <CommentContext.Provider value={{ updateComment: updateCommentMock }}>
      <CommentList comments={comments} />
    </CommentContext.Provider>
  )
}

describe('<CommentList />', () => {
  it('should render the list of comments', () => {
    renderWithProvider(mockComments)

    expect(screen.getByText('First comment')).toBeInTheDocument()
    expect(screen.getByText('Second comment')).toBeInTheDocument()
  })

  it('should show "no comments yet" when no comments are provided', () => {
    renderWithProvider([])

    expect(screen.getByText('no comments yet')).toBeInTheDocument()
  })

  it('should toggle editing state when enableEditing is called', () => {
    renderWithProvider(mockComments)

    const editButton = screen.getAllByText(/edit/i)[0]

    fireEvent.click(editButton)

    const commentInput = screen.getByDisplayValue('First comment')
    expect(commentInput).toBeInTheDocument()
  })
})
