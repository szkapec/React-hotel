import React, { Component } from 'react'
import logo from '../images/logo.svg';
import {FaAlignRight} from 'react-icons/fa';
import {Link} from 'react-router-dom';

export default class Navbar extends Component {


    state = {
        isOpen: false,
    }

    handleTggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        return (
           <>
                <nav className="navbar">
                    <div className="nav-center">
                        <div className="nav-header">
                            <Link to="/">
                                <img src={logo} alt="beeach"></img>
                            </Link>
                            <button type="button" className="nav-btn" onClick={this.handleTggle}>
                                <FaAlignRight className="nav-icon"/>
                            </button>
                        </div>
                        <ul className={this.state.isOpen?"nav-links show-nav":"nav-links"}> 
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/rooms">Roms</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
           </>
        )
    }
}
