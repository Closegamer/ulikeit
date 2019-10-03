import React, { Component } from 'react';
import { MDBRow, MDBContainer, MDBCol, MDBBtn, MDBIcon } from 'mdbreact';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../ducks/users';
import makeAnimated from 'react-select/animated';
import Select from 'react-select';
import {
  optionsCity,
  optionsCountry,
  optionsReason,
  optionsSex,
  optionsTarget
} from './selectOptions';
import './styles.css';

export class Profile extends Component {
  handleSubmit = values => {
    console.log(values);
  };

  render() {
    const { isLoggedIn, user, userLoadingInProgress } = this.props;

    if (userLoadingInProgress) return <div>спинер</div>;

    const animatedComponents = makeAnimated();
    return (
      <MDBContainer className='main-container' fluid>
        <MDBRow>
          <MDBCol xl='9' xs='12' className='contentArea-container'>
            <MDBRow>
              <MDBCol size={6}>
                <h3>Профиль пользователя</h3>
                <p className='currentProfileData'>
                  Чтобы увеличить Ваши шансы на знакомство, рекомендуем Вам
                  сообщить как можно больше информации.
                </p>
                {/* <ProfileView handleSubmit={this.handleSubmit} user={user} /> */}
                <p className='selectLabel'>Никнейм</p>
                {user && user.nick && (
                  <input
                    className='profileInput'
                    type='text'
                    name='nick'
                    value={user.nick}
                    onChange={this.handleSubmit}
                  />
                )}
                {user && !user.nick && (
                  <input
                    className='profileInput'
                    type='text'
                    name='nick'
                    onChange={this.handleSubmit}
                  />
                )}
                {user && user.nick && (
                  <MDBIcon icon='check' className='currentProfileDataCheck' />
                )}
                <p className='selectLabel'>Email</p>
                {user && user.email && (
                  <input
                    className='profileInput'
                    type='text'
                    name='email'
                    value={user.email}
                    onChange={this.handleSubmit}
                  />
                )}
                {user && !user.email && (
                  <input
                    className='profileInput'
                    type='text'
                    name='email'
                    placeholder='не обязательно'
                    onChange={this.handleSubmit}
                  />
                )}
                {user && user.email && (
                  <MDBIcon icon='check' className='currentProfileDataCheck' />
                )}
                <p className='selectLabel'>Имя</p>
                {user && user.firstName && (
                  <input
                    className='profileInput'
                    type='text'
                    name='firstName'
                    value={user.firstName}
                    onChange={this.handleSubmit}
                  />
                )}
                {user && !user.firstName && (
                  <input
                    className='profileInput'
                    type='text'
                    name='firstName'
                    placeholder='не обязательно'
                    onChange={this.handleSubmit}
                  />
                )}
                {user && user.firstName && (
                  <MDBIcon icon='check' className='currentProfileDataCheck' />
                )}
                <p className='selectLabel'>Фамилия</p>
                {user && user.lastName && (
                  <input
                    className='profileInput'
                    type='text'
                    name='lastName'
                    value={user.lastName}
                    onChange={this.handleSubmit}
                  />
                )}
                {user && !user.lastName && (
                  <input
                    className='profileInput'
                    type='text'
                    name='lastName'
                    placeholder='не обязательно'
                    onChange={this.handleSubmit}
                  />
                )}
                {user && user.lastName && (
                  <MDBIcon icon='check' className='currentProfileDataCheck' />
                )}
                <p className='selectLabel'>Ваш пол</p>
                <div className='selectContainer'>
                  <Select
                    options={optionsSex}
                    defaultValue={user.sex}
                    placeholder={user.sex}
                    name='sex'
                  />
                </div>
                {user && user.sex && (
                  <MDBIcon icon='check' className='currentProfileDataCheck' />
                )}
                <p className='selectLabel'>Причина пребывания здесь</p>
                <div className='selectContainer'>
                  <Select
                    options={optionsReason}
                    defaultValue={user.reason}
                    components={animatedComponents}
                    isMulti
                    name='reason'
                  />
                </div>
                {user && user.reason && (
                  <MDBIcon icon='check' className='currentProfileDataCheck' />
                )}
                <p className='selectLabel'>Объект поиска</p>
                <div className='selectContainer'>
                  <Select
                    options={optionsTarget}
                    defaultValue={user.target}
                    isMulti
                    name='target'
                  />
                </div>
                {user && user.target && (
                  <MDBIcon icon='check' className='currentProfileDataCheck' />
                )}
                <p className='selectLabel'>Страна</p>
                <div className='selectContainer'>
                  <Select
                    options={optionsCountry}
                    defaultValue={user.country}
                    placeholder={user.country}
                    name='country'
                  />
                </div>
                {user && user.country && (
                  <MDBIcon icon='check' className='currentProfileDataCheck' />
                )}
                <p className='selectLabel'>Город</p>
                <div className='selectContainer'>
                  <Select
                    options={optionsCity}
                    defaultValue={user.city}
                    placeholder={user.city}
                    name='city'
                  />
                </div>
                {user && user.city && (
                  <MDBIcon icon='check' className='currentProfileDataCheck' />
                )}
                <p className='selectLabel'>Несколько слов о себе</p>
                <div>
                  <textarea
                    className='textareaProfile'
                    value={user.desc}
                    name='desc'
                    rows='7'
                    maxlength='500'
                    placeholder='не обязательно'
                    onChange={this.handleSubmit}
                  />
                </div>
                {user && user.desc && (
                  <MDBIcon icon='check' className='currentProfileDataCheck' />
                )}
              </MDBCol>
              <MDBCol size={6}>фото</MDBCol>
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
        <MDBRow>
          <MDBCol xl='9' xs='12' className='bannerBottom-container'>
            <div className='banner728x90custom'></div>
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
