import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import LangContext from '../../contexts/LangContext';

export default function PrivateRoute({component, ...props}) {
  const Component = component;
  return (
    <Route
      {...props}
      render={componentProps => (
        <UserContext.Consumer>
          {userContext => (
            <LangContext.Consumer>
              {() =>
                !!userContext.user.id ? (
                  <Component {...componentProps} />
                ) : (
                  <Redirect
                    to={{
                      pathname: userContext.user.idle ? '/login' : '/register',
                      state: {from: componentProps.location},
                    }}
                  />
                )
              }
            </LangContext.Consumer>
          )}
        </UserContext.Consumer>
      )}
    />
  );
}
