import React, { Component } from 'react';
import { MDBRow, MDBContainer, MDBCol, MDBBtn, MDBNavLink } from 'mdbreact';
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import List from './List';
import Edit from './Edit';
import '../styles.css';

export class CoursesControl extends Component {
  render() {
    const { match } = this.props;
    console.log(this.props);

    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <MDBNavLink to={`${match.path}/list`}>
              <MDBBtn className='adminBtn'>Все курсы</MDBBtn>
            </MDBNavLink>
          </MDBCol>
          <MDBCol>
            <MDBNavLink to={`${match.path}/create`}>
              <MDBBtn className='adminBtn'>Создать курс</MDBBtn>
            </MDBNavLink>
          </MDBCol>
          <MDBCol>
            <MDBNavLink to={`${match.path}/edit`}>
              <MDBBtn className='adminBtn'>Редактировать</MDBBtn>
            </MDBNavLink>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol className='monitor-cont'>
            <Switch>
              <Route path={`${match.path}/`} exact component={List} />
              <Route path={`${match.path}/list`} exact component={List} />
              <Route path={`${match.path}/create`} exact component={Edit} />
              <Route
                path={`${match.path}/create/:humanId`}
                exact
                component={Edit}
              />{' '}
              }
            </Switch>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CoursesControl));
