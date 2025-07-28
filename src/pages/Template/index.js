import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import MainContainer from "../../components/MainContainer";
import Header from "../../components/Header";
import Menu from "../../components/Menu";

export default function Template() {

    const [ menuIsOpen, setMenuIsOpen ] = useState(false);

    useEffect(() => {
        if (window.innerWidth > 1000 && menuIsOpen) {
            setMenuIsOpen(false);
        }
    }, []);

    return (
        <div>
            <Header
                menuIsOpen={menuIsOpen}
                setMenuIsOpen={setMenuIsOpen}
            />
            <Menu
                menuIsOpen={menuIsOpen}
            />
            <MainContainer
                menuIsOpen={menuIsOpen}
            >
                <Outlet />
            </MainContainer>
        </div>
    )

}