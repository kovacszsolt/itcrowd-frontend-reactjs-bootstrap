import React, {Component} from 'react';
import AppListSimple from "../list/simple/Simple";
import Services from "../Services";

class AppTweetRelation extends Component {
    service = new Services();
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
        this.service.getTweetsByCategoryMultiple(categoryList).then((a) => {
            this.setState(() => ({
                'tweets': a
            }))
        });
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
