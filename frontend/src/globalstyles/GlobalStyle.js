import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

body {
    font-family: sans-serif;
    font-size: 112.5%;
}

:root {
    --primary-light: #e6eded;
    --primary-dark: #2e3332;
    --primary-dark-transparent: #2e3332BF;
}`
