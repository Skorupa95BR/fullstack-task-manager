import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";

const API_URL = process.env.REACT_APP_API_URL || 'https://task-manager-api-ccfp.onrender.com';

function App() {
    // Wake-up: acorda o backend no Render ao abrir o site
    useEffect(() => {
        fetch($/ping).catch(() => {});
    }, []);

    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
}

export default App;
