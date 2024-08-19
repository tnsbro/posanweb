import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
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
    let [comments, setComments] = useState([]);
    let edit = useSelector((state) => state.communityedit);
    let [reload, setReload] = useState(true);
    let [about, setAbout] = useState(false);
    let [commentwrite, setCommentwrite] = useState('');
    let [commentshow, setCommentshow] = useState(false);
    const textareaRef = useRef(null);

    const { id } = useParams();
    useEffect(() => {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
    }, [commentwrite]);

    useEffect(() => {
        axios.get(`https://posan-web.vercel.app/view/${id}`)
            .then((result) => {
                if (result.data == '잘못된 접근') {
                    window.alert('잘못된 접근입니다.');
                    navigate('/community');
                } else {
                    setTitle(result.data[0]['title']);
                    setContents(result.data[0]['contents']);
                    setWriter(result.data[0]['writer']);
                    setViewwriter(result.data[0]['name']);
                    setView(result.data[0]['view']);
                    setGood(result.data[0]['good']);

                    setComments(result.data[1]);
                }
            });
    }, [reload]);

    useEffect(() => {
        document.getElementById('contents').innerHTML = contents;
    }, [contents]);


    return (
        <>
            {
                edit ? <Edit contents={contents} title={title} id={id} /> :
                    <div id='all'>
                        <div style={{ 'borderBottom': '2px solid black' }}>
                            <br />
                            <br />
                            <div id='title'>
                                <div style={{ 'display': 'flex', 'justify-content': 'space-between', 'align-items': 'center' }}>
                                    <div>
                                        <h5 style={{ 'textAlign': 'left' }}><b>{title}</b></h5>
                                    </div>
                                    {
                                        writer == sessionStorage.getItem('info') ?
                                            <div>
                                                {
                                                    about ?
                                                        <div style={{ textAlign: 'left' }}>
                                                            <a style={{ 'cursor': 'pointer' }} onClick={() => {
                                                                setAbout(false);
                                                            }}>
                                                                ✖ㅤ
                                                            </a>
                                                            <button className='del-btn' onClick={() => {
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
                                                            }}>글 삭제</button>ㅤ
                                                            <button className='edit-btn' onClick={() => {
                                                                dispatch(setEdit(true));
                                                            }}>글 수정</button>
                                                        </div>
                                                        : <a style={{ 'cursor': 'pointer' }} onClick={() => {
                                                            setAbout(true);
                                                        }}><h4>⋮</h4></a>

                                                }

                                            </div> : null
                                    }
                                </div>


                                <p style={{ 'textAlign': 'left' }}>작성자 : {viewwriter}</p>
                                <p style={{ 'textAlign': 'right' }}>조회수 : {view}  좋아요 : {good}</p>
                            </div>
                        </div>

                        <br />

                        <div id="contents" style={{ 'textAlign': 'left' }}>
                        </div>
                        <br />
                        <br />
                        <div style={{ 'borderTop': '2px solid black', 'textAlign': 'left' }}>
                            <br />
                            <p><b>댓글 {comments.length}개</b></p>
                            <div className="comment-container" >
                                <textarea
                                    ref={textareaRef}
                                    value={commentwrite}
                                    onChange={(e) => { setCommentwrite(e.target.value); }}
                                    placeholder="댓글을 입력하세요..."
                                    className="comment-textarea"
                                />
                                <button className="comment-submit-btn" disabled={!commentwrite.trim()} onClick={() => {
                                    axios.post('https://posan-web.vercel.app/commentsadd', {
                                        target: id,
                                        contents: commentwrite,
                                        writer: sessionStorage.getItem('info'),
                                        name: (String)(commentshow)
                                    }).then((result) => {
                                        if (result.data = '성공') {
                                            setCommentwrite('');
                                            setReload(!reload);
                                        }
                                    })
                                }}>댓글</button>
                            </div>
                            <div className="checkbox-container">
                                    <input
                                        type="checkbox"
                                        id="realNameCheckbox"
                                        checked={commentshow}
                                        onChange={()=>{setCommentshow(!commentshow)}}
                                    />
                                    <label htmlFor="realNameCheckbox">실명 공개</label>
                                </div>
                            <br /><br />
                            {
                                comments.map((a, i) => {
                                    let data = Object.values(a)[0];
                                    return (
                                        <div id={`comment${i}`} style={{ 'borderTop': '2px solid lightgray' }}>
                                            <br />
                                            <div style={{ 'display': 'flex', 'justify-content': 'space-between', 'align-items': 'center' }}>
                                                <div>
                                                    <p><b>{data['name']}</b></p>
                                                </div>
                                                {
                                                    data['writer'] == sessionStorage.getItem('info') ?
                                                        <div id={`commentabout${i}`}>
                                                            <a style={{ 'cursor': 'pointer' }} onClick={() => {
                                                                
                                                            }}><h4>⋮</h4></a>
                                                        </div> : null
                                                }
                                            </div>
                                            {data['contents']}
                                            <br /><br />
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
            }

        </>
    )
};

export default View;