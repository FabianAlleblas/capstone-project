import LoginForm from '../../Components/Forms/LoginForm'
import { ReactComponent as AppLogo } from '../../Assets/icons/urbanplantslogo.svg'
import styled from 'styled-components/macro'

export default function LoginPage({ userRegistration, userLogin }) {
  return (
    <PageWrapper>
      <AppLogo />
      <LoginForm userRegistration={userRegistration} userLogin={userLogin} />
    </PageWrapper>
  )
}

const PageWrapper = styled.section`
  background-color: var(--primary-dark);
  display: grid;
  height: 100vh;
  place-items: center;
`
