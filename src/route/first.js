import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';



function First() {


  let navigate = useNavigate();




    return (
      <Container>
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <Row>
          <Col><h1>Rooky<span style={{ 'color': 'red' }}>.</span></h1></Col>
          <br /><br /><br /><br />
        </Row>
        <Row>
          <Col sm>
            <div className="d-grid gap-2">
              <Button variant="outline-dark" size="lg" onClick={()=>{navigate('/login')}}>
                LOGIN
              </Button>
            </div>
          </Col>
          {"  "}
          <br /><br />
          <br /><br />
          <Col sm>
            <div className="d-grid gap-2">
              <Button variant="outline-dark" size="lg" onClick={()=>{navigate('/signup')}}>
                SIGN UP
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }

export default First;