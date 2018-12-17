import {parse, stringify} from 'flatted/esm';

class ServicesRemote {
    LIST_URL = process.env.REACT_APP_REACT_BACKEND_SERVER + 'twitter/tweet/list/simple/';
    CATEGORY_URL = process.env.REACT_APP_REACT_BACKEND_SERVER + 'twitter/category/list/';
    UPDATEKEY_URL = process.env.REACT_APP_REACT_BACKEND_SERVER + 'settings/updatetime/';
    STORAGE_KEY_TWEETLIST = 'TWEETLIST';
    STORAGE_KEY_CATEGORYLIST = 'CATEGORYLIST';
    STORAGE_KEY_UPDATE = 'UPDATE';
    REFRESH_TIME = 120;

    getData() {
        return new Promise((resolve, reject) => {
                if (this._update()) {
                    this._getFromServer().then((data) => {
                        data.tweetList.map((tweet) => {
                            tweet.twitter_category_full = [];
                            tweet.twitter_category.forEach((category) => {
                                tweet.twitter_category_full.push(data.categoryList.find(findResult => findResult._id === category));
                            });
                            return tweet;
                        });
                        data.categoryList.map((category) => {
                            category.tweets = data.tweetList.filter(
                                tweetListFilterResult => tweetListFilterResult.twitter_category.includes(category._id)
                            );
                            return category;
                        });
                        localStorage.setItem(this.STORAGE_KEY_TWEETLIST, stringify(data.tweetList));
                        localStorage.setItem(this.STORAGE_KEY_CATEGORYLIST, stringify(data.categoryList));
                        localStorage.setItem(this.STORAGE_KEY_UPDATE, stringify({value: data.update, date: Date.now()}));
                        resolve(data);
                    });
                } else {
                    resolve({
                            update: parse(localStorage.getItem(this.STORAGE_KEY_UPDATE)),
                            tweetList: parse(localStorage.getItem(this.STORAGE_KEY_TWEETLIST)),
                            categoryList: parse(localStorage.getItem(this.STORAGE_KEY_CATEGORYLIST))
                        }
                    );
                }
            }
        );
    }


    _update() {
        let _return = (localStorage.getItem(this.STORAGE_KEY_UPDATE) !== null);
        if (_return) {
            _return = (Number(parse(localStorage.getItem(this.STORAGE_KEY_UPDATE)).date) + (this.REFRESH_TIME * 1000) > Date.now());
        }
        return !_return;
    }


    _getFromServer() {
        return new Promise((resolve, reject) => {
            return Promise.all([this._getServerUpdate(), this._getServerTweetList(), this._getServerCategoryList()]).then((response) => {
                if (response[0] === undefined) {
                    response[0] = 'dummy';
                }
                const data = {
                    update: response[0],
                    tweetList: response[1],
                    categoryList: response[2]
                };
                resolve(data);
            })
        })
    }

    _getServerTweetList() {
        return new Promise((resolve, reject) => {
            fetch(this.LIST_URL)
                .then(res => res.json())
                .then(
                    (result) => {
                        resolve(result.result);
                    },
                    (error) => {
                    }
                )
        });
    }


    _getServerCategoryList() {
        return new Promise((resolve, reject) => {
            fetch(this.CATEGORY_URL)
                .then(res => res.json())
                .then(
                    (result) => {
                        resolve(result.result);
                    },
                    (error) => {
                    }
                )
        });
    }

    _getServerUpdate() {
        return new Promise((resolve, reject) => {
            fetch(this.UPDATEKEY_URL)
                .then(res => res.json())
                .then(
                    (result) => {
                        resolve(result.result);
                    },
                    (error) => {
                    }
                )
        });
    }

}

export default ServicesRemote;
