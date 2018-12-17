import React, {Component} from 'react';
import AppList from "../list/list";
import Services from "../Services";
import './Search.css';

class AppSearch extends Component {
    service = new Services();

    constructor(props) {
        super(props);
        this.state = {
            tweets: [],
            category: [],
            search: '',
            firstStart: true
        }
    }

    componentDidMount() {
        this.setState({search: this.props.match.params.searchtext});
        this.readData(this.props.match.params.searchtext);
    }

    readData(searchText) {
        this.service.search(searchText, this.currentPage).then((tweetListResult) => {
            this.setState({
                'tweets': tweetListResult
            });
            if (this.state.firstStart) {
                this.setState({
                    'firstStart': false
                });
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
                        (this.state.firstStart) ? (
                            <div className="d-flex justify-content-center">
                                <img alt={'Loading'} src={'/loading.gif'}/>
                            </div>
                        ) : (
                            <div className="d-flex justify-content-center">
                                <img alt={'no results'} src={'/oops.jpg'}/>
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