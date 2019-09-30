import React, { Component } from 'react';
import { MDBRow, MDBContainer, MDBCol } from 'mdbreact';

export class Footer extends Component {
  render() {
    return (
      <MDBContainer className='footer-container' fluid>
        <MDBRow>
          <MDBCol size={12}>
            <div className='footer-copyright'>
              this.writtenByClosegamer(2019);
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default Footer;
