import React, { Component } from 'react';
import { MDBRow, MDBContainer, MDBCol, MDBBtn, MDBNavLink } from 'mdbreact';
import axios from 'axios';
import '../styles.css';

export class UsersControl extends Component {
  state = {
    isLoading: true,
    error: '',
    articles: ''
  };

  componentDidMount() {
    return axios
      .post(`/api/public/load-artices`)
      .then(response => {
        if (response.data.success) {
          this.setState({
            isLoading: false,
            error: '',
            articles: response.data.articles
          });
        } else {
          this.setState({ isLoading: false, error: response.data.error });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          isLoading: false,
          error: error.response.data.error
        });
      });
  }

  render() {
    return (
      <MDBContainer>
        <MDBRow>
          <MDBCol>
            <MDBNavLink to={`/public/articles/list`}>
              <MDBBtn className='adminBtn'>Все статьи</MDBBtn>
            </MDBNavLink>
          </MDBCol>
          <MDBCol>
            <MDBNavLink to={`/public/articles/create`}>
              <MDBBtn className='adminBtn'>Создать новую</MDBBtn>
            </MDBNavLink>
          </MDBCol>
          <MDBCol>
            <MDBNavLink to={`/public/articles/edit`}>
              <MDBBtn className='adminBtn'>Редактировать</MDBBtn>
            </MDBNavLink>
          </MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol>
            {!this.state.articles[0] ? (
              <div>Статей не найдено</div>
            ) : (
              <div className='monitor-cont'>
                <h4>Все статьи</h4>
                <table className='table table-striped text-center'>
                  <thead>
                    <tr>
                      <th scope='col'>Nick</th>
                      <th scope='col'>Email</th>
                      <th scope='col'>Role</th>
                      <th scope='col'>Balance</th>
                      <th scope='col'>Contribution</th>
                      <th scope='col'>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.users.map((user, index) => {
                      return (
                        <tr key={index}>
                          <td>{user.nick}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>{user.balance}</td>
                          <td>{user.contribution}</td>
                          <td>{user.date}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default UsersControl;
