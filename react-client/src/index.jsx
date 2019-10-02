import React from 'react';
import ReactDOM from 'react-dom';
import UserProfile from './components/UserProfle.jsx';
import Homepage from './components/Homepage.jsx';
import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';
import Axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      page: 'homepage',
      email: ''
    }
    this.clickHandler = this.clickHandler.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.registerHandler = this.registerHandler.bind(this);
  }

  componentDidMount() {
    
  }

  clickHandler(e) {
    const { value } = e.target;
    this.setState({
      page: value,
    })
  }

  loginHandler(e) {
    //get email and password input from login page
    e.preventDefault();
    const email = e.target.getAttribute('email');
    const password = e.target.getAttribute('password');
    //check database to authenticate username and password

    //if authenticated, change state for page to 'userprofile'
    this.setState({
      page: 'userprofile',
      email: email
    })
  }

  registerHandler(e) {
    e.preventDefault();
    const email = e.target.getAttribute('email');
    const password = e.target.getAttribute('password');

    const userObj = {
      email: email,
      password: password,
      userHistory: []
    }
    //check database to make sure email doesn't already exist
    Axios.post('/api/user', {params:userObj})
      .then((data) => {
        console.log(`post success`, data.data)
      })
      .catch(err => {
        this.setState({
          page: 'login'
        })
      })
    //if email doesn't exist make a post to db & change state for page to 'userprofile'
    this.setState({
      page: 'userprofile',
      email: email
    })
  }

  render () {
    switch(this.state.page){
      case 'homepage':
        return (<div><Homepage clickHandler={this.clickHandler}/></div>);
      case 'userprofile':
        return (<div><UserProfile email={this.state.email}/></div>);
      case 'login':
        return (<div><Login loginHandler={this.loginHandler}/></div>);
      case 'register':
          return (<div><Registration registerHandler={this.registerHandler}/></div>);
    }
    // return (
    // <div>
    //   <UserProfile />
    // </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));