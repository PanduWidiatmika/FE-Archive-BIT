import React, { Component } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import "./scss/style.scss";
import { api, authToken } from "./views/plugins/api";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const TheLayout = React.lazy(() => import("./containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const InsertVerifCodePage = React.lazy(() =>
  import("./views/um/insertVerifCodePage")
);
const ChangePasswordPage = React.lazy(() =>
  import("./views/um/changePasswordPage")
);

class App extends Component {
  render() {
    let homeRoute = (
      <Route
        path="/"
        name="Home"
        render={(props) => <TheLayout {...props} />}
      />
    );

    // let loginRoute = (
    //   <Route
    //     exact
    //     path="/login"
    //     name="Login Page"
    //     render={(props) => <Login {...props} />}
    //   />
    // );

    // console.log(homeRoute);

    const cekToken = window.sessionStorage.getItem("token");

    if (!cekToken) {
      homeRoute = (
        <Route path="/" name="Home">
          <Redirect to="/login" />
        </Route>
      );
    } else {
      history.go(1);
    }

    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          {/* {loginRoute} */}

          <Switch>
            <Route
              exact
              path="/login"
              name="Login Page"
              render={(props) => <Login {...props} />}
            />
            <Route
              exact
              path="/register"
              name="Register Page"
              render={(props) => <Register {...props} />}
            />
            <Route
              exact
              path="/404"
              name="Page 404"
              render={(props) => <Page404 {...props} />}
            />
            <Route
              exact
              path="/500"
              name="Page 500"
              render={(props) => <Page500 {...props} />}
            />
            {/* {viewAdminPageRoute} */}
            <Route
              exact
              path="/insertVerifCode"
              name="Insert Verif Code"
              render={(props) => <InsertVerifCodePage {...props} />}
            />
            <Route
              exact
              path="/changePassword"
              name="Change Password"
              render={(props) => <ChangePasswordPage {...props} />}
            />

            {homeRoute}
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
