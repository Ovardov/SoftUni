import React, { Component } from 'react';

class CheckoutFrom extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            address: '',
            city: '',
            iban: '',
            terms: false,
            gender: '',
            error: null
        }
    }

    changeUsername = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    changeAddress = (event) => {
        this.setState({
            address: event.target.value
        });
    }

    changeCity = (event) => {
        this.setState({
            city: event.target.value
        });
    }

    changeIban = (event) => {
        this.setState({
            iban: event.target.value
        });
    }

    changeTerms = (event) => {
        this.setState({
            terms: event.target.checked
        });
    }

    changeGender = (event) => {
        this.setState({
            gender: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { username } = this.state;

        if (username === '') {
            this.setState({
                error: 'Username is mandatory, bro'
            });
        } else {
            this.setState({
                error: null
            });
        }
    }

    render() {
        const { username, address, city, iban, terms, error } = this.state;

        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" onChange={this.changeUsername} id="username" value={username} />
                </div>

                <div>
                    <label htmlFor="address">Address:</label>
                    <input type="text" onChange={this.changeAddress} id="address" value={address} />
                </div>

                <div>
                    <label htmlFor="city">City:</label>
                    <select name="city" id="city" onChange={this.changeCity} value={city}>
                        <option value="" selected>Choose..</option>
                        <option value="Sofia">Sofia</option>
                        <option value="Varna">Varna</option>
                        <option value="Vidin">Vidin</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="iban">IBAN:</label>
                    <input type="text" id="iban" onChange={this.changeIban} value={iban} />
                </div>

                <div>
                    <label htmlFor="terms">Terms & Conditions:</label>
                    <input type="checkbox" selected={terms} onChange={this.changeTerms} />
                </div>

                <div>
                    <label htmlFor="gender">Gender: </label>
                    Male: <input name="gender" type="radio" onChange={this.changeGender} value="male" />
                    Woman: <input name="gender" type="radio" onChange={this.changeGender} value="woman" />
                </div>

                <button type="submit">Submit</button>
                {error
                    ? <div>{error}</div>
                    : null
                }
            </form>
        )
    }
}

export default CheckoutFrom;