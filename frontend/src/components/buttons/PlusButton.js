import styled from 'styled-components/macro'
import { ReactComponent as PlusIcon } from '../../assets/icons/plusicon.svg'
import PropTypes from 'prop-types'

export default function PlusButton({ onClick }) {
  PlusButton.propTypes = {
    onClick: PropTypes.func,
  }

  return (
    <Button onClick={onClick}>
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
