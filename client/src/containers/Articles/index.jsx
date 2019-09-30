import React, { Component } from 'react';
import { MDBRow, MDBContainer, MDBCol } from 'mdbreact';
import '../../App.css';

export class Articles extends Component {
  render() {
    return (
      <MDBContainer className='main-container' fluid>
        <MDBRow>
          <MDBCol xl='9' xs='12' className='bannerTop-container'>
            <div className='banner728x90custom'></div>
          </MDBCol>
          <MDBCol xl='3' xs='12'></MDBCol>
        </MDBRow>
        <MDBRow>
          <MDBCol xl='9' xs='12' className='contentArea-container'>
            <h3>Статьи</h3>
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

export default Articles;
