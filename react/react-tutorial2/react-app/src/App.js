import React, { Component } from 'react';

class App extends Component {
  render() {
    // return (
    //     <h1> Hello World</h1> <b>Bold</b>
    // )
    return (
        let txt = this.props.txt;
        <div>
            <h1>{txt}</h1>
            <b>Bold</b>
        </div>
    );
  }
}

App.propTypes = {
    txt: React.propTypes.string,
    cat: React.propTypes.number.isRequired
}

App.defaultProps = {
    txt: "this is the default text"
}

// const App = () => <h1>Hello World</h1>

export default App;
