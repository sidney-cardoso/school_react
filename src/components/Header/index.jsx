import React from "react";
import { FaHome, FaSignInAlt, FaUserAlt } from 'react-icons/fa'

import { Nav } from "./styled";


export default function Header() {
    return (
        <Nav>
            <a href="/">
                <FaHome size={24}/>
            </a>
            <a href="/register/">
                <FaUserAlt size={24} />
            </a>
            <a href="/login/">
                <FaSignInAlt size={24} />
            </a>
        </Nav>
    )
}