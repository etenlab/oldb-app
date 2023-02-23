import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import DataTable from "./pages/DataTable";
import Discussion from './components/Discussion';
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Diff from "./pages/Diff";
import { PrivateRoute } from "./common/PrivateRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import SliPage from "./pages/SliPage";
import SliDataPage from "./pages/SliDataPage";

// const client = new ApolloClient({
//   uri: "https://fast-heron-34.hasura.app/v1/graphql",
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  uri: process.env.REACT_APP_NOTIFICATION_API_SUBSCRIPTION_SERVER_URL
      || "http://localhost:8012/graphql",
  cache: new InMemoryCache(),
});
setupIonicReact();

const App: React.FC = () => {

  return (
    <IonApp>
      <ApolloProvider client={client}>
        <IonReactRouter>
          <IonRouterOutlet>
            {/* <PrivateRoute exact path="/home" roles={['admin']} component={Home}>
            </PrivateRoute> */}
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>


            <Route exact path="/diff">
              <Diff />
            </Route>
            <PrivateRoute path='/table/:table' roles={['admin']} component={DataTable}></PrivateRoute>
            <PrivateRoute
              path="/discussion/:table_name/:row"
              component={Discussion} roles={['admin']} />

            <Route exact path="/sli">
              <SliPage />
            </Route>
            <Route exact path="/sli/data/:table">
              <SliDataPage />
            </Route>
            <Route
              path="/sli/map"
              component={() => {
                window.location.href = "https://cartographa.netlify.app/#close";
                return null;
              }}
            />

          </IonRouterOutlet>
        </IonReactRouter>
      </ApolloProvider>
    </IonApp>
  );
};

export default App;
