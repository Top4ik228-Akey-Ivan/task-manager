import { Provider } from "react-redux"
import store from "./redux/store"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./components/appRouter/appRouter"
import { ThemeProvider } from "./context/themeContext/themeProvider";
import ThemeSwitcher from "./components/themeSwitcher/themeSwitcher";

function App() {

    return (
        <div className="App">
            <ThemeProvider>
                <Provider store={store}>
                    <ToastContainer position="top-center" autoClose={3000} />
                    <ThemeSwitcher/>
                    <AppRouter />
                </Provider>
            </ThemeProvider>
        </div>
    )
}

export default App
