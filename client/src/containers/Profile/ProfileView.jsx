import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { MDBBtn } from 'mdbreact';
import { TextField, TextArea, SelectField } from '../../fields';
import './styles.css';
import '../Admin/styles.css';

const ProfileView = props => {
  const { handleSubmit, initialValues } = props;
  return (
    <form onSubmit={handleSubmit} autoComplete='on'>
      <Field
        name='user'
        component={TextField}
        label={'Представьтесь, пожалуйста'}
        group
        type='text'
      />
      <Field
        name='email'
        component={TextField}
        label={'Введите email'}
        group
        type='email'
      />
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
