import React, { createRef, ReactChild, ReactFragment, RefObject, useEffect, useMemo, useRef, useState, } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEdit } from '../store';




const formats = [
    'font',
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'align',
    'color',
    'background',
    'size',
    'h1',
    'link',
    'image'
];


function Edit(props) {

    let dispatch = useDispatch();


    const [values, setValues] = useState(props.contents);
    const [title, setTitle] = useState(props.title);
    const reactQuillRef = useRef();
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [viewname, setViewname] = useState(false);


    const uploadImageToFirebase = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('https://posan-web.vercel.app/upload', {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();
            if (response.ok) {
                return result.url;
            } else {
                console.error(result.error);
                return null;
            }
        } catch (error) {
            console.error('Upload failed', error);
            return null;
        }
    };

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            const file = input.files[0]; // 파일 변수 정의
            if (file) {
                const quill = reactQuillRef.current.getEditor();
                const range = quill.getSelection();

                // 로딩 중 이미지 삽입
                const loadingImageURL = `${process.env.PUBLIC_URL}/loading.gif`; // 로딩 중 이미지 URL
                quill.insertEmbed(range.index, 'image', loadingImageURL);

                setIsLoading(true); // 로딩 시작

                try {
                    const imageUrl = await uploadImageToFirebase(file);
                    if (imageUrl) {
                        // 로딩 중 이미지를 실제 이미지로 교체
                        const index = range.index;
                        quill.deleteText(index, 1); // 로딩 중 이미지를 지운 후
                        quill.insertEmbed(index, 'image', imageUrl); // 실제 이미지 삽입
                    }
                } catch (error) {
                    console.error('Error uploading image:', error);
                } finally {
                    setIsLoading(false); // 로딩 종료
                }
            }
        };
    };


let navigate = useNavigate();



const modules = useMemo(() => {
    return {
        toolbar: {
            container: [
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ align: [] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ list: 'ordered' }, { list: 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                [{ color: [] }, { background: [] }],
                ['link', 'image']
            ],
            handlers: {
                image: handleImageUpload,
            }
        },
    };
}, []);

return (
    <>
        <br /><br />
        <div style={{ textAlign: 'left' }}>
            제목 : <input type='text' value={title} onChange={(e) => { setTitle(e.target.value) }} />
            <br/><br />

            실명 공개 :  <input type='checkbox' onClick={(e) => {
                setViewname(!viewname)
            }}/>

            <br /><br />
            <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                onChange={setValues}
                value={values}
                ref={reactQuillRef}
            />
            <br />
            <Button variant="primary" onClick={() => {
                axios.post('https://posan-web.vercel.app/communityedit', {
                    title: title,
                    contents: values,
                    writer: sessionStorage.getItem('info'),
                    name : (String)(viewname),
                    id : props.id
                }).then((result) => {
                    if (result.data['state'] === '잘못된 접근') {
                        window.alert('입력되지 않은 값이 있습니다.');
                    } else {
                        window.alert('수정이 완료되었습니다.')
                        dispatch(setEdit(false));
                        window.location.reload();
                    }
                });
            }}>글 수정</Button>
        </div>
    </>

)
}

export default Edit;