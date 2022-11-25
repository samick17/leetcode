
var Twitter = function() {
    this.users = {};
    //this.user_posts = {};
};

/** 
 * @param {number} userId 
 * @param {number} tweetId
 * @return {void}
 */
Twitter.prototype.postTweet = function(userId, tweetId) {
    const user = this.users[userId] = this.users[userId] || {followed: [], posts: []};
    const hrTime = process.hrtime();
    user.posts.push({
        id: tweetId,
        time: hrTime[0] * 1000000 + hrTime[1] / 1000,
    });
};

/** 
 * @param {number} userId
 * @return {number[]}
 */
Twitter.prototype.getNewsFeed = function(userId) {
    const user = this.users[userId] = this.users[userId] || {followed: [], posts: []};
    posts = user.posts.slice();
    if(posts.length >= 10) {
        return posts.map(post => post.id);
    }
    const followed = user.followed;
    for(let i = 0; i < followed.length; i++) {
        let followeeId = followed[i];
        let followee = this.users[followeeId];
        if(followee) {
            posts.push.apply(posts, followee.posts.slice(0, 10));
        }
    }
    return posts
    .sort((p1, p2) => {
        return (p2.time - p1.time);
    })
    .slice(0, 10)
    .map(p => p.id);
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.follow = function(followerId, followeeId) {
    const user = this.users[followerId] = this.users[followerId] || {followed: [], posts: []};
    user.followed.push(followeeId);
};

/** 
 * @param {number} followerId 
 * @param {number} followeeId
 * @return {void}
 */
Twitter.prototype.unfollow = function(followerId, followeeId) {
    const user = this.users[followerId] = this.users[followerId] || {followed: [], posts: []};
    const index = user.followed.indexOf(followeeId);
    if(index >= 0) {
        user.followed.splice(index, 1);
    }
};

/** 
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */
function call(context, action, params) {
    if(action === 'Twitter') {
        context.instance = new Twitter();
    } else {
        const data = context.instance[action].apply(context.instance, params);
        context.results.push(data);
    }
}
function test(actions, params) {
    const context = {
        instance: null,
        results: [],
    };
    for(let i in actions) {
        call(context, actions[i], params[i]);
    }
    console.log(context.results);
}

test(["Twitter", "postTweet", "getNewsFeed", "follow", "postTweet", "getNewsFeed", "unfollow", "getNewsFeed"], [[], [1, 5], [1], [1, 2], [2, 6], [1], [1, 2], [1]]);
