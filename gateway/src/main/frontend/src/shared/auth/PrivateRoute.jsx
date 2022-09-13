import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { Storage } from '../../utils/storage-utils';

import ErrorBoundary from '../error/ErrorBoundary';
import { IS_AUTHENTICATED_KEY, ACCOUNT_KEY } from '../../store/auth/authentication/authentication';

export const PrivateRouteComponent = ({ component: Component, hasAnyAuthorities = [], ...rest }) => {
  const isAuthenticated = useSelector(state => state.authentication.isAuthenticated) || Storage.local.get(IS_AUTHENTICATED_KEY);
  const sessionHasBeenFetched = useSelector(state => state.authentication.sessionHasBeenFetched);
  const account = useSelector(state => state.authentication.account) || Storage.local.get(ACCOUNT_KEY) ;
  const isAuthorized = hasAnyAuthority(account ? account.authorities : [], hasAnyAuthorities);

  const checkAuthorities = props => {
    return isAuthorized ? (
      <ErrorBoundary>
        <Component {...props} />
      </ErrorBoundary>
    ) : (
        <Redirect
          to={{
            pathname: '/auth-403',
            search: props.location.search,
            state: { from: props.location },
          }}
        />
    );
  }

  const renderRedirect = props => {
      return isAuthenticated ? (
        checkAuthorities(props)
      ) : (
         <Redirect
              to={{
                pathname: '/login',
                search: props.location.search,
                state: { from: props.location },
              }}
            />
      );
  };

  if (!Component) throw new Error(`A component needs to be specified for private route for path ${(rest).path}`);

  return <Route {...rest} render={props => renderRedirect(props)} />;
};

export const hasAnyAuthority = (authorities, hasAnyAuthorities) => {
  if (authorities && authorities.length !== 0) {
    if (hasAnyAuthorities.length === 0) {
      return true;
    }
    return hasAnyAuthorities.some(auth => authorities.includes(auth));
  }
  return false;
};

/**
 * A route wrapped in an authentication check so that routing happens only when you are authenticated.
 * Accepts same props as React router Route.
 * The route also checks for authorization if hasAnyAuthorities is specified.
 */
export default PrivateRouteComponent;
