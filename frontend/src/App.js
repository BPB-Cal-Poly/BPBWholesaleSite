import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Login from "./user/Login";
import Admin from "./Admin";
import "antd/dist/antd.css";


class App extends React.Component {
  render() {
    return (
      
        <div className="grid-container">
          <header className="row">
            <div>
              <a className="brand" href="/">
                Back Porch Bakery
              </a>
            </div>
            <div>
              <a href="/cart">cart</a>
              <a href="/login">login</a>
              <a href="/admin">admin</a>
            </div>
          </header>
          <main>
          <BrowserRouter>
            <Route path="/admin" component={Admin}></Route>
            <Route path="/login" component={Login} exact></Route>
            <Route path="/" component={HomeScreen} exact></Route>
            </BrowserRouter>
          </main>
          <footer className="row center">This is footer</footer>
        </div>
      
    );
  }
}

export default App;
