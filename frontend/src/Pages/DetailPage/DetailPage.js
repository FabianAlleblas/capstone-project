import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import Button from '../../Components/Buttons/Button'
import Header from '../../Components/Header/Header'
import PlantDetailBar from '../../Components/IndicatorBars/PlantDetailBar'
import SettingCareIntervalModal from '../../Components/Modals/SettingCareIntervalModal'
import PlantDetails from '../../Components/PlantDetails/PlantDetails'

export default function DetailPage({
  plantList,
  resetTimer,
  updateCareInterval,
}) {
  const [showCareSetting, setShowCareSetting] = useState()
  const history = useHistory()
  const query = useQuery()
  const plant = plantById(useQuery)

  if (!plant) {
    return <div>Plant not found!</div>
  }

  return (
    <>
      <FixedHeader
        showBackButton
        showEditButton
        onClickArrow={openPlantList}
        onClickEdit={openEditPage}
      >
        {plant?.name}
      </FixedHeader>
      <CardWrapper>
        <PlantDetails plant={plant} />
        <PlantDetailBar plant={plant} setShowCareSetting={setShowCareSetting} />
        {showCareSetting && (
          <ModalStyled
            isFertilizer={showCareSetting === 'fertilizer' ? true : false}
            setShowCareSetting={setShowCareSetting}
            updateCareInterval={updateCareInterval}
            plantId={plant.id}
          />
        )}
        <ButtonWrapper>
          <ResetButton onClick={() => resetTimer(plant.id, 'water')}>
            Watered
          </ResetButton>
          <ResetButton onClick={() => resetTimer(plant.id, 'fertilizer')}>
            Fertilized
          </ResetButton>
        </ButtonWrapper>
      </CardWrapper>
    </>
  )

  function useQuery() {
    return new URLSearchParams(useLocation().search)
  }

  function plantById() {
    const plantId = parseInt(query.get('id'))
    const plant = plantList.find((plant) => plant.id === plantId)

    return plant
  }

  function openPlantList() {
    history.push('/')
  }

  function openEditPage() {
    history.push(`/edit-plant?id=${plant.id}`)
  }
}

const FixedHeader = styled(Header)`
  left: 0;
  position: fixed;
  top: 0;
`

const CardWrapper = styled.section`
  display: grid;
  gap: 30px;
  padding: 100px 30px 0;
  place-items: center;
`

const ModalStyled = styled(SettingCareIntervalModal)`
  position: absolute;
  top: 0;
  left: 0;
`

const ButtonWrapper = styled.div`
  display: grid;
  gap: 20px;
  grid-template-columns: 1fr 1fr;
  padding: 20px 0 0;
  width: 100%;
`

const ResetButton = styled(Button)`
  background-color: var(--primary-dark);
  color: var(--primary-light);
`
