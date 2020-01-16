import React from 'react';
import {Route} from 'react-router-dom';
import { useAuth0 } from '../auth0-wrapper';
// import { Home } from '../components/Home';
import { Redirect } from 'react-router';

function SecuredRoute(props) {
  const {component : Component, ...rest} = props;
  const {isAuthenticated} = useAuth0();

//   return (
//     isAuthenticated
//     ? <Route exact path={path} component={component} />
//     : <Route exact path='/' component={Home} />
//   );

    return(
        <Route {...rest} render={(props) => (
            true
              ? <Component {...props} />
              : <Redirect to='/' />
          )} />
    );

}

export default SecuredRoute;