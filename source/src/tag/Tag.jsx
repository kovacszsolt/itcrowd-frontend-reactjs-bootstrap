import React, {Component} from 'react';
import AppList from "../list/list";
import Services from "../Services";

class AppFront extends Component {
    service = new Services();

    constructor(props) {
        super(props);
        this.state = {
            tweets: []
        }
    }

    componentDidMount() {
        this.service.getTweetsByCategorySlug(this.props.match.params.slug).then((getTweetsByCategoryResult) => {
            this.setState({
                'tweets': getTweetsByCategoryResult
            });
        });
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
