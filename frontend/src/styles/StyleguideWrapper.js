import React from 'react'
import styled from 'styled-components/macro'
import GlobalStyle from './GlobalStyle'

export default function StyleguideWrapper({ children }) {
  return (
    <Wrapper>
      <GlobalStyle />
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 370px;
`
