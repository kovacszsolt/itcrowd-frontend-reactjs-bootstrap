import React, {Component} from 'react';
import AppListSimple from "../list/simple/Simple";
import Services from "../Services";

class AppTweetRelation extends Component {
    service = new Services();

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
        this.service.getTweetsByCategoryMultiple(categoryList).then((getTweetsByCategoryMultipleResult) => {
            getTweetsByCategoryMultipleResult = getTweetsByCategoryMultipleResult.filter((filterResult) => {
                return (filterResult._id !== this.props.currentId);
            });
            this.setState(() => ({
                'tweets': getTweetsByCategoryMultipleResult
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
