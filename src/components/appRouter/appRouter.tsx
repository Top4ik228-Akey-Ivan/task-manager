import { Route, Routes, HashRouter as Router} from "react-router";
import HelloPage from "../../pages/helloPage/helloPage";
import BoardPage from "../../pages/boardPage/boardPage";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HelloPage/>}/>
                <Route path="/boards/:id" element={<BoardPage/>}/>
            </Routes>
        </Router>
    );
}
 
export default AppRouter;