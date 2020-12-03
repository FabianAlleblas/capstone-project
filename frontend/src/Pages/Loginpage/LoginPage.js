import LoginForm from '../../Components/Forms/LoginForm'
import { ReactComponent as AppLogo } from '../../assets/icons/urbanplantslogo.svg'
import styled from 'styled-components/macro'

export default function LoginPage() {
  return (
    <PageWrapper>
      <AppLogo />
      <LoginForm />
    </PageWrapper>
  )
}

const PageWrapper = styled.section`
  background-color: var(--primary-dark);
  display: grid;
  height: 100vh;
  place-items: center;
`
