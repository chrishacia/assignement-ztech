const Backbone = require('backbone');

// Account information.
const Account = Backbone.Model.extend({
    url: (userId) => (document.location.href + './api/account/' + userId),
    parse: (response) => (response.data)
});

// Friends
const Friend = Backbone.Model.extend();
const Friends = Backbone.Collection.extend({
    model: Friend,
    url: (userId) => (document.location.href + './api/friends/' + userId),
    parse: (response) => (response.data)
});

// instantiate models/collections
const account = new Account();
const friends = new Friends();

module.exports = {account, friends}
