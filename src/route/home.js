import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Meals from "./meal";
import Community from "./community";
import SchoolMap from "./school";
import { Navigate, useNavigate } from "react-router-dom";
import Catmap from "./catmap";


function Home() {

    let navigate = useNavigate();

    return (
        <>
            <Container>
                <div>
                    <br />
                    {/* <InputGroup className="mb-3">
                        <Form.Control placeholder='게시물 및 사용자 검색' />
                        <InputGroup.Text onClick={() => console.log(1)}>🔍︎</InputGroup.Text>
                    </InputGroup> */}
                </div>
                {/* Stack the columns on mobile by making one full-width and the other half-width */}
                <Row>
                    <Col xs={12} md={8}>
                        <Community/>
                    </Col>
                    <Col xs={6} md={4}>
                        <Meals/>
                    </Col>
                </Row>
                <br/> <br/>

                {/* Columns are always 50% wide, on mobile and desktop */}
                <Row>
                    <Col xs={10} md={6}>
                        <div onClick={()=>{navigate('/booking')}}>
                            <br/><br/>
                            <b>자습실 예약하러 가기</b>
                            <br/><br/>
                            <img src={`${process.env.PUBLIC_URL}/schoolmap.png`} className='img-fluid' alt='logo'/>
                            <a style={{'fontSize' : '10px'}}>※ 상기 이미지는 예시입니다. 자세한 내용은 클릭하여 확인하세요.</a>
                        </div>
                    </Col>
                    <Col xs={8} md={6}>
                        <br/><br/>
                        <b>포냥이 현재 위치 파악하기</b>
                        <br/><br/>
                        <Catmap/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Home;