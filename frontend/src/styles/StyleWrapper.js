import React from 'react'
import GlobalStyle from './GlobalStyle'

export default function StyleWrapper({ children }) {
  return (
    <div>
      <GlobalStyle />
      {children}
    </div>
  )
}
