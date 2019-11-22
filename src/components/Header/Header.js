import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './Header.scss';

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div className='header-profile'>
        <span>{this.context.user.name}</span>
        <nav className='nav__loggedin'>
          <Link onClick={this.handleLogoutClick} to="/login">
            Logout
          </Link>
        </nav>
      </div>
    );
  }

  renderLoginLink() {
    return (
      // prettier-ignore
      <nav className='nav__loggedout'>
        <Link to="/login">Login</Link>

        <Link to="/register">Sign up</Link>
      </nav>
    );
  }

  render() {
    return (
      <header className={TokenService.hasAuthToken() ? '' : 'header__loggedout'}>
        <h1 className={TokenService.hasAuthToken() ? '' : 'sitetitle__loggedout'}>
          <Link to="/">Spaced repetition</Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}

export default Header;
