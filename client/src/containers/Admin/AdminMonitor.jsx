import React, { Component } from 'react';
import { MDBRow, MDBContainer, MDBCol, MDBBtn } from 'mdbreact';
import './styles.css';
import UsersControl from './Users';

const AdminMonitor = props => {
  const { content } = props;
  return (
    <MDBContainer className='adminMonitor-cont' fluid>
      <MDBRow>
        <MDBCol size={12}>{content === 'users' && <UsersControl />}</MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default AdminMonitor;
