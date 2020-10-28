import React, { Component } from 'react'
import Register from './components/Register'
import NavBar from './components/NavBar'
import axios from 'axios'
import { BrowserRouter as Router, Route } from "react-router-dom";

const Page404 = () => <h1>Four:oh:four</h1>

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId: null,
      userName: null
    }
  }

  componentDidMount = async () => {
    const res = await axios.get('/api/user/me');
    this.setState({ userId: res.data.userId })
    this.setState({ userName: res.data.userName })
  }

  login = async (userInfo) => {
    try {
      await axios.post('/api/user/login', userInfo);
      const res = await axios.get('/api/user/me');
      this.setState({ userId: res.data.userId })
      this.setState({ userName: res.data.userName })
    } catch(err) {
      console.log(err)
    } 
  }

  register = async (userInfo) =>  {
    await axios.post('/api/user/register', userInfo)
  }

  render() {
    return (
      <div className="App" style={{backgroundColor: "#17a2b7", margin: "5%"}}>
        <Router> 
          <NavBar login={this.login} userName={this.state.userName}/>           
            <div className="container" style={{backgroundColor: "#17a2b7", padding: "10px"}}> 
              <Route path="/register"
                exact
                render={(props) => (<Register {...props} register={this.register} /> 
              )}
              />              
            </div>          
        </Router>
      </div>
    )
  }
}

export default App;


