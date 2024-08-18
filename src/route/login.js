import axios from 'axios';
import '../App.css';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function Signup() {

    const navigate = useNavigate();

    const submit = () => {

        if (info === '' || pass === '') {
            window.alert('입력되지 않은 값이 있습니다.');
        } else {
            axios.post('https://posan-web.vercel.app/login', {
                info: info,
                password: pass,
            }).then((result) => {
                if (result.data === '정보') {
                    window.alert('정보가 없는 사용자입니다.');
                } else if (result.data === '비밀번호') {
                    window.alert('비밀번호가 맞지 않습니다.');
                } else {
                    let d = String(result.data).split(',');
                    let session_id = d[1];
                    if (d[0] == '성공') {
                        sessionStorage.setItem('info', info);
                        sessionStorage.setItem('session_id', session_id);
                        navigate('/');
                    } else {
                        sessionStorage.setItem('info', info);
                        sessionStorage.setItem('session_id', session_id);
                        navigate(`/yaxNP@w9V+d!@yn/${info}`);
                    }
             
                    
                }
            });
        }
    };
    
    const [info, setInfo] = useState('');
    const [pass, setPass] = useState('');
    const dispatch = useDispatch();


    return (
        <Container>
            <br/><br/><br/><br/><br/><br/>
            <div className="form-box" style={{ maxWidth: '700px', margin: '0 auto' }}>
                <h4>Posan Service</h4>
                
                <input 
                    placeholder='아이디' 
                    name='info' 
                    onChange={(e) => setInfo(e.target.value)} 
                    type='text' 
                    style={{ width: '100%', height : '70px', marginBottom: '10px' }} 
                />
                
                
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
        </Container>
    );
}

export default Signup;
