import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { Link, Route } from "react-router-dom";

class DashMainLayout extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <header className="main-to-header">
          <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <Link className="navbar-brand" to="/">FRBH</Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarCollapse"
              aria-controls="navbarCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarCollapse">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  {/* <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a> */}
                  <Link className="nav-link" to="/" >{"Dashbord"}</Link>
                </li>
                <li className="nav-item dropdown">
                  <Link
                    className="nav-link dropdown-toggle"
                    to="/mlFiveImage"
                    id="mlFiveNavbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false"
                  >
                    {"ML5 Stuff"}
                  </Link>
                  <div className="dropdown-menu" aria-labelledby="mlFiveNavbarDropdown">
                    <Link className="dropdown-item" to="/mlFiveImage" >{"ML5 Image Upload"}</Link>
                    <Link className="dropdown-item" to="/mlFiveVideo" >{"Ml5 Video Test"}</Link>
                    {/* <div className="dropdown-divider"></div> */}
                  </div>
                </li>
                {/* <li className="nav-item"> <a className="nav-link disabled" href="#">Disabled</a> </li> */}
              </ul>
            </div>
          </nav>
        </header>
        <main role="main" className="container body-container">
          {this.props.children}
        </main>
        <footer className="footer">
          <div className="container">
            <span className="text-muted">{"Firebase handson project v0.0.1"}</span>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

const DashbordMainRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (
      <DashMainLayout>
        <Component {...props} />
      </DashMainLayout>
    )}
  />
);

DashbordMainRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default DashbordMainRoute;