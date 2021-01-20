import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import CartAdmin from "./screens/CartAdmin";
import HomeScreen from "./screens/HomeScreen";
import Login from "./user/Login";
import "antd/dist/antd.css";


class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div class="grid-container">
          <header class="row">
            <div>
              <a class="brand" href="/">
                Back Porch Bakery
              </a>
            </div>
            <div>
              <a href="/cart">cart</a>
              <a href="/login">login</a>
              <a href="/admin">cartAdmin</a>
            </div>
          </header>
          <main>
            <Route path="/admin" component={CartAdmin} exact></Route>
            <Route path="/login" component={Login} exact></Route>
            <Route path="/" component={HomeScreen} exact></Route>
          </main>
          <footer class="row center">This is footer</footer>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
