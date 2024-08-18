import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import './../App.css'
import { useDispatch, useSelector } from "react-redux";
import { registerModal } from "../store";
import './../App.css'
import axios from "axios";



function Register(props) {
    let data1 = useSelector((state) => state.register);
    let data2 = useSelector((state) => state.selectedclass);
    let [error, setError] = useState('');
    let [plus, setPlus] = useState('없음.');
    let [friends, setFriends] = useState([]);
    let [friend, setFriend] = useState();
    let [purpose, setPurpose] = useState('CLE');
    let location = data2[1];
    let select = data2[0];
    let time = props.time
    let dispatch = useDispatch();

    useEffect(()=>{
        setFriend('');
        setFriends([])
        setPlus('')
    },[])

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            let frist = friend.trim();
            let friends_list = frist.split(' ');
            let draft = friends;
            let first = [...draft, ...friends_list];
            let newList = [...new Set(first)];
            setFriends(newList);
            setFriend('');
            console.log(newList)
            let target = document.getElementById('friend');
            target.value = '';
        }
    };

    return (
        <div>
            {data1 && (
                <div className="modal-background">
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close" onClick={() => {dispatch(registerModal(false)); setError("");}}>&times;</span>
                        <div>
                            <Container>
                                <h4 style={{ textAlign: 'center' }}>자습실 예약하기</h4>
                                <a style={{color : 'red'}}>{error}</a>
                                <br />
                                <p>신청한 자습실 : {select} ({location})</p>
                                <p>신청한 시간 : {time}</p>
                                <p>신청 사유 :  
                                    <select onChange={(e)=>{setPurpose(e.target.value)}}>
                                        <option value='CLE'>CLE</option>
                                        <option value='동아리'>동아리</option>
                                        <option value='소모임'>소모임</option>
                                        <option value='자습'>자습</option>
                                        <option value='기타'>기타</option>
                                    </select>
                                </p> 
                                <div id='friend_id'>
                                    <p> 같이 하는 사람 :  
                                        <input 
                                            id='friend'
                                            placeholder="아이디"
                                            name='friend' 
                                            onChange={(e) => { setFriend(e.target.value) }} 
                                            onKeyDown={handleKeyDown}
                                            type='text' 
                                        />
                                    </p>
                                </div>
                                {
                                    friends.map((a,i)=>
                                        <button
                                        key={i}
                                        onClick={()=>{
                                            let newList = friends.filter(friend => friend !== a);
                                            setFriends(newList);
                                            
                                        }}
                                        >
                                        {a}
                                        </button>
                                    )
                                }
                                <p> 추가 정보 :  
                                <input 
                                    placeholder="필수 X"
                                    name='plus' 
                                    onChange={(e) => setPlus(e.target.value)} 
                                    type='text' 
                                />
                                </p>
                                <button
                                onClick={()=>{
                                    axios.post('https://posan-web.vercel.app/register', {
                                        class : select,
                                        time : time,
                                        info : sessionStorage.getItem('info'),
                                        friends: friends,
                                        purpose : purpose,
                                        plus : plus,
                                    }).then((result) => {
                                        if (result.data[0] == '성공') {
                                            if (result.data[1].length == 0){
                                                window.alert('정상적으로 처리 되었습니다.')
                                                dispatch(registerModal(false))
                                            } else {
                                                let text = ''
                                                console.log(result.data)
                                                for (let i=0; i < result.data[1].length; i++) {
                                                    text += (String)(result.data[1][i])+" "
                                                }
                                                text += '제외 전부 처리되었습니다.'
                                                window.alert(text)
                                                dispatch(registerModal(false))
                                            }
                                            
                                        } else {
                                            window.alert(result.data[0])
                                        } 
                                    }); 
                                }}
                                >제출
                                </button>
                            </Container>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}


export default Register;