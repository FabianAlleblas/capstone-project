import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as ArrowIcon } from '../../assets/icons/arrowicon.svg'
import { ReactComponent as EditIcon } from '../../assets/icons/editicon.svg'
import { ReactComponent as LogoutIcon } from '../../assets/icons/logouticon.svg'

export default function Header({
  className,
  children,
  secondaryStyle,
  isDetailPage,
  isPlantList,
  onClickArrow,
  onClickEdit,
  onClickLogout,
}) {
  Header.propTypes = {
    className: PropTypes.string,
    children: PropTypes.string.isRequired,
    secondaryStyle: PropTypes.bool,
    isDetailPage: PropTypes.bool,
    isPlantList: PropTypes.bool,
    onClickArrow: PropTypes.func,
    onClickEdit: PropTypes.func,
    onClickLogout: PropTypes.func,
  }

  return (
    <HeaderStyled className={className}>
      <HeadingContainer secondaryStyle={secondaryStyle}>
        {isDetailPage && <ArrowIcon onClick={onClickArrow} />}
        <Heading>{children}</Heading>
      </HeadingContainer>
      {isDetailPage && <EditIconStyled onClick={onClickEdit} />}
      {isPlantList && <LogoutIconStyled onClick={onClickLogout} />}
    </HeaderStyled>
  )
}

const HeaderStyled = styled.header`
  display: flex;
  width: 100%;
  justify-content: space-between;
  z-index: 10;
`

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
const EditIconStyled = styled(EditIcon)`
  margin: 14px 14px 0 0;
`

const LogoutIconStyled = styled(LogoutIcon)`
  margin: 14px 14px 0 0;
`
