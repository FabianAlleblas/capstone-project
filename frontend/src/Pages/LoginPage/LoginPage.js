import LoginForm from '../../Components/Forms/LoginForm'
import { ReactComponent as AppLogo } from '../../assets/icons/urbanplantslogo.svg'
import styled from 'styled-components/macro'
import ErrorModal from '../../Components/Modals/ErrorModal'

export default function LoginPage({
  userRegistration,
  userLogin,
  userData,
  setUserData,
}) {
  return (
    <PageWrapper>
      <AppLogo />
      <LoginForm userRegistration={userRegistration} userLogin={userLogin} />
      {userData?.error && (
        <ErrorModal setUserData={setUserData}>{userData.error}</ErrorModal>
      )}
    </PageWrapper>
  )
}

const PageWrapper = styled.section`
  background-color: var(--primary-dark);
  display: grid;
  height: 100vh;
  padding: 30px;
  place-items: center;
`
