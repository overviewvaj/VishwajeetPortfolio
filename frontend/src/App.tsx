import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Studio from "./pages/Studio/Studio";


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/Studio"
                    element={<Studio />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;