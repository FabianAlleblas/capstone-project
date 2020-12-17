import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ArrowIcon, DeleteIcon, EditIcon, LogoutIcon } from '../Icons'

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
  secondaryStyle: PropTypes.bool,
  showBackButton: PropTypes.bool,
  showEditButton: PropTypes.bool,
  showLogoutButton: PropTypes.bool,
  showDeleteButton: PropTypes.bool,
  onClickArrow: PropTypes.func,
  onClickEdit: PropTypes.func,
  onClickLogout: PropTypes.func,
  onClickDelete: PropTypes.func,
}

export default function Header({
  className,
  children,
  secondaryStyle,
  showBackButton,
  showLogoutButton,
  onClickArrow,
  onClickEdit,
  onClickLogout,
  onClickDelete,
  showEditButton,
  showDeleteButton,
}) {
  return (
    <HeaderStyled className={className}>
      <HeadingContainer secondaryStyle={secondaryStyle}>
        {showBackButton && (
          <IconButton onClick={onClickArrow}>
            <ArrowIconStyled data-testid="arrow-icon" />
          </IconButton>
        )}
        <Heading>{children}</Heading>
      </HeadingContainer>
      {showEditButton && (
        <IconButton onClick={onClickEdit}>
          <EditIconStyled data-testid="edit-icon" />
        </IconButton>
      )}
      {showLogoutButton && (
        <IconButton onClick={onClickLogout}>
          <LogoutIconStyled onClick={onClickLogout} data-testid="logout-icon" />
        </IconButton>
      )}
      {showDeleteButton && (
        <IconButton onClick={onClickDelete}>
          <DeleteIconStyled onClick={onClickLogout} data-testid="delete-icon" />
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

const DeleteIconStyled = styled(DeleteIcon)`
  margin-right: 14px;
`

const IconButton = styled.button`
  background-color: transparent;
  border: none;
`
