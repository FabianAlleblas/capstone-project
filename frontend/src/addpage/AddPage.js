import styled from 'styled-components/macro'
import AddPlantForm from '../components/forms/AddPlantForm'
import Header from '../components/header/Header'

export default function AddPage({ savePlantData }) {
  return (
    <>
      <FixedHeader text={'Add Plant'} />
      <AddPlantForm savePlantData={savePlantData} />
    </>
  )
}

const FixedHeader = styled(Header)`
  left: 0;
  position: fixed;
  top: 0;
`
