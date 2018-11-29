import React from 'react';


const AppHeader = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <a className="navbar-brand" href={"/"}>IT Crowd . Hu</a>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <a className="nav-link" href={"/search/"}>Search</a>
                </li>
            </ul>
        </nav>


    )
}


export default AppHeader;
