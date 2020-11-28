import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrowicon.svg'

export default function Header({
  className,
  children,
  secondaryStyle,
  hasArrow,
  onClick,
}) {
  Header.propTypes = {
    className: PropTypes.string,
    children: PropTypes.string.isRequired,
    secondaryStyle: PropTypes.bool,
    hasArrow: PropTypes.bool,
    onClick: PropTypes.func,
  }

  return (
    <HeaderStyled className={className}>
      <HeadingContainer secondaryStyle={secondaryStyle}>
        {hasArrow && <ArrowIcon onClick={onClick} />}
        <Heading>{children}</Heading>
      </HeadingContainer>
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header``

const HeadingContainer = styled.div`
  align-items: baseline;
  background: var(--primary-dark);
  border-radius: 0 0 50px 0;
  box-shadow: ${(props) =>
    props.secondaryStyle ? '' : '0 0 4px var(--shadow)'};
  display: inline-flex;
  padding: 20px 30px 13px 20px;

  svg {
    margin-right: 12px;
  }
`

const Heading = styled.h1`
  color: var(--primary-light);
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
`
