const React = require('react');
const _ = require('underscore');

const FriendsList = React.createClass({
    render() {
        return(
            <ul>
                {
                    this.props.friends.length <= 0 ?
                    <li className="list-group-item"> You have no friends :-( </li>
                    :
                    this.props.friends.map((model, key) => (
                        <FriendsListChild
                            model={model}
                            key={key}
                        />
                    ))
                }
            </ul>
        );
    }
});

const FriendsListChild = React.createClass({
    getInitialState: () => ({toggle:false}),
    render() {
        return(
            <li
                className="list-group-item"
                onMouseEnter={()=>{this.setState({toggle:true})}}
                onMouseLeave={()=>{this.setState({toggle:false})}}
            >
                {this.props.friend.firstName} {this.props.friend.lastName}
                {
                    this.state.toggle &&
                    <span className="pull-right">
                        <i className="fa fa-trash" />
                    </span>
                }
            </li>
        );
    }
})

module.exports = FriendsList;
