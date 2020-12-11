import { createGlobalStyle } from 'styled-components/macro'

export default createGlobalStyle`
:root {
    --primary-light: rgb(252,252,252);
    --primary-dark: rgb(110,217,171);
    --form-font-color: rgb(46,59,56);
    --input-font-color: rgb(183,189,187);
    --primary-plant-font-color: rgb(95,122,117);
    --secondary-plant-font-color: rgb(145,186,179);
    --warning-color: rgb(229,27,27);
    --bar-bg-color: rgb(229,229,229);
    --bar-water-color: rgb(27,108,229);
    --bar-fertilizer-color: rgb(255,199,89);
    --shadow: rgba(46,59,56, 0.5);
}

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

body {
    background-color: var(--primary-light);
    font-family: 'Josefin Sans', sans-serif;
    font-size: 112.5%;
}
// Thanks to chrome for this part
a:focus,
button:focus {
    outline: none;
};
`
