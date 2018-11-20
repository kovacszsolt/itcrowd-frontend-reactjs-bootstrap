import React, {Component} from 'react';
import AppList from "../list/list";

class AppFront extends Component {
    url = process.env.REACT_APP_ROUTE_URL;


    constructor(props) {
        super(props);
        this.state = {
            tweets: []
        }
    }

    componentDidMount() {
        fetch(this.url + this.props.match.params.slug)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        'tweets': result.result[0].twitter_category
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
