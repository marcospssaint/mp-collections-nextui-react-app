import { NextUIProvider } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

function App() {

    const navigate = useNavigate();

    return (
        <NextUIProvider navigate={navigate}>
            <div className="relative flex flex-col">
                Hello! M.P. Collections NextUi React App
            </div>
        </NextUIProvider>
    )
}

export default App