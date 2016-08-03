const React = require('react');
const _ = require('underscore');

const Nav = React.createClass({
    render() {
        return(
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="#">
                        <i className="fa fa-users fa-lg" /> Yeah Friends
                    </a>
                </div>
                <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                    <ul className="nav navbar-nav navbar-left">
                    {
                        !this.props.isAccount ?
                        <li className="navbar-text">&nbsp;</li>
                        :
                        <li className="active">
                            <a href="#social">
                                Peers
                            </a>
                        </li>
                    }
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        { /* user navigation bar avalible when logged in */ }
                        {
                        !this.props.isAccount ?
                            <li className="navbar-text">Welcome Guest!</li>
                        :
                            <li className="dropdown">
                                { /* inline style applied on toggle due to fa-stack-2x font size causing the padding to push the bottom of the nav out of bounds */ }
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" style={{paddingTop:6, paddingBottom:6}}>
                                    <span className="fa-stack fa-lg">
                                        <i className="fa fa-circle fa-stack-2x" />
                                        <i className="fa fa-user fa-stack-1x fa-inverse" />
                                    </span>
                                    &nbsp;
                                    { !this.props.account.firstName ? 'Guest' : this.props.account.firstName }
                                </a>
                                <ul className="dropdown-menu" role="menu">
                                    <li>
                                        <a href="#">Profile</a>
                                    </li>
                                    <li>
                                        <a href="#">
                                            Another action
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">Something else here</a>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <a href="#">
                                            Separated link
                                        </a>
                                    </li>
                                    <li className="divider"></li>
                                    <li>
                                        <a href="#">One more separated link</a>
                                    </li>
                                </ul>
                            </li>
                        }

                    </ul>
                </div>
            </div>
        </nav>
        )
    }
});

module.exports = Nav;
