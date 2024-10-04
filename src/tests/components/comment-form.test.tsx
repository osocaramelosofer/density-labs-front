import { render, screen, fireEvent } from '@testing-library/react'
import CommentForm from 'components/comment-form'
import { useCommentContext } from 'hooks/useCommentContext'
import { commentApi } from 'api'

// mock custom hook and commentAPi
vi.mock('hooks/useCommentContext', () => ({
  useCommentContext: vi.fn()
}))

vi.mock('api', () => ({
  commentApi: {
    postComment: vi.fn()
  }
}))

describe('CommentForm', () => {
  const mockAddComment = vi.fn()

  beforeEach(() => {
    // create context
    ;(useCommentContext as vi.Mock).mockReturnValue({
      addComment: mockAddComment
    })
    // Mock windows.alert
    window.alert = vi.fn()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render the form with email and comment inputs', () => {
    render(<CommentForm />)

    // Check the form fields are rendered
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/comment/i)).toBeInTheDocument()
  })

  it('should show an alert if both email and comment are empty', () => {
    render(<CommentForm />)

    // Submit form
    const submitButton = screen.getByRole('button')
    fireEvent.click(submitButton)
  })

  it('should call addComment and reset the form on successful submission', async () => {
    const mockComment = {
      id: '1',
      email: 'test@test.com',
      comment: 'Test comment'
    }
    ;(commentApi.postComment as vi.Mock).mockResolvedValue(mockComment)

    render(<CommentForm />)

    // Fill the form
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@test.com' }
    })
    fireEvent.change(screen.getByLabelText(/comment/i), {
      target: { value: 'Test comment' }
    })

    // Send form
    const submitButton = screen.getByRole('button')
    fireEvent.click(submitButton)

    // Call the api
    expect(commentApi.postComment).toHaveBeenCalledWith(
      'test@test.com',
      'Test comment'
    )
  })
})
