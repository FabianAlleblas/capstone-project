import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function Header({ className }) {
  Header.propType = {
    className: PropTypes.string,
  }

  return (
    <HeaderStyled className={className}>
      <HeadingContainer>
        <Heading>My Plants</Heading>
      </HeadingContainer>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  display: flex;
`

const HeadingContainer = styled.div`
  background: var(--primary-dark);
  padding: 20px 30px 13px 20px;
  border-radius: 0 0 50px 0;
  box-shadow: 0 0 4px var(--shadow);
`

const Heading = styled.h1`
  color: var(--primary-light);
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
`
