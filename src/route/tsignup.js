import axios from 'axios';
import '../App.css';
import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function TSignup() {

    const [name, setName] = useState('');
    const [info, setInfo] = useState('');
    const [pass, setPass] = useState('');
    const [check, setCheck] = useState('black');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const submit = () => {

        if (info === '' || pass === '' || name === '') {
            window.alert('입력되지 않은 값이 있습니다.');
        } else {
            axios.post('https://posan-web.vercel.app/tsignup', {
                info: info,
                password: pass,
                name : name
            }).then((result) => {
                console.log(result)
                if (result.data === '이미') {
                    window.alert('이미 정보가 있는 사용자입니다.');
                } else if (result.data === '잘못') {
                    window.alert('잘못된 아이디입니다.');
                } else {
                    navigate('/login');
                }
            });
        }
    };

    useEffect(()=>{
        const target = document.getElementById('submit');
        if (check == 'black') {
            target.disabled = true;
        } else {
            target.disabled = false;
        }
    },[check])
    

    return (
        <Container>
            <br/><br/><br/><br/><br/><br/>
            <div className="form-box" style={{ maxWidth: '700px', margin: '0 auto' }}>
                <h4>Posan Service</h4>

                <input 
                    placeholder='이름' 
                    name='name' 
                    onChange={(e) => setName(e.target.value)} 
                    type='text' 
                    style={{ width: '100%', height : '70px', marginBottom: '10px' }} 
                />
                
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
                <input 
                    placeholder="비밀번호 확인" 
                    name='pass' 
                    onChange={(e) => {
                        if (e.target.value == pass) {
                            setCheck('green');
                        } else {
                            setCheck('black');
                        }
                    }} 
                    type="password" 
                    style={{ width: '100%', height : '70px', marginBottom: '10px', color : check }} 
                />

                <div style={{'textAlign' : 'right'}}>
                    <a href='/login' style={{'color':'black', 'textDecorationLine':'none'}}>
                        이미 계정이 있으신가요?
                    </a>
                </div>      

                <button 
                    type="submit" 
                    onClick={submit} 
                    style={{ width: '100%' }}
                    id = "submit"
                >회원가입
                    
                </button>
            </div>
        </Container>
    );
}

export default TSignup;
