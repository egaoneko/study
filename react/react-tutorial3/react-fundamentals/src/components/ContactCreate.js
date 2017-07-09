import React from 'react';
import PropTypes from 'prop-types';

export default class ContactCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: ''
        }
        this.handleChage = this.handleChage.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChage(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClick() {
        const contact = {
            name: this.state.name,
            phone: this.state.phone
        };
        this.props.onCreate(contact);

        this.setState({
            name: '',
            phone: ''
        });
    }

    render() {
        return (
            <div>
                <h2>Create Contact</h2>
                <p>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChage} />
                    <input 
                        type="text" 
                        name="phone" 
                        placeholder="phone"
                        value={this.state.phone}
                        onChange={this.handleChage} />
                </p>
                <button onClick={this.handleClick}>Create</button>
            </div>
        );
    }
}

ContactCreate.PropTypes = {
    onCreate: React.PropTypes.func
}

ContactCreate.defaultProps = {
    onCreate: () => { console.error('onCreate not define.');}
}