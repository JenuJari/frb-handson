import React, { Fragment, PureComponent } from "react";
import { connect } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import history from "./../common/helpers/history";
import { appInitAct } from "./../redux/actions/app";
import DashMainLayout from "./DashMain";
import routes from "./maps";
import NoMatch from "./NoMatch";

class AppRouter extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    this.props.appInitAct({ time: 3000 });
  }

  render() {
    return (
      <Fragment>
        <Router history={history}>
          <Switch>
            {routes.map((route, i) => {
              route = { ...route, ...this.props };
              const { layout } = route;
              delete route.layout;
              if (layout === "dash_main") {
                return <DashMainLayout key={i} {...route} />;
              } else {
                return <Route key={i} render={NoMatch} />
              }
            })}
            {/* else if (layout === "alter") {
                return <AlterLayout key={i} {...route} />;
              } */}
            <Route render={NoMatch} />
          </Switch>
        </Router>
      </Fragment>
    );
  }
}

const mapStoreToProps = ({ app }) => ({
  loaded: window._.get(app, "configs.loaded", false)
});

const mapActionsToProps = {
  appInitAct
};

export default connect(mapStoreToProps, mapActionsToProps)(AppRouter);
