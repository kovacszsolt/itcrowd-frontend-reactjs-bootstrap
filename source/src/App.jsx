import React, {Component} from 'react';
import './App.css';
import './front/Front'
import Front from "./front/Front";
import Header from "./header/Header";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Tweet from "./tweet/Tweet";
import Tag from "./tag/Tag";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="w-100 p-3">
                    <Header/>
                    <Switch>
                        <Route path="/" exact component={Front}/>
                        <Route path="/:slug" exact component={Tweet}/>
                        <Route path="/tag/:slug" exact component={Tag}/>

                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App;
