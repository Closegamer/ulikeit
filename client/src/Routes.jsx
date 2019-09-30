import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PrivateRoute from './components/PrivateRoute';

const Home = lazy(() => import('./containers/Home'));
const Articles = lazy(() => import('./containers/Articles'));
const Partners = lazy(() => import('./containers/Partners'));
const Courses = lazy(() => import('./containers/Courses'));
const Contacts = lazy(() => import('./containers/Contacts'));
const Advertising = lazy(() => import('./containers/Advertising'));
const Admin = lazy(() => import('./containers/Admin'));
const Recovery = lazy(() => import('./containers/Recovery'));

function Routes(auth) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/articles' component={Articles} />
        <Route exact path='/partners' component={Partners} />
        <Route exact path='/courses' component={Courses} />
        <Route exact path='/contacts' component={Contacts} />
        <Route exact path='/advertising' component={Advertising} />
        <Route exact path='/recovery/' component={Recovery} />
        <Route exact path='/recovery/:token' component={Recovery} />
        <PrivateRoute
          user={auth.user}
          path='/admin'
          component={() => <Admin />}
        />
      </Switch>
    </Suspense>
  );
}

const mapStateToProps = ({ auth }) => ({
  user: auth.user.nick
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routes);
