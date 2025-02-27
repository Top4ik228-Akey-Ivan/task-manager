import { Provider } from "react-redux"
import CardsList from "./components/cardsList/cardsList"
import store from "./redux/store"
import Navbar from "./components/navbar/navbar"
import { useState } from "react"

function App() {

    const [activeSection, setActiveSection] = useState('All')

    return (
        <div className="App">
            <Provider store={store}>

                <Navbar
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />
                <CardsList
                    activeSection={activeSection}
                />

            </Provider>
        </div>
    )
}

export default App
