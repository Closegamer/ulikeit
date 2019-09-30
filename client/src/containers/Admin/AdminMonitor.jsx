import React, { Component } from 'react';
import { MDBRow, MDBContainer, MDBCol, MDBBtn } from 'mdbreact';
import './styles.css';
import PartnersControl from './Partners';
import UsersControl from './Users';
import CoursesControl from './Courses';
import ArticlesControl from './Articles';

const AdminMonitor = props => {
  const { content } = props;
  return (
    <MDBContainer className='adminMonitor-cont' fluid>
      <MDBRow>
        <MDBCol size={12}>
          {content === 'users' && <UsersControl />}
          {content === 'articles' && <ArticlesControl />}
          {content === 'courses' && <CoursesControl />}
          {content === 'partners' && <PartnersControl />}
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default AdminMonitor;
