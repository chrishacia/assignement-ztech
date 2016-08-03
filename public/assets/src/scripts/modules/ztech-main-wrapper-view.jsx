const React = require('react');
const _ = require('underscore');
const Nav = require('./nav-view.jsx');
const UserDetailsForm = require('./user-details-form-view.jsx');
const UserFriendsList = require('./user-friends-list-view.jsx');
const {account, friends} = require('./ztech-backbone.js');

const Wrapper = React.createClass({
    getInitialState: () => ({
        loading: true,
        notification: null,
        notificationType: null,
        account: {},
        friends:[],
    }),
    componentDidMount() {
        this._fetchAccount();
    },
    render() {
        // determined by whether or not the account object is empty or not
        let isAccount = !_.isEmpty(this.state.account);
        return(
            <div>
                <Nav
                    isAccount={isAccount}
                    account={this.state.account}
                />

                <div className="container">
                    <div className="row">
                        <div className={isAccount ? 'col-md-9' : 'col-md-12'}>
                            <UserDetailsForm
                                isAccount={isAccount}
                                account={this.state.account}
                            />
                        </div>
                        {
                        isAccount &&
                            <div className="col-md-3">
                                <UserFriendsList
                                    isAccount={isAccount}
                                    account={this.state.account}
                                    friends={this.state.friends}
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    },
    _fetchAccount(){
        let userId = localStorage.getItem('yfUserId');
        if(!userId) { return; }
        account.fetch({
            url: account.url(userId),
            success: (model, xhr) => {
                this.setState({
                    loading: false,
                    account: account.toJSON()
                });
            },
            error: (model, xhr) => {
                this.setState({
                    loading: false,
                    notification: 'error',
                    notificationType: 'There was an unexpected issue while pulling your account information'
                })
            }
        });
    },
    _fetchFriends(userId){

    }
});

module.exports = Wrapper;
