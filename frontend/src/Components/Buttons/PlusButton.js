import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { PlusIcon } from '../Icons'

PlusButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
}

export default function PlusButton({ onClick, className }) {
  return (
    <Button onClick={onClick} className={className}>
      <PlusIcon />
    </Button>
  )
}

const Button = styled.button`
  background-color: var(--primary-dark);
  border-radius: 50%;
  border: none;
  box-shadow: 0 0 4px var(--shadow);
  padding: 13px 14px;
`
