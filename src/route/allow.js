import axios from 'axios';
import '../App.css'
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate, useParams } from 'react-router-dom';


function Allow() {

    const navigate = useNavigate();
    let [success, setSuccess] = useState(false);

    let { id } = useParams();

    useEffect(()=>{
        axios.get(`https://posan-web.vercel.app/teachercheck/${id}`)
        .then((result) => {
            if (result.data != '성공') {
                navigate('/');
            }
         })
    })

    const submit = () => {

        if (pass === '') {
            window.alert('입력되지 않은 값이 있습니다.');
        } else {
            axios.post('https://posan-web.vercel.app/login', {
                info : id,
                password: pass,
            }).then((result) => {
                if (result.data === '비밀번호') {
                    window.alert('비밀번호가 맞지 않습니다.');
                } else {
                    setSuccess(true);
                }
            });
        }
    };

    const [pass, setPass] = useState('');


    return (
        <>
            {
                success ? <SetAllow/> : <>
                <br/><br/><br/><br/><br/><br/>
                <div className="form-box" style={{ maxWidth: '700px', margin: '0 auto' }}>
                    <h4>Posan Service</h4>
                    
                    <input 
                        placeholder="비밀번호" 
                        name='pass' 
                        onChange={(e) => setPass(e.target.value)} 
                        type="password" 
                        style={{ width: '100%', height : '70px', marginBottom: '10px' }} 
                    />   
    
                    <button 
                        type="submit" 
                        onClick={submit} 
                        style={{ width: '100%' }}
                    >
                        로그인
                    </button>
                </div>
                </>
            } 

        </>
    );
}

function SetAllow() {

    let info = sessionStorage.getItem("info");

    let result = useQuery('mypage', () =>
        axios.get('https://posan-web.vercel.app/teacher')
            .then((response) => response.data)
    );

    if (result.isLoading) {
        return <div>Loading...</div>;
    }

    if (result.isError) {
        return <div>Error: {result.error.message}</div>;
    }

    let data = Object.entries(result.data);

    return (
        <div style={{ textAlign: 'left' }}>
            <Row>
                <h3>승인 대기 중인 교실</h3>
                <br /><br />
                {
                    data.map((Class, index) => (
                        <>
                            <h4 key={index}>{Class[0]} :</h4>
                            {
                                Object.entries(data[index][1]).map((time, i) => {
                                    let d = Object.entries(time[1])[0];
                                    console.log(d)
                                    return (
                                        <>
                                        <h6>{d[0]} - 대표 학생 : {d[1]['student']} / 목적 : {d[1]['purpose']} /
                                        팀원 : {
                                            d[1]['friends'].map((f, i)=>(
                                                <span>{f},</span>
                                            ))
                                        } /
                                        추가 정보 : {d[1]['plus']}<button onClick={()=>{
                                            axios.post('https://posan-web.vercel.app/allowed', {
                                                Class : Class[0],
                                                time : d[0],
                                                person : [d[1]['student'], ...d[1]['friends']],
                                                location : d[1]['location']
                                            }).then((result) => {
                                                if (result.data === '성공') {
                                                    window.alert('성공적으로 승인되었습니다.');
                                                } else {
                                                    window.alert('에러')
                                                }
                                            });
                                        }}>승인</button></h6>
                                        </>
                                    )   
                                }) 
                            }
                            <br/><br/>
                        </>
                    ))} 
            </Row>
        </div>
    );
}

export default Allow;
