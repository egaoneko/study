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
      g:'',
      val: 0
    };
    this.taUpdate = this.taUpdate.bind(this);
    this.bUpdate = this.bUpdate.bind(this);
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

  bUpdate (e) {
    this.setState({val: this.state.val + 1});
  }

  componentWillMount() {
    console.log('componentWillMount');
    this.setState({m: 2});
  }

  render() {
    // return (
    //     <h1> Hello World</h1> <b>Bold</b>
    // )
    let txt = this.props.txt;
    console.log('render');
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
            <br/>
            <button onClick={this.bUpdate}>{this.state.val * this.state.m}</button>
            <br/>
            <div id="props"></div>
            <Props val={1} />
            <br/>
            <MapUse />
            <br/>
            <HOCButton>button</HOCButton>
            <br/>
            <LabelHOC>label</LabelHOC>
        </div>
    );
  }

  componentDidMount() {
    console.log('componentDidMount');
    this.inc = setInterval(this.bUpdate, 2000);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    clearInterval(this.inc);
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

class Wrapper extends React.Component {
  mount() {
    ReactDOM.render(<App cat={4}/>, document.getElementById('a'));
  }

  unmount() {
    ReactDOM.unmountComponentAtNode(document.getElementById('a'));
  }

  render() {
    return (
      <div>
        <button onClick={this.mount.bind(this)}>Mount</button>
        <button onClick={this.unmount.bind(this)}>Unmount</button>
        <div id="a"></div>
      </div>
    );
  }
}

class Props extends React.Component {
  constructor() {
    super();
    this.state = {
      increasing : false,
    };
  }

  update() {
    ReactDOM.render(
      <Props val={this.props.val + 1} />,
      document.getElementById('props')
    )
  }

  componentWillReceiveProps(nextProps) {
    this.setState({increasing: nextProps.val > this.props.val});
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.val % 5 === 0;
  }

  render() {
    console.log(this.state.increasing);
    return (
      <button onClick={this.update.bind(this)}>{this.props.val}</button>
    )
  }
}

class MapUse extends React.Component {
  constructor() {
    super();
    this.state = {items: []}
  }

  componentWillMount() {
    fetch('http://swapi.co/api/people/?format=json')
    .then(response => response.json())
    .then(({results: items}) => this.setState({items}));
  }

  filter (e) {
    this.setState({filter: e.target.value});
  }

  render() {
    let items = this.state.items;

    if(this.state.filter) {
      items = items.filter( item =>
        item.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    }

    return(
      <div>
        <input type="text" onChange={this.filter.bind(this)} />
        {items.map(item =>
          <Person key={item.name} person={item} />
        )}
      </div>
    )
  }
}

const Person = (props) => <h4>{props.person.name}</h4>

const HOC = (InnerConmponent) => class extends React.Component {
  constructor() {
    super();
    this.state = {count: 0};
  }

  update() {
    this.setState({count: this.state.count + 1})
  }

  componentWillMount() {
    console.log('HOC will mount');
  }

  render(){
    return(
      <InnerConmponent
        {...this.props}
        {...this.state}
        update={this.update.bind(this)}
      />
    )
  }
}

const HOCButton = HOC((props) =>
  <button onClick={props.update}>{props.children} - {props.count}</button>
)
class HOCLabel extends React.Component {


  componentWillMount() {
    console.log('HOC label will mount');
  }

  render() {
    return(
      <label onMouseMove={this.props.update}>{this.props.children} - {this.props.count}</label>
    )
  }
}

const LabelHOC = HOC(HOCLabel)

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

export default Wrapper;
