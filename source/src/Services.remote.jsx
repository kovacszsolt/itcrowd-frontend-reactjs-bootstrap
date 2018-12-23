import {parse, stringify} from 'flatted/esm';

class UPDATESTATE {
    static NEW = 0;
    static TIME = 1;
    static NOCHANGE = 2;
}

class ServicesRemote {
    LIST_URL = process.env.REACT_APP_REACT_BACKEND_SERVER + 'list/';
    UPDATEKEY_URL = process.env.REACT_APP_REACT_BACKEND_SERVER + 'update/';
    STORAGE_KEY_TWEETLIST = 'TWEETLIST';
    STORAGE_KEY_CATEGORYLIST = 'CATEGORYLIST';
    STORAGE_KEY_UPDATE = 'UPDATE';
    REFRESH_TIME = 5;

    getData() {
        return new Promise((resolve, reject) => {
                switch (this._update()) {
                    case UPDATESTATE.NEW: {
                        this._getFromServer().then((data) => {
                            localStorage.setItem(this.STORAGE_KEY_TWEETLIST, stringify(data.tweetList));
                            localStorage.setItem(this.STORAGE_KEY_CATEGORYLIST, stringify(data.categoryList));
                            localStorage.setItem(this.STORAGE_KEY_UPDATE, stringify({
                                value: data.update,
                                date: Date.now()
                            }));
                            resolve(data);
                        });
                        break;
                    }
                    case UPDATESTATE.NOCHANGE: {
                        resolve({
                                update: parse(localStorage.getItem(this.STORAGE_KEY_UPDATE)),
                                tweetList: parse(localStorage.getItem(this.STORAGE_KEY_TWEETLIST)),
                                categoryList: parse(localStorage.getItem(this.STORAGE_KEY_CATEGORYLIST))
                            }
                        );
                        break;
                    }
                    case UPDATESTATE.TIME: {
                        this._getServerUpdate().then((remoteUpdateValue) => {
                            const updateObject = parse(localStorage.getItem(this.STORAGE_KEY_UPDATE));
                            if (remoteUpdateValue.value === updateObject.value) {
                                localStorage.setItem(this.STORAGE_KEY_UPDATE, stringify({
                                    value: remoteUpdateValue.value,
                                    date: Date.now()
                                }));
                                resolve({
                                        update: parse(localStorage.getItem(this.STORAGE_KEY_UPDATE)),
                                        tweetList: parse(localStorage.getItem(this.STORAGE_KEY_TWEETLIST)),
                                        categoryList: parse(localStorage.getItem(this.STORAGE_KEY_CATEGORYLIST))
                                    }
                                );
                            } else {
                                this._getFromServer().then((data) => {
                                    localStorage.setItem(this.STORAGE_KEY_TWEETLIST, stringify(data.tweetList));
                                    localStorage.setItem(this.STORAGE_KEY_CATEGORYLIST, stringify(data.categoryList));
                                    localStorage.setItem(this.STORAGE_KEY_UPDATE, stringify({
                                        value: data.update,
                                        date: Date.now()
                                    }));
                                    resolve(data);
                                });
                            }
                        });
                        break;
                    }
                    default:
                        resolve({
                                update: {},
                                tweetList: [],
                                categoryList: []
                            }
                        );

                }
            }
        );
    }

    /*
    0: first start
     */
    _update() {
        if (localStorage.getItem(this.STORAGE_KEY_UPDATE) === null) {
            return UPDATESTATE.NEW;
        } else {
            if ((Number(parse(localStorage.getItem(this.STORAGE_KEY_UPDATE)).date) + (this.REFRESH_TIME * 1000)) > Date.now()) {
                return UPDATESTATE.NOCHANGE;
            } else {
                return UPDATESTATE.TIME;
            }
        }
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
                    tweet.tagsext = tweet.tags.map((tag) => {
                        return categoryList.find(category => category.title === tag);
                    });
                });

                const data = {
                    update: response[1].value,
                    tweetList: tweetList,
                    categoryList: categoryList
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
