import {parse, stringify} from 'flatted/esm';

class ServicesRemote {
    LIST_URL = process.env.REACT_APP_REACT_BACKEND_SERVER + 'list/';
    UPDATEKEY_URL = process.env.REACT_APP_REACT_BACKEND_SERVER + 'update/';
    STORAGE_KEY_TWEETLIST = 'TWEETLIST';
    STORAGE_KEY_CATEGORYLIST = 'CATEGORYLIST';
    STORAGE_KEY_UPDATE = 'UPDATE';
    REFRESH_TIME = 120;

    getData() {
        return new Promise((resolve, reject) => {
                if (this._update()) {
                    this._getFromServer().then((data) => {
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
        //return true;
        let _return = (localStorage.getItem(this.STORAGE_KEY_UPDATE) !== null);
        if (_return) {
            _return = (Number(parse(localStorage.getItem(this.STORAGE_KEY_UPDATE)).date) + (this.REFRESH_TIME * 1000) > Date.now());
        }
        return !_return;
    }


    _getFromServer() {
        return new Promise((resolve, reject) => {
            return Promise.all([this._getServerTweetList(), this._getServerUpdate()]).then((response) => {
                if (response[0] === undefined) {
                    response[0] = 'dummy';
                }
                const tweetList = response[0];
                const categoryTmp = [];
                const categoryList = [];
                tweetList.forEach((tweet) => {
                    tweet.tags.forEach((tag) => {
                        if (categoryTmp.find(t => t === tag) === undefined) {
                            categoryTmp.push(tag);
                        }
                    });
                });
                categoryTmp.forEach((category) => {
                    categoryList.push({
                        title: category,
                        count: tweetList.filter(f => f.tags.includes(category)).length
                    });
                });
                tweetList.forEach((tweet) => {
                    tweet.tags = tweet.tags.map((tag) => {
                        return categoryList.find(category => category.title === tag);
                    });
                });
                const data = {
                    update: response[1],
                    tweetList: tweetList,
                    categoryList: categoryList
                };
                console.log(data);
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
                        resolve(result);
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
                        resolve(result);
                    },
                    (error) => {
                    }
                )
        });
    }

}

export default ServicesRemote;
