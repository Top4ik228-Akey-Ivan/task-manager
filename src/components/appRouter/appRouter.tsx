import { BrowserRouter, Route, Routes } from "react-router";
import HelloPage from "../../pages/helloPage/helloPage";
import BoardPage from "../../pages/boardPage/boardPage";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HelloPage/>}/>
                <Route path="/board" element={<BoardPage/>}/>
            </Routes>
        </BrowserRouter>
    );
}
 
export default AppRouter;