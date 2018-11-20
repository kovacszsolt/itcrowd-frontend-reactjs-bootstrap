import React, {Component} from 'react';
import AppList from "../list/list";

class AppFront extends Component {
    url = process.env.REACT_APP_TWITTER_LIST_URL;


    constructor(props) {
        super(props);
        this.state = {
            tweets: []
        }
    }

    componentDidMount() {
        this.readData(this.url);
    }

    readData(url) {
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        'tweets': result.result
                    });
                },
                (error) => {
                }
            )
    }

    render() {
        if (this.state.tweets.length === 0) {
            return null;
        } else {
            return (
                <AppList tweets={this.state.tweets}></AppList>
            );
        }

    }
}

export default (AppFront);
