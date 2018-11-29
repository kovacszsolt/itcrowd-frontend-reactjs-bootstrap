import React, {Component} from 'react';
import AppList from "../list/list";
import Services from "../Services";
import './Search.css';

class AppSearch extends Component {
    service = new Services();

    firstStart = true;

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            category: [],
            search: ''
        }
    }

    componentDidMount() {
        this.setState({search: this.props.match.params.searchtext});
        this.readData(this.props.match.params.searchtext);
    }

    readData(searchText) {
        this.service.getSearchTweets(searchText, this.currentPage).then((tweetListResult) => {
            this.setState({
                'tweets': tweetListResult
            });
            if (this.firstStart) {
                this.firstStart = false;
            }
        });


    }

    handleChange(event) {
        this.setState({search: event.target.value});
        this.props.history.push('/search/' + event.target.value);
        this.readData(event.target.value);
    }

    render() {
        return (
            <div className="row mt-5">
                <div className="col-md-12 fixed-top mt-6">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search"
                           value={this.state.search}
                           onChange={(e) => {
                               this.handleChange(e)
                           }}
                           aria-label="Search"/>
                </div>
                <div className="col-md-12 mt-6">
                    {(this.state.tweets.length !== 0) ? (
                        <AppList tweets={this.state.tweets}></AppList>
                    ) : (
                        (this.firstStart) ? (
                            <div className="d-flex justify-content-center">
                                <img src={'/loading.gif'} title="loading" />
                            </div>
                        ) : (
                            <div className="d-flex justify-content-center">
                                <img src={'/oops.jpg'} title="no results" />
                            </div>
                        )
                    )
                    }
                </div>
            </div>
        );

    }
}

export default (AppSearch);