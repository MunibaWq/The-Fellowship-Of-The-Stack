import ProductItem from "./components/ProductItem/ProductItem";
import { ThemeProvider } from "styled-components";
import Theme from "./toolbox/constants";

function App() {
    return (
        <ThemeProvider theme={Theme}>
            <ProductItem />
        </ThemeProvider>
    );
}

export default App;
