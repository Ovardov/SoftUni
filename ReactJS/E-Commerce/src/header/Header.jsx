import React, { Component } from 'react';
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
                <span>SoftUni React.js course</span>
                <input value={searchValue} onChange={this.handleChange} placeholder="Search..." />
            </div>
        )
    }
}

export default Header;