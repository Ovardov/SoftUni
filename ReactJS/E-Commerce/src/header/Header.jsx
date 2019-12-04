import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './header.css';

class Header extends Component {
    state = {
        searchValue: ''
    }

    handleChange = (event) => {
        this.setState({
            searchValue: event.target.value
        });
    }

    render() {
        const { searchValue } = this.state;
        
        return (
            <div className="header-container">
                <Link to='/' className='home'>SoftUni React.js course</Link>
                <Link to='/checkout' className='checkout'>Checkout</Link>
                <input value={searchValue} onChange={this.handleChange} placeholder="Search..." />
            </div>
        )
    }
}

export default Header;