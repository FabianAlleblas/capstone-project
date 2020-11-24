import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function FormButton({ secondary, children, onClick }) {
  FormButton.propTypes = {
    secondary: PropTypes.bool,
    children: PropTypes.string,
    onClick: PropTypes.func,
  }

  return secondary ? (
    <SecondaryButton type="button" onClick={onClick}>
      {children}
    </SecondaryButton>
  ) : (
    <PrimaryButton>{children}</PrimaryButton>
  )
}

const PrimaryButton = styled.button`
  background-color: var(--primary-dark);
  border-radius: 22px;
  border: none;
  box-shadow: 0 0 4px var(--shadow);
  color: var(--primary-light);
  font-family: 'Josefin sans';
  font-size: 1.25rem;
  font-weight: 700;
  padding: 12px 16px 8px;
  width: 100%;
`

const SecondaryButton = styled.button`
  background-color: var(--primary-light);
  border-radius: 22px;
  border: 4px solid var(--primary-dark);
  box-shadow: 0 0 4px var(--shadow);
  color: var(--primary-dark);
  font-family: 'Josefin sans';
  font-size: 1.25rem;
  font-weight: 700;
  padding: 8px 12px 4px;
  width: 100%;
`
