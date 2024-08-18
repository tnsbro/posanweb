import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

function Navigatebar() {

  let navigate = useNavigate()

  return (
    <>
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">Rooky<span style={{ 'color': 'red' }}>.</span></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/booking">자습실 예약</Nav.Link>
            <Nav.Link href="/community">커뮤니티</Nav.Link>
            <Nav.Link href="/moningsong">기상송 신청</Nav.Link>
          </Nav>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
              <img src={`${process.env.PUBLIC_URL}/user.png`} className='profile' alt='logo' style={{ height: '50px', width: '50px' }} onClick={()=>{navigate('/mypage')}} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigatebar;