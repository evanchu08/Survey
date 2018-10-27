import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';

class Header extends Component {
    renderContext() {
        switch (this.props.auth) {
            case null:
                return <li><a href="/auth/google">Log in with Google</a></li>
            case false:
                return <li><a href="/auth/google">Log in with Google</a></li>
            default:
                return [
                    <li key="1"><Payments /></li>,
                    <li key="2" style={{ margin: '0 10px' }}>Credits: {this.props.auth.credits}</li>,
                    <li key="3"><a href="/api/logout">log out</a></li>
                ];
        }
    }
    render() {
        console.log(this.props)
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? '/surveys' : '/'}
                        className="left brand-logo">
                        Emaily
                    </Link>
                    <ul className="right">
                        {this.renderContext()}
                    </ul>
                </div>
            </nav>
        )
    }
}


function mapStateToProps({ auth }) {
    return { auth }
}

export default connect(mapStateToProps)(Header)