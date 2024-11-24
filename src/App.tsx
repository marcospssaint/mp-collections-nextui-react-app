import { Navbar, NavbarBrand, NavbarContent, NextUIProvider } from "@nextui-org/react";

import './App.css';
import { MidiaPage } from "./component/pages/MidiaPage";

function App() {

    return (
        <NextUIProvider>
            <div className="relative flex flex-col">
                <div className="flex flex-col">
                    <Navbar
                        isBordered isBlurred={false}>

                        <NavbarContent justify="start">
                            <NavbarBrand>
                                <p className="font-bold font-mono text-3xl text-inherit">
                                    MP Collection APP
                                </p>
                            </NavbarBrand>
                        </NavbarContent>

                        <NavbarContent justify="end">
                        </NavbarContent>
                    </Navbar>
                    <div className="px-0">
                        <MidiaPage  />
                    </div>
                </div>
            </div>
        </NextUIProvider>
    )
}

export default App