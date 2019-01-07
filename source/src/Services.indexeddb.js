const ITEMS_PET_PAGE = 6;
export const dbCreate = (data) => {
    return new Promise((resolve, reject) => {
        const dbRequest = indexedDB.open('itcrowd', 1);

        dbRequest.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('tweetList')) {
                const tweetListStore = db.createObjectStore('tweetList', {autoIncrement: true});
                tweetListStore.createIndex('slug', 'slug', {unique: false});
                tweetListStore.createIndex('tag', 'tag', {unique: false});
                db.createObjectStore('tweetListSimple', {keyPath: 'slug'});

            }
        }

        dbRequest.onsuccess = (event) => {
            if (event.type === 'success') {
                const db = event.target.result;

                dbUpload(db, data.tweetList).then((dbUploadResult) => {
                    resolve(dbUploadResult);
                });
            }

        }
    });
}

export const getTweetKeys = () => {
    return new Promise((resolve, reject) => {
        const dbRequest = indexedDB.open('itcrowd', 1);
        dbRequest.onsuccess = (event) => {
            if (event.type === 'success') {
                const db = event.target.result;
                const transTweetListSimple = db.transaction('tweetListSimple');
                const storeTweetSimple = transTweetListSimple.objectStore('tweetListSimple');
                storeTweetSimple.getAllKeys().onsuccess = (getAllResult) => {
                    if (getAllResult.type === 'success') {
                        resolve(getAllResult.target.result);
                    }
                };
            }
        }
    });
}
export const getTweet = (tag) => {
    return new Promise((resolve, reject) => {
        const dbRequest = indexedDB.open('itcrowd', 1);
        dbRequest.onsuccess = (event) => {
            if (event.type === 'success') {
                const db = event.target.result;
                const transTweetListSimple = db.transaction('tweetList');
                const storeTweetSimple = transTweetListSimple.objectStore('tweetList').index('slug');
                storeTweetSimple.get(tag).onsuccess = (getAllResult) => {
                    if (getAllResult.type === 'success') {
                        resolve(getAllResult.target.result);
                    }
                };
            }
        }
    });
}

export const getCategory = (tag) => {
    return new Promise((resolve, reject) => {
        const dbRequest = indexedDB.open('itcrowd', 1);
        dbRequest.onsuccess = (event) => {
            if (event.type === 'success') {
                const db = event.target.result;
                const transTweetListSimple = db.transaction('tweetList');
                const storeTweetSimple = transTweetListSimple.objectStore('tweetList').index('tag');
                storeTweetSimple.getAll(tag).onsuccess = (getAllResult) => {
                    if (getAllResult.type === 'success') {
                        resolve(getAllResult.target.result);
                    }
                };
            }
        }
    });
}

export const getTweets = (pageNumber = -1) => {
    return new Promise((resolve, reject) => {
        const dbRequest = indexedDB.open('itcrowd', 1);
        dbRequest.onsuccess = (event) => {
            if (event.type === 'success') {
                const db = event.target.result;
                const transTweetListSimple = db.transaction('tweetListSimple');
                const storeTweetSimple = transTweetListSimple.objectStore('tweetListSimple');
                if (pageNumber === -1) {
                    storeTweetSimple.getAll().onsuccess = (getAllResult) => {
                        if (getAllResult.type === 'success') {
                            resolve(getAllResult.target.result);
                        }
                    };
                } else {
                    let cursorPos = 0;
                    const cursorPosStart = ITEMS_PET_PAGE * (pageNumber - 1);
                    const cursorPosEnd = ITEMS_PET_PAGE * (pageNumber);
                    const tweetList = [];
                    storeTweetSimple.openCursor().onsuccess = function (event) {
                        if (event.type === 'success') {
                            const cursor = event.target.result;
                            if (cursor) {
                                if ((cursorPos >= cursorPosStart) && (cursorPosEnd > cursorPos)) {
                                    tweetList.push(cursor.value)
                                }
                                cursorPos++;
                                cursor.continue();
                            } else {
                                resolve(tweetList);
                            }
                        }
                    }
                }
            }
        }
    });
}

const dbUpload = (db, tweets) => {
    return new Promise((resolve, reject) => {
        const transTweetList = db.transaction('tweetList', 'readwrite');
        const storeTweet = transTweetList.objectStore('tweetList');

        const storeCount = storeTweet.count();
        storeCount.onsuccess = (countSuccessResult) => {
            if (countSuccessResult.target.result === 0) {
                add(tweets, storeTweet).then((addResult) => {
                    resolve(true);
                });
            } else {
                const storeClearRequest = storeTweet.clear();
                storeClearRequest.onsuccess = (Result) => {
                    add(tweets, storeTweet).then((addResult) => {
                        resolve(true);
                    });
                }
            }
        }

        const transTweetListSimple = db.transaction('tweetListSimple', 'readwrite');
        const storeTweetSimple = transTweetListSimple.objectStore('tweetListSimple');
        const storeTweetSimpleCount = storeTweetSimple.count();
        storeTweetSimpleCount.onsuccess = (storeTweetSimpleCountSuccessResult) => {
            if (storeTweetSimpleCountSuccessResult.target.result === 0) {
                addSimple(tweets, storeTweetSimple).then((addSimpleResult) => {
                    resolve(true);
                });
            } else {
                const storeTweetSimpleClearRequest = storeTweetSimple.clear();
                storeTweetSimpleClearRequest.onsuccess = (Result) => {
                    add(tweets, storeTweetSimple).then((addResult) => {
                        resolve(true);
                    });
                }
            }
        }
    });
}

const addSimple = (tweets, store) => {
    return new Promise((resolve, reject) => {
        let tweetCount = tweets.length;
        tweets.forEach((tweet) => {
            const add = store.add(tweet);
            add.onsuccess = (addResult) => {
                if (addResult.type === 'success') {
                    tweetCount--;
                    if (tweetCount === 0) {
                        resolve(true);
                    }
                }
            }
        });
    });
}

const add = (tweets, store) => {
    return new Promise((resolve, reject) => {
        let tweetCount = tweets.length;
        tweets.forEach((tweet) => {
            const _tweet = {...tweet};
            if (tweet.tags.length === 0) {
                _tweet.tag = '';
                const add = store.add(_tweet);
                add.onsuccess = (addResult) => {
                    if (addResult.type === 'success') {
                        tweetCount--;
                        if (tweetCount === 0) {
                            resolve(true);
                        }
                    }
                }
            } else {
                let tagCount = tweet.tags.length;
                tweet.tags.forEach((tweetTag) => {
                    _tweet.tag = tweetTag;
                    const add = store.add(_tweet);
                    add.onsuccess = (addResult) => {
                        if (addResult.type === 'success') {
                            tagCount--;
                            if (tagCount === 0) {
                                tweetCount--;
                                if (tweetCount === 0) {
                                    resolve(true);
                                }
                            }
                        }
                    }
                });
            }
        });
    });
}
