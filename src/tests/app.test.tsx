import { render, screen } from '@testing-library/react'

import App from 'components/App'
import { Providers } from 'providers'

describe('<App />', () => {
  it('should render the App with the providers', () => {
    const { container } = render(
      <Providers>
        <App />
      </Providers>
    )

    expect(
      screen.getByRole('heading', {
        name: /leave comments/i,
        level: 1
      })
    ).toBeInTheDocument()

    expect(screen.getByText(/comment list/i)).toBeInTheDocument()

    expect(container.firstChild).toBeInTheDocument()
  })
})
