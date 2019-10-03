import { React, Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdbreact';
import { TextField, TextArea, SelectField } from '../../fields';
import './styles.css';
import '../Admin/styles.css';
import { userInfo } from 'os';

const optionsSex = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' }
];

const animatedComponents = makeAnimated();

const ProfileView = props => {
  const { handleSubmit, user } = props;
  return (
    <form onSubmit={handleSubmit} autoComplete='on'>
      <MDBContainer>
        <MDBRow>
          <MDBCol xs='12' sm='6' md='6' lg='6'>
            <Field
              name='nick'
              component={TextField}
              label={'Ваш ник'}
              group
              type='text'
            />
          </MDBCol>
          <MDBCol
            xs='12'
            sm='6'
            md='6'
            lg='6'
            className='currentLabelContainer'
          >
            {user && user.nick && (
              <span className='currentProfileData'>
                <MDBIcon icon='check' className='currentProfileDataCheck' />{' '}
                Текущее значение: <b>{user.nick}</b>{' '}
              </span>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol xs='12' sm='6' md='6' lg='6'>
            <Field
              name='firstname'
              component={TextField}
              label={'Ваше имя'}
              group
              type='text'
            />
          </MDBCol>
          <MDBCol
            xs='12'
            sm='6'
            md='6'
            lg='6'
            className='currentLabelContainer'
          >
            {user && user.name && (
              <span className='currentProfileData'>
                <MDBIcon icon='check' className='currentProfileDataCheck' />{' '}
                Текущее значение: <b>{user.name}</b>{' '}
              </span>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol xs='12' sm='6' md='6' lg='6'>
            <Field
              name='surname'
              component={TextField}
              label={'Ваше имя'}
              group
              type='text'
            />
          </MDBCol>
          <MDBCol
            xs='12'
            sm='6'
            md='6'
            lg='6'
            className='currentLabelContainer'
          >
            {user && user.surname && (
              <span className='currentProfileData'>
                <MDBIcon icon='check' className='currentProfileDataCheck' />{' '}
                Текущее значение: <b>{user.surname}</b>{' '}
              </span>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol xs='12' sm='6' md='6' lg='6'>
            <Field
              name='email'
              component={TextField}
              label={'Введите email'}
              group
              type='email'
            />
          </MDBCol>
          <MDBCol
            xs='12'
            sm='6'
            md='6'
            lg='6'
            className='currentLabelContainer'
          >
            {user && user.email && (
              <p className='currentProfileData'>
                <MDBIcon icon='check' className='currentProfileDataCheck' />{' '}
                Текущее значение: <b>{user.email}</b>{' '}
              </p>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol xs='12' sm='6' md='6' lg='6'>
            <Select
              options={optionsSex}
              // closeMenuOnSelect={true}
              // components={animatedComponents}
            />
          </MDBCol>
          <MDBCol
            xs='12'
            sm='6'
            md='6'
            lg='6'
            className='currentLabelContainer'
          >
            {user && user.sex && (
              <span className='currentProfileData'>
                <MDBIcon icon='check' className='currentProfileDataCheck' />{' '}
                Текущее значение: <b>{user.sex}</b>{' '}
              </span>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol xs='12' sm='6' md='6' lg='6'>
            <Field
              name='country'
              component={SelectField}
              label='Страна'
              group
              options={[
                {
                  text: 'Россия',
                  value: 'RUS'
                },
                {
                  text: 'Англия',
                  value: 'ENG'
                },
                {
                  text: 'США',
                  value: 'USA'
                },
                {
                  text: 'Белоруссия',
                  value: 'BLR'
                }
              ]}
              search={false}
            />
          </MDBCol>
          <MDBCol
            xs='12'
            sm='6'
            md='6'
            lg='6'
            className='currentLabelContainer'
          >
            {user && user.country && (
              <span className='currentProfileData'>
                <MDBIcon icon='check' className='currentProfileDataCheck' />{' '}
                Текущее значение: <b>{user.country}</b>{' '}
              </span>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol xs='12' sm='6' md='6' lg='6'>
            <Field
              name='city'
              component={SelectField}
              label='Город'
              group
              options={[
                {
                  text: 'Москва',
                  value: 'MSK'
                },
                {
                  text: 'Санкт-Петербург',
                  value: 'SPB'
                },
                {
                  text: 'Владивосток',
                  value: 'VLD'
                },
                {
                  text: 'Севастополь',
                  value: 'SVS'
                }
              ]}
              search={false}
            />
          </MDBCol>
          <MDBCol xs='12' sm='6' md='6' lg='6'>
            {user && user.city && (
              <span className='currentProfileData'>
                Текущее значение: <b>{user.city}</b>{' '}
              </span>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol xs='12' sm='6' md='6' lg='6'>
            <Field
              name='target'
              component={SelectField}
              label='Кого Вы ищете?'
              group
              options={[
                {
                  text: 'Женщину',
                  value: 'female'
                },
                {
                  text: 'Мужчину',
                  value: 'male'
                },
                {
                  text: 'Никого не ищу',
                  value: 'nobody'
                },
                {
                  text: 'Не важно',
                  value: 'other'
                }
              ]}
              search={false}
            />
          </MDBCol>
          <MDBCol xs='12' sm='6' md='6' lg='6'>
            {user && user.target && (
              <span className='currentProfileData'>
                <MDBIcon icon='check' className='currentProfileDataCheck' />{' '}
                Текущее значение: <b>{user.target}</b>{' '}
              </span>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol xs='12' sm='6' md='6' lg='6'>
            <Field
              name='reason'
              component={SelectField}
              label='Цель Вашего пребывания здесь'
              group
              options={[
                {
                  text: 'Серьезные отношения',
                  value: 'serious'
                },
                {
                  text: 'Не серьезные отношения',
                  value: 'not-serious'
                },
                {
                  text: 'Забава',
                  value: 'fun'
                },
                {
                  text: 'Просто так',
                  value: 'no-sense'
                }
              ]}
              search={false}
            />
          </MDBCol>
          <MDBCol xs='12' sm='6' md='6' lg='6'>
            {user && user.reason && (
              <span className='currentProfileData'>
                <MDBIcon icon='check' className='currentProfileDataCheck' />{' '}
                Текущее значение: <b>{user.reason}</b>{' '}
              </span>
            )}
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            <MDBBtn className='adminBtn' onClick={e => handleSubmit}>
              Сохранить
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </form>
  );
};

const validate = values => {
  const errors = {};

  if (values && !values.header) {
    errors.header = 'Вы не заполнили поле темы сообщения';
  }

  if (values && !values.message) {
    errors.header = 'Вы не заполнили поле сообщения';
  }

  return errors;
};

export default reduxForm({
  form: 'profileForm',
  validate,
  destroyOnUnmount: false
})(ProfileView);
