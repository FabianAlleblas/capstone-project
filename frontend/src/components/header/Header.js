import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function Header({ className, text, isSecondary }) {
  Header.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string.isRequired,
    isSecondary: PropTypes.bool,
  }

  return (
    <HeaderStyled className={className}>
      <HeadingContainer isSecondary={isSecondary}>
        <Heading isSecondary={isSecondary}>{text}</Heading>
      </HeadingContainer>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  display: flex;
`

const HeadingContainer = styled.div`
  background: ${(props) =>
    props.isSecondary ? 'var(--primary-light)' : 'var(--primary-dark)'};
  border-radius: 0 0 50px 0;
  box-shadow: 0 0 4px var(--shadow);
  padding: 20px 30px 13px 20px;
`

const Heading = styled.h1`
  color: ${(props) =>
    props.isSecondary ? 'var(--primary-dark)' : 'var(--primary-light)'};
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
`
