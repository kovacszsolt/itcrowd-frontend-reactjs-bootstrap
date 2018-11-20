import React, {Component} from 'react';
import AppListSimple from "../list/simple/Simple";

class AppTweetRelation extends Component {
    url_cagetory = process.env.REACT_APP_TWITTER_CATEGORY_LIST_URL;

    constructor(props) {
        super(props);
        this.state = {
            tweets: null
        }
    }

    componentDidMount() {
        this.readData(this.props.categorylist);
    }

    componentWillReceiveProps(nextProps) {
        this.readData(nextProps.categorylist);
    }

    readData(categoryList) {
        if (categoryList !== undefined) {
            fetch(this.url_cagetory + categoryList)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState(() => ({
                            'tweets': result.result
                        }))
                    });
        }
    }


    render() {
        if (this.state.tweets !== null) {
            return (
                <AppListSimple tweets={this.state.tweets}></AppListSimple>
            );
        } else {
            return null;
        }

    }
}

export default AppTweetRelation;
