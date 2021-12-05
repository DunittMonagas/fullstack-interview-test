

import React from "react";


import {
    Nav,
    NavLogo,
    NavLink,
    Bars,
    NavMenu,
} from "./NavbarElements";


const Navbar = () => {
    return (
        <>
           <Nav>
            <NavLogo to="/">
                FlatMx
            </NavLogo>
            <Bars />

            <NavMenu>
                <NavLink to="/" activeStyle>
                    Branch
                </NavLink>
                <NavLink to="/pullrequest" activeStyle>
                    Pull Request
                </NavLink>
            </NavMenu> 
           </Nav> 
        </>
    );
};

export default Navbar;

