import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import { ReactComponent as AppLogo } from '../../assets/logos/urbanplantslogo.svg'
import LoginForm from '../../Components/Forms/LoginForm'
import ErrorModal from '../../Components/Modals/ErrorModal'

LoginPage.propTypes = {
  userRegistration: PropTypes.func.isRequired,
  userLogin: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  setUserData: PropTypes.func.isRequired,
}

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
        <ErrorModalFixed closeErrorModal={setUserData}>
          {userData.error}
        </ErrorModalFixed>
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

const ErrorModalFixed = styled(ErrorModal)`
  height: 100vh;
  left: 0;
  position: absolute;
  top: 0;
`
