import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Navigation from "./components/Navigation/Navigation";
import "./App.scss";
import SearchBarContextProvider from "./contexts/searchBarContext";
// import Products from './components/Products/Products';
// import Signup from './components/Signup/Signup';
// import Signin from './components/Signin/Signin';

const Products = React.lazy(() => import("./components/Products/Products"));
const Signin = React.lazy(() => import("./components/Signin/Signin"));
const Signup = React.lazy(() => import("./components/Signup/Signup"));

function App() {
  return (
    <div className="App">
      <SearchBarContextProvider>
        <Navigation />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/products" component={Products} exact />
            <Route path="/products/:id" component={Products} exact />
            <Route path="/signin" component={Signin} exact />
            <Route path="/signup" component={Signup} exact />
          </Switch>
        </Suspense>
      </SearchBarContextProvider>
    </div>
  );
}

export default App;
