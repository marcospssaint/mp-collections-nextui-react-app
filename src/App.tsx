import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, NextUIProvider } from "@nextui-org/react";
import { SearchIcon } from "./component/icons/SearchIcon";

import './App.css'
import React from "react";
import { MidiaPage } from "./component/pages/MidiaPage";

function App() {

    const [expandSearch, setExpandSearch] = React.useState(false);

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
                            <NavbarItem>
                                <Button 
                                    isIconOnly 
                                    disableAnimation={false} 
                                    variant="light"
                                    radius="full"
                                    aria-label="Like"
                                    onPress={() => {
                                        setExpandSearch(!expandSearch)
                                    }}>
                                    <SearchIcon className="fill-current" size={15} />
                                </Button>
                            </NavbarItem>
                        </NavbarContent>
                    </Navbar>
                    <div className="px-0">
                        
                        <MidiaPage 
                            expandSearch={expandSearch}
                            setExpandSearch={setExpandSearch} />
                    </div>
                </div>
            </div>
        </NextUIProvider>
    )
}

export default App