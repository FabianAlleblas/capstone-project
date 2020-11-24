import styled from 'styled-components/macro'
import { ReactComponent as PlusIcon } from '../../assets/icons/plusicon.svg'

export default function AddButton() {
  return (
    <Button>
      <PlusIcon />
    </Button>
  )
}

const Button = styled.button`
  background-color: var(--primary-dark);
  border: none;
  border-radius: 50%;
  padding: 13px 14px;
  box-shadow: 0 0 4px var(--shadow);
`
