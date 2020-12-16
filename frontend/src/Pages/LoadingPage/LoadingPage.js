import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'
import { ReactComponent as AppLogo } from '../../assets/logos/urbanplantslogo.svg'
import styled from 'styled-components/macro'

export default function LoginPage() {
  return (
    <PageWrapper>
      <AppLogo />
      <LoadingSpinner />
    </PageWrapper>
  )
}

const PageWrapper = styled.section`
  background-color: var(--primary-dark);
  display: grid;
  height: 100vh;
  place-items: center;
`
