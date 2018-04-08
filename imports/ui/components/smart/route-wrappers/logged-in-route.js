import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import { userFragment } from '../../../apollo-client/user';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
/**
 * @summary Makes sure that the user that is trying to access the wrapped route
 * is authenticated. If not, the LoggedInRoute component provides 2 ways to
 * handle this situation: redirect (redirectTo) the user to the given route; or
 * render on top of the current route the overlay component.
 */
const LoggedInRoute = ({
  curUser,
  component,
  redirectTo,
  overlay,
  ...rest
}) => (
  <Route
    {...rest}
    render={(ownProps) => {
      // User NOT logged in resolver
      const resolver = redirectTo.trim().length > 0
        ? <Redirect to={redirectTo.trim()} />
        : React.createElement(overlay, { curUser, ...rest, ...ownProps });

      if (!curUser) {
        return resolver;
      }

      // ...Otherwise, render requested component
      return React.createElement(component, { curUser, ...rest, ...ownProps });
    }}
  />
);

LoggedInRoute.propTypes = {
  curUser: propType(userFragment),
  component: PropTypes.func.isRequired,
  redirectTo: PropTypes.string,
  overlay: PropTypes.func,
};

LoggedInRoute.defaultProps = {
  curUser: null,
  redirectTo: '',
  overlay: () => {},
};

export default LoggedInRoute;
