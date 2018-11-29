import ServicesRemote from "./Services.remote";

const CircularJSON = require('circular-json');

class Services extends ServicesRemote {
    UPDATEKEY_URL = process.env.REACT_APP_UPDATEKEY_URL;
    STORAGE_KEY_TWEETLIST = 'TWEETLIST';
    STORAGE_KEY_CATEGORYLIST = 'CATEGORYLIST';
    STORAGE_KEY_UPDATE = 'UPDATE';

    ITEMS_PET_PAGE = 6;
    REFRESH_TIME = 120; //update key refresh rate im secund


    getTweets(pageNumber = 1) {
        return new Promise((resolve, reject) => {
            this._getTweetsAll().then((_getTweetsAllResult) => {
                resolve(_getTweetsAllResult.slice((pageNumber - 1) * this.ITEMS_PET_PAGE, pageNumber * this.ITEMS_PET_PAGE));
            });
        });
    }

    getTweet(tweetSlug) {
        return new Promise((resolve, reject) => {
            this._getTweetsAll().then((_getTweetsAllResult) => {
                resolve(_getTweetsAllResult.find(findResult => findResult.slug === tweetSlug));
            });
        });
    }

    getCategory() {
        return new Promise((resolve, reject) => {
            this._getTweetsAll().then((_getTweetsAllResult) => {
                resolve(CircularJSON.parse(localStorage.getItem(this.STORAGE_KEY_CATEGORYLIST)));
            });
        });
    }

    getTweetsByCategorySlug(categorySlug) {
        return new Promise((resolve, reject) => {
            this._getTweetsAll().then((w) => {
                const catgory = CircularJSON.parse(localStorage.getItem(this.STORAGE_KEY_CATEGORYLIST));
                resolve(catgory.find(q => q.slug === categorySlug).twitter);
            });
        });
    }

    _setUpdate(key) {
        localStorage.setItem(this.STORAGE_KEY_UPDATE, CircularJSON.stringify({key: key, date: Date.now()}));
    }

    _getUpdate() {
        return (localStorage.getItem(this.STORAGE_KEY_UPDATE) === null) ? null : CircularJSON.parse(localStorage.getItem(this.STORAGE_KEY_UPDATE));
    }

    _stroreData() {
        return new Promise((resolve, reject) => {
            return Promise.all([this.RemoteUpdateKey(), this.__receiveData()]).then((PromiseAllReceive) => {
                const updateKey = PromiseAllReceive[0];
                const data = PromiseAllReceive[1];
                localStorage.setItem(this.STORAGE_KEY_TWEETLIST, CircularJSON.stringify(data.tweetList));
                localStorage.setItem(this.STORAGE_KEY_CATEGORYLIST, CircularJSON.stringify(data.categoryList));
                this._setUpdate(updateKey.value);
                resolve(true);
            });
        });
    }

    _getTweetsAll() {
        return new Promise((resolve, reject) => {
            if ((this._getUpdate() === null) || (Date.now() > Number(this._getUpdate().date) + (this.REFRESH_TIME * 1000))) {
                this._stroreData().then((qq) => {
                    resolve(CircularJSON.parse(localStorage.getItem(this.STORAGE_KEY_TWEETLIST)));
                });
            } else {
                resolve(CircularJSON.parse(localStorage.getItem(this.STORAGE_KEY_TWEETLIST)));
            }
        });
    }


    __receiveData() {
        return Promise.all([this.RemoteTweetList(), this.RemoteCategoryList()]).then((promiseAllResponse) => {
                return this.__tweetListPopulateCategory(promiseAllResponse[0], promiseAllResponse[1]);
            }
        )
    }

    __tweetListPopulateCategory(tweetList, categoryList) {
        categoryList.map((categoryListMapResult) => {
            categoryListMapResult.twitter = tweetList.filter(tweetListFilterResult => tweetListFilterResult.twitter_category.includes(categoryListMapResult._id));
        });
        tweetList.map((tweet) => {
            tweet.twitter_category = tweet.twitter_category.map((twitter_category) => {
                return (categoryList.find(findResult => findResult._id === twitter_category));
            });
        });
        return {categoryList: categoryList, tweetList: tweetList};
    }

}

export default Services;
