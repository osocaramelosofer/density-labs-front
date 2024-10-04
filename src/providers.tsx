import { NextUIProvider } from '@nextui-org/react'
import { CommentProvider } from 'context/comment-context'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <CommentProvider>{children}</CommentProvider>
    </NextUIProvider>
  )
}
