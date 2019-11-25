import React, { Component } from 'react';

function WithForm(Comp, initialState, schema) {
    return class extends Component {
        state = {
            form: initialState,
        };

        controlChangeHandlerFactory = name => e => {
            const newValue = e.target.value;

            this.setState(prevState => {
                return { form: { ...prevState.form, [name]: newValue } }
            });
        }
        
        getFormState = () => {
            return this.state.form;
        }

        render() {
            return (
                <Comp {...this.props} controlChangeHandlerFactory={this.controlChangeHandlerFactory}  getFormState={this.getFormState} />
            )
        }
    }
}

export default WithForm;