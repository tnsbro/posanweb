import axios from 'axios';
import '../App.css'
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';

function Mypage() {

    let info = sessionStorage.getItem("info");

    let navigate = useNavigate();

    let result = useQuery('mypage', () =>
        axios.post('https://posan-web.vercel.app/mypage', { 'info': info })
            .then((response) => response.data)
    );

    if (result.isLoading) {
        return <div>Loading...</div>;
    }

    if (result.isError) {
        return <div>Error: {result.error.message}</div>;
    }

    const { data } = result;
    const name = data?.name || 'Unknown';
    const selfStudyTimes = ['점심시간', '저녁시간', '8,9교시', '1자', '2자'];

    return (
        <div style={{ textAlign: 'left' }}>
            <br /><br /><br /><br /><br />
            <img src={`${process.env.PUBLIC_URL}/user.png`} className='profile' alt='logo' style={{ height: '100px', width: '100px' }} />
            <span style={{ fontSize: '25px' }}> {name}</span>
            <br /><br />
            <Row>
                <h3>오늘의 자습실</h3>
                <br /><br />
                {selfStudyTimes.map((time, index) => {
                    let selfclass = data['자습'][time] ? data['자습'][time] : '미정';
                    if (selfclass.indexOf('대기') != -1) { //대기 중인 교실이라면
                        console.log(selfclass)
                        selfclass = selfclass.substring(0, selfclass.length-6);
                        return (
                            <h4 key={index}>{time} : {selfclass} <button onClick={() => {
                                axios.post('https://posan-web.vercel.app/delclass', 
                                    { 
                                        'info': info,
                                        'Class': selfclass,
                                        'time' : time
                                    })
                                    .then((result) => {
                                        if (result.data == '성공') {
                                            window.alert('정상적으로 처리되었습니다.');
                                            window.location.reload();
                                        } else {
                                            window.alert(result.data);
                                            navigate('/')
                                        }
                                    })
                            }}>대기 취소</button></h4>
                        );
                    } else {
                        return (
                            <h4 key={index}>{time} : {selfclass}</h4>
                        );
                    }

                })}
            </Row>
            <button onClick={()=>{
                sessionStorage.clear();
                navigate('/');
            }}>로그아웃</button>
        </div>
    );
}

export default Mypage;
