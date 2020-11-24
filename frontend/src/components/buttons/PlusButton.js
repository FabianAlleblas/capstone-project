import styled from 'styled-components/macro'
import { ReactComponent as PlusIcon } from '../../assets/icons/plusicon.svg'

export default function PlusButton() {
  return (
    <Button>
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
