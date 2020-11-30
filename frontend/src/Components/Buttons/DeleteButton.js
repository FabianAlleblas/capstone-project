import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

export default function DeleteButton({ onClick, children }) {
  DeleteButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.string.isRequired,
  }
  return <Button onClick={onClick}>{children}</Button>
}

const Button = styled.button`
  background-color: var(--warning-color);
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
