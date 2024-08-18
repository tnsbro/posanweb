import axios from 'axios';
import { useEffect, useState, } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Edit from './edit';
import { useDispatch, useSelector } from 'react-redux';
import { setEdit } from '../store';
import './../App.css'

function View() {

    let navigate = useNavigate();
    let dispatch = useDispatch();
    let [title, setTitle] = useState('');
    let [contents, setContents] = useState('');
    let [writer, setWriter] = useState('');
    let [viewwriter, setViewwriter] = useState('');
    let [view, setView] = useState(1);
    let [good, setGood] = useState(0);
    let edit = useSelector((state) => state.communityedit);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`https://posan-web.vercel.app/view/${id}`)
            .then((result) => {
                if (result.data == '잘못된 접근') {
                    window.alert('잘못된 접근입니다.');
                    navigate('/community');
                } else {
                    setTitle(result.data['title']);
                    setContents(result.data['contents']);
                    setWriter(result.data['writer']);
                    setViewwriter(result.data['name']);
                    setView(result.data['view']);
                    setGood(result.data['good']);
                }
            });
    }, []);

    useEffect(() => {
        document.getElementById('contents').innerHTML = contents;
    }, [contents]);


    return (
        <>
            {
                edit ? <Edit contents={contents} title={title} id={id} /> :
                    <div id='all'>
                        <div style={{'borderBottom' : '2px solid black'}}>
                            <br />
                            <br />
                            <div id='title'>
                                <h5 style={{ 'textAlign': 'left' }}><b>{title}</b></h5>
                                <p style={{ 'textAlign': 'left' }}>작성자 : {viewwriter}</p>
                                <p style={{'textAlign' : 'right'}}>조회수 : {view}  좋아요 : {good}</p>
                            </div>
                        </div>
                        
                        <br/>

                        <div id="contents" style={{'textAlign' : 'left'}}>
                        </div>

                        <div>

                        </div>
                        <br/><br/>

                        {
                            writer == sessionStorage.getItem('info') ?
                                <div style={{ textAlign: 'left' }}>
                                    <Button variant="danger" onClick={() => {
                                        axios.post('https://posan-web.vercel.app/communitydel', {
                                            target: id,
                                            writer: writer
                                        }).then((result) => {
                                            if (result.data == '성공') {
                                                window.alert('삭제되었습니다.');
                                            } else {
                                                window.alert('잘못된 접근입니다.');
                                            }
                                            navigate('/community');
                                        })
                                    }}>글 삭제</Button> 
                                    <Button variant="secondary" onClick={() => {
                                        dispatch(setEdit(true));
                                    }}>글 수정</Button>
                                </div>
                                : null

                        }
                    </div>
            }

        </>
    )
};

export default View;