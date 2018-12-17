import React from 'react';

let textValue = '';

const handleChange = (event) => {
    textValue = event.target.value;
}

const handleOnKeyPress = (event) => {
    if (event.key === 'Enter') {
        if (textValue !== '') {
            window.location = '/search/' + textValue;
        }
    }
}

const AppHeader = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <a className="navbar-brand" href={"/"}>IT Crowd . Hu</a>
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item">

                </li>
            </ul>
            <div className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"
                       onChange={(e) => {
                           handleChange(e)
                       }}
                       onKeyPress={(e) => {
                           handleOnKeyPress(e)
                       }}
                />
            </div>
        </nav>


    )
}


export default AppHeader;
