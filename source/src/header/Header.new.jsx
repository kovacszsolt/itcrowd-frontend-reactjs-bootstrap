import React, {Component} from 'react';

class AppHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
    }

    handleChange(e) {
        console.log('search',e);
        this.setState({search: e.target.value});
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <a className="navbar-brand" href={"/"}>IT Crowd . Hu</a>
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">

                    </ul>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" value={this.state.search}
                           onChange={(e) => {this.handleChange(e)}}
                           aria-label="Search"/>
                </div>
            </nav>
        )
    }
}


export default AppHeader;
