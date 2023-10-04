"use client";

import { Provider } from 'jotai'

export default function Providers({ children }: React.PropsWithChildren) {
  return (
    <Provider>
      {children}
    </Provider>
  )
}
