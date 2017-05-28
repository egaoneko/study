import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      txt: 'this is the state txt',
      cat: 0,
      currentEvent: '---',
      a: '',
      b: '',
      c:'',
      d:'',
      e:'',
      f:'',
      g:''
    };
    this.taUpdate = this.taUpdate.bind(this);
  }

  update (e) {
    this.setState({txt: e.target.value});
  }

  taUpdate (e) {
    this.setState({currentEvent: e.type});
  }

  tUpdate (e) {
    this.setState({
      a: e.target.value,
      b: e.target.value,
      c: this.refs.c.value,
      d: this.refs.d.value,
      e: this.e.value,
      f: ReactDOM.findDOMNode(this.f).value,
      g: this.g.refs.input.value,
    });
  }

  render() {
    // return (
    //     <h1> Hello World</h1> <b>Bold</b>
    // )
    let txt = this.props.txt;
    return (
        <div>
            <h1>{txt}</h1>
            <b>Bold</b>
            <br/>
            <h1>{this.state.txt} - {this.state.cat}</h1>
            {/*
              <input type="text" onChange={this.update.bind(this)} />
              */}
            <Widget update={this.update.bind(this)} />
            <Widget update={this.update.bind(this)} />
            <Widget update={this.update.bind(this)} />
            <br/>
            <Button>I <Heart /> React</Button>
            <br/>
            <Title text="test1234" />
            <br/>
            <h1>{this.state.currentEvent}</h1>
            <textarea
                onKeyPress={this.taUpdate}
                onCopy={this.taUpdate}
                onCut={this.taUpdate}
                onPaste={this.taUpdate}
                onFocus={this.taUpdate}
                onBlur={this.taUpdate}
                onDoubleClick={this.taUpdate}
                cols="30"
                rows="10"
            />
            <br/>
            <input
              type="text"
              onChange={this.tUpdate.bind(this)}
            /> {this.state.a}
            <br/>
            <input
              type="text"
              onChange={this.tUpdate.bind(this)}
            /> {this.state.b}
            <br/>
            <input
              ref="c"
              type="text"
              onChange={this.tUpdate.bind(this)}
            />ref {this.state.c}
            <br/>
            <input
              ref="d"
              type="text"
              onChange={this.tUpdate.bind(this)}
            />ref {this.state.d}
            <br/>
            <input
              ref={node => this.e = node}
              type="text"
              onChange={this.tUpdate.bind(this)}
            />ref node {this.state.e}
            <br/>
            <Input
              ref={component => this.f = component}
              type="text"
              tUpdate={this.tUpdate.bind(this)}
            />ref component {this.state.f}
            <WarpInput
              ref={component => this.g = component}
              type="text"
              tUpdate={this.tUpdate.bind(this)}
            />ref wrap component {this.state.g}
        </div>
    );
  }
}

// Deprecated, using https://github.com/facebook/prop-types
App.propTypes = {
    txt: React.PropTypes.string,
    cat: React.PropTypes.number.isRequired
}

App.defaultProps = {
    txt: "this is the default text"
}

const Widget = (props) =>
  <input type="text" onChange={props.update} />

const Button = (props) =>
  <button>{props.children}</button>

class Heart extends React.Component {
  render() {
    return <span>&hearts;</span>
  }
}

const Title = (props) => <h1>Title: {props.text}</h1>

class Input extends React.Component {
  render() {
    return <input type="text" onChange={this.props.tUpdate} />
  }
}

class WarpInput extends React.Component {
  render() {
    return <div><input ref="input" type="text" onChange={this.props.tUpdate} /></div>
  }
}

Title.propTypes = {
  text(props, propName, component) {
    if(!(propName in props)){
      return new Error(`missing ${propName}`);
    }
    if(props[propName].length < 6) {
      return new Error(`${propName} was too short`)
    }
  }
}



// const App = () => <h1>Hello World</h1>

export default App;
