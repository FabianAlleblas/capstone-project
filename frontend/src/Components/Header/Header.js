import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as ArrowIcon } from '../../Assets/icons/arrowicon.svg'
import { ReactComponent as EditIcon } from '../../Assets/icons/editicon.svg'
import { ReactComponent as LogoutIcon } from '../../Assets/icons/logouticon.svg'

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
        {isDetailPage && (
          <IconButton onClick={onClickArrow}>
            <ArrowIconStyled data-testid="arrow-icon" />
          </IconButton>
        )}
        <Heading>{children}</Heading>
      </HeadingContainer>
      {isDetailPage && (
        <IconButton onClick={onClickEdit}>
          <EditIconStyled data-testid="edit-icon" />
        </IconButton>
      )}
      {isPlantList && (
        <IconButton onClick={onClickLogout}>
          <LogoutIconStyled onClick={onClickLogout} data-testid="logout-icon" />
        </IconButton>
      )}
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
`

const Heading = styled.h1`
  color: var(--primary-light);
  font-size: 1.75rem;
  font-weight: 700;
  line-height: 1;
`

const ArrowIconStyled = styled(ArrowIcon)`
  margin-right: 14px;
`

const EditIconStyled = styled(EditIcon)`
  margin-right: 14px;
`

const LogoutIconStyled = styled(LogoutIcon)`
  margin-right: 12px;
`

const IconButton = styled.button`
  background-color: transparent;
  border: none;
`
