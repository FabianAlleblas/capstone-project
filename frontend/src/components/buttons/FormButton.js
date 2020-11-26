import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function FormButton({ secondaryStyle, children, onClick }) {
  FormButton.propTypes = {
    secondaryStyle: PropTypes.bool,
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  }

  return secondaryStyle ? (
    <SecondaryButton type="button" onClick={onClick}>
      {children}
    </SecondaryButton>
  ) : (
    <PrimaryButton onClick={onClick}>{children}</PrimaryButton>
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
