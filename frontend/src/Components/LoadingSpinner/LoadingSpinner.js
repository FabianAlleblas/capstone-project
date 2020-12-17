import styled from 'styled-components'

export default function LoadingSpinner() {
  return (
    <Wrapper>
      <StyledSpinner viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </StyledSpinner>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 200px;
`

const StyledSpinner = styled.svg`
  animation: rotate 2s linear infinite;
  height: 100px;
  width: 100px;

  & .path {
    animation: dash 1.5s ease-in-out infinite;
    stroke-linecap: round;
    stroke: var(--primary-light);
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -35;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -124;
    }
  }
`
