import styled from 'styled-components/macro'
import { ReactComponent as AppLogo } from '../../assets/logos/urbanplantslogo.svg'
import LoadingSpinner from '../../Components/LoadingSpinner/LoadingSpinner'

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
