import { Provider } from "react-redux"
import store from "./redux/store"

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./components/appRouter/appRouter"

function App() {

    return (
        <div className="App">
            <Provider store={store}>
                <ToastContainer position="top-center" autoClose={3000} />
                <AppRouter/>
            </Provider>
        </div>
    )
}

export default App
