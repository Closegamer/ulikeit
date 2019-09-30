import React, { Component } from 'react';
import { MDBRow, MDBContainer, MDBCol, MDBBtn } from 'mdbreact';
import './styles.css';
import AdminMonitor from './AdminMonitor';

export class Admin extends Component {
  state = {
    content: null
  };

  handleMonitorChange = contentType => {
    if (contentType === 'users') {
      this.setState({ content: 'users' });
    }
    if (contentType === 'courses') {
      this.setState({ content: 'courses' });
    }
    if (contentType === 'articles') {
      this.setState({ content: 'articles' });
    }
    if (contentType === 'partners') {
      this.setState({ content: 'partners' });
    }
  };

  render() {
    const { content } = this.state;

    return (
      <MDBContainer className='main-container adminka-main-container' fluid>
        <MDBRow>
          <MDBCol xl='12' xs='12' className='contentArea-container'>
            <h3>Панель администратора</h3>
            <MDBRow className='adminButtons-cont'>
              <MDBCol size={2}>
                <MDBRow>
                  <MDBCol lg={3} xs={12}>
                    <MDBBtn
                      className='adminBtn'
                      onClick={e => this.handleMonitorChange('courses')}
                    >
                      Курсы
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol lg={3} xs={12}>
                    <MDBBtn
                      className='adminBtn'
                      onClick={e => this.handleMonitorChange('articles')}
                    >
                      Статьи
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol lg={3} xs={12}>
                    <MDBBtn
                      className='adminBtn'
                      onClick={e => this.handleMonitorChange('users')}
                    >
                      Пользователи
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol lg={3} xs={12}>
                    <MDBBtn
                      className='adminBtn'
                      onClick={e => this.handleMonitorChange('partners')}
                    >
                      Партнеры
                    </MDBBtn>
                  </MDBCol>
                </MDBRow>
              </MDBCol>
              <MDBCol size={10}>
                <AdminMonitor content={content} />
              </MDBCol>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Admin;
