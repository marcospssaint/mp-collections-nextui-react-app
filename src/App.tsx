import { NextUIProvider } from "@nextui-org/react";

import './App.css';
import { MidiaPage } from "./component/pages/MidiaPage";

function App() {
    return (
        <NextUIProvider>
            <div className="relative flex flex-col">
                <MidiaPage />
            </div>
        </NextUIProvider>
    )
}

export default App