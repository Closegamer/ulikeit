import React, { Component } from 'react';
import { MDBRow, MDBContainer, MDBCol } from 'mdbreact';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../ducks/users';
import ProfileView from './ProfileView';

export class Profile extends Component {
  handleSubmit = values => {
    console.log('handleSubmit');
  };

  render() {
    const { isLoggedIn, user, userLoadingInProgress } = this.props;

    if (userLoadingInProgress) return <div>спинер</div>;

    let initialValues = null;

    if (isLoggedIn) {
      initialValues = {
        user: user.nick,
        email: user.email,
        country: 'Россия'
      };
    } else {
      initialValues = {};
    }

    return (
      <MDBContainer className='main-container' fluid>
        <MDBRow>
          <MDBCol xl='9' xs='12' className='contentArea-container'>
            <h3>Профиль пользователя</h3>
            <MDBRow>
              <MDBCol size={4}>
                <ProfileView
                  handleSubmit={this.handleSubmit}
                  initialValues={initialValues}
                />
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol xl='3' xs='12' className='bannerRight-container'>
            <MDBRow>
              <MDBCol xl='12' md='4' xs='4'>
                <div className='banner240x400'></div>
              </MDBCol>
              <MDBCol xl='12' md='4' xs='4'>
                <div className='banner240x400'></div>
              </MDBCol>
              <MDBCol xl='12' md='4' xs='4'>
                <div className='banner240x400'></div>
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  isLoggedIn: auth.isLoggedIn,
  user: auth.user,
  userLoadingInProgress: auth.userLoadingInProgress
});

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators({ ...userActions }, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
