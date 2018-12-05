import React, {Component} from 'react';
import AppList from "../list/list";
import Services from "../Services";
import AppListCardCategory from "../list/category/Category";
import './Front.css';

class AppFront extends Component {
    service = new Services();

    currentPage = 1;

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            category: []
        }
    }

    componentDidMount() {
        this.readData();
        document.addEventListener('scroll', this.trackScrolling);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }

    trackScrolling = () => {
        const wrappedElement = document.getElementById('content');
        if (this.isBottom(wrappedElement)) {

            this.readData();
        }
    }

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    readData() {
        this.componentWillUnmount();
        this.service.getTweets(this.currentPage).then((tweetListResult) => {
            const tmp = this.state.tweets;
            tmp.push(...tweetListResult);
            this.setState({
                'tweets': tmp
            });
            this.currentPage++;
            document.addEventListener('scroll', this.trackScrolling);
        });
        this.service.getCategory().then((categoryListResult) => {
            this.setState({
                'category': categoryListResult
            });
        });
    }

    render() {
        if (this.state.tweets.length === 0) {
            return null;
        } else {
            return (
                <div className="row">
                    <div className="col-md-10 mt-5" id={"content"}>
                        <AppList tweets={this.state.tweets}></AppList>
                    </div>
                    <div className="col-md-2 mt-5 sidebar d-none d-md-block d-sm-none">
                        <AppListCardCategory category={this.state.category}/>
                    </div>
                </div>
            );
        }

    }
}

export default (AppFront);