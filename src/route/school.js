import React, { useEffect, useState, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import { useSelector, useDispatch } from "react-redux"
import { selectclass, registerModal } from '../store';
import axios from 'axios';
import Register from './register';
import './../App.css'


function SchoolMap() {
    let [time, setTime] = useState('점심시간');
    let [possible, setPossible] = useState({ '0': 0 })
    let dispatch = useDispatch();

    let a = useSelector((state) => state.selectedclass);
    let b = useSelector((state) => state.register);

    useEffect(() => {
        axios.post('https://posan-web.vercel.app/classes', {
            building: a[1],
            time: time
        }).then((result) => {
            setPossible(result.data)
            console.log(result.data)
        });
    }, [a[1], time, b])

    useEffect(() => {
        if (a[0] != '') {
            if (!possible[a[0]]) {
                window.alert('사용할 수 없는 교실입니다.')
            } else if (possible[a[0]] == 'lightgreen') {
                window.alert('승인 대기 중인 교실입니다.')
            } else {
                dispatch(registerModal(true));
            }
        }

    }, [a[0]])

    if (window.location.pathname == '/booking') {
        return (
            <>
                <div>
                    <Container>
                        <select onChange={(e) => { setTime(e.target.value) }}>
                            <option value='점심시간'>점심시간</option>
                            <option value='8,9교시'>8,9교시</option>
                            <option value='1자'>1자</option>
                            <option value='2자'>2자</option>
                            <option value='저녁시간'>저녁시간</option>
                        </select> 
                        <button className='edit-btn' onClick={() => { dispatch(selectclass(['', '자율관 1층'])) }}>자율관 1층</button> 
                        <button className='edit-btn' onClick={() => { dispatch(selectclass(['', '자율관 2층'])) }}>자율관 2층</button> 
                        <button className='edit-btn' onClick={() => { dispatch(selectclass(['', '자율관 3층'])) }}>자율관 3층</button> 
                        <button className='edit-btn' onClick={() => { dispatch(selectclass(['', '자율관 4층'])) }}>자율관 4층</button> 
                        <button className='edit-btn' onClick={() => { dispatch(selectclass(['', '본관 1층'])) }}>본관 1층</button> 
                        <button className='edit-btn' onClick={() => { dispatch(selectclass(['', '본관 2층'])) }}>본관 2층</button> 
                        <button className='edit-btn' onClick={() => { dispatch(selectclass(['', '본관 3층'])) }}>본관 3층</button> 
                        <br /><br /><br /><br />
                        {a[1] == '자율관 1층' && <Free1 possible={possible} />}
                        {a[1] == '자율관 2층' && <Free2 possible={possible} />}
                        {a[1] == '자율관 3층' && <Free3 possible={possible} />}
                        {a[1] == '자율관 4층' && <Free4 possible={possible} />}
                        {a[1] == '본관 1층' && <Main1 possible={possible} />}
                        {a[1] == '본관 2층' && <Main2 possible={possible} />}
                        {a[1] == '본관 3층' && <Main3 possible={possible} />}
                    </Container>

                </div>
                <Register time={time} />
            </>
        );
    } else {
        return (
            <Free1 possible={possible} />
        )
    }
};



function Main1(props) {
    let possible = props.possible

    const [paths, setPaths] = useState([
        { d: "m0,0 45,0 0,120 -45,0 z", name: "과학융합정보실" },
        { d: "m45,0 45,0 0,120 -45,0 z", name: "학력관리실" },
        { d: "m130,0 65,0 0,120 -65,0 z", name: "보건실" },
        { d: "m195,0 65,0 0,120 -65,0 z", name: "방송실" },
        { d: "m260,0 60,0 0,120 -60,0 z", name: "교장실" },
        { d: "m320,0 60,0 0,120 -60,0 z", name: "행정실" },
        { d: "m380,0 60,0 0,120 -60,0 z", name: "화장실(남)" },
        { d: "m440,0 60,0 0,120 -60,0 z", name: "화장실(여)" },
        { d: "m0,150 55,0 0,120 -55,0 z", name: "숙직실" },
        { d: "m55,150 55,0 0,120 -55,0 z", name: "엘리베이터" },
        { d: "m110,150 90,0 0,120 -90,0 z", name: "IB영어연극실" },
        { d: "m200,150 70,0 0,120 -70,0 z", name: "고교학점제실1B" },
        { d: "m270,150 70,0 0,120 -70,0 z", name: "탈의실" },
        { d: "m340,150 70,0 0,120 -70,0 z", name: "미래교육부실" },
        { d: "m450,150 50,0 0,120 -50,0 z", name: "화장실(남)" },
        { d: "m0,300 160,0 0,120 -160,0 z", name: "컴퓨터실" },
        { d: "m160,300 40,0 0,120 -40,0 z", name: "서버실" },
        { d: "m200,300 90,0 0,120 -90,0 z", name: "고교학점제실1A" },
        { d: "m290,300 90,0 0,120 -90,0 z", name: "2-6" },
        { d: "m420,300 40,0 0,120 -40,0 z", name: "인쇄실" },
        { d: "m460,300 40,0 0,120 -40,0 z", name: "방송실" },
    ]);

    const dispatch = useDispatch();
    const svgRef = useRef(null);
    const [boundingBoxes, setBoundingBoxes] = useState({});

    useEffect(() => {
        const calculateBoundingBoxes = () => {
            const svg = svgRef.current;
            const bboxes = {};

            paths.forEach((path, index) => {
                const pathElement = svg.querySelector(`#path-${index}`);
                if (pathElement) {
                    const bbox = pathElement.getBBox();
                    bboxes[index] = bbox;
                }
            });

            setBoundingBoxes(bboxes);
        };

        if (svgRef.current) {
            calculateBoundingBoxes();
        }
    }, [paths]);

    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            const width = window.innerWidth;
            const draft = width / 500;
            setScale(draft >= 1.5 ? 1.5 : draft);
        };
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    const wrapText = (text, width, fontSize) => {
        const words = text.split('');
        let lines = [];
        let currentLine = words[0];

        const context = document.createElement("canvas").getContext("2d");
        context.font = `${fontSize}px Arial`;

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const widthWithWord = context.measureText(currentLine + word).width;
            if (widthWithWord < width) {
                currentLine += word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    };

    const calculateFontSize = (text, width, height) => {
        const context = document.createElement("canvas").getContext("2d");
        let fontSize = 10; // Start with a default font size
        let lines = wrapText(text, width, fontSize);

        while ((lines.length * fontSize) > height) {
            fontSize -= 1;
            lines = wrapText(text, width, fontSize);
        }

        return fontSize;
    };

    return (
        <svg ref={svgRef} width={500 * scale - 30} height={420 * scale} viewBox="0 0 500 420">
            {paths.map((path, index) => (
                <React.Fragment key={index}>
                    <path
                        id={`path-${index}`}
                        d={path.d}
                        fill={possible[path.name] ? possible[path.name] : 'lightgray'}
                        stroke="black"
                        data-content={path.name}
                        onClick={() => { dispatch(selectclass([path.name, '본관 1층'])) }}
                    />
                    {boundingBoxes[index] && (() => {
                        const bbox = boundingBoxes[index];
                        const fontSize = calculateFontSize(path.name, bbox.width, bbox.height);
                        const lines = wrapText(path.name, bbox.width, fontSize);
                        const lineHeight = fontSize * 1.2;
                        return lines.map((line, i) => (
                            <text
                                key={i}
                                x={bbox.x + bbox.width / 2}
                                y={bbox.y + (bbox.height / 2) - ((lines.length - 1) * lineHeight) / 2 + i * lineHeight}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                fontSize={fontSize}
                                fill="black"
                            >
                                {line}
                            </text>
                        ));
                    })()}
                </React.Fragment>
            ))}
        </svg>
    );
}

function Main2(props) {
    let possible = props.possible
    const [paths, setPaths] = useState([
        { d: "m0,0 90,0 0,120 -90,0 z", name: "1-8(IB)" },
        { d: "m130,0 65,0 0,120 -65,0 z", name: "1-7(IB)" },
        { d: "m195,0 65,0 0,120 -65,0 z", name: "1-6" },
        { d: "m260,0 60,0 0,120 -60,0 z", name: "1-5" },
        { d: "m320,0 60,0 0,120 -60,0 z", name: "양치실" },
        { d: "m380,0 60,0 0,120 -60,0 z", name: "화장실(남)" },
        { d: "m440,0 60,0 0,120 -60,0 z", name: "화장실(여)" },
        { d: "m50,150 60,0 0,120 -60,0 z", name: "엘리베이터" },
        { d: "m110,150 90,0 0,120 -90,0 z", name: "2-3" },
        { d: "m200,150 90,0 0,120 -90,0 z", name: "2-4" },
        { d: "m290,150 90,0 0,120 -90,0 z", name: "2-5" },
        { d: "m420,150 40,0 0,120 -40,0 z", name: "화장실(남)" },
        { d: "m460,150 40,0 0,120 -40,0 z", name: "화장실(여)" },
        { d: "m0,300 140,0 0,120 -140,0 z", name: "교무실" },
        { d: "m140,300 60,0 0,120 -60,0 z", name: "상담실" },
        { d: "m200,300 90,0 0,120 -90,0 z", name: "2-2" },
        { d: "m290,300 90,0 0,120 -90,0 z", name: "2-1" },
        { d: "m420,300 80,0 0,120 -80,0 z", name: "2학년실" },
    ]);

    const dispatch = useDispatch();
    const svgRef = useRef(null);
    const [boundingBoxes, setBoundingBoxes] = useState({});
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const calculateBoundingBoxes = () => {
            const svg = svgRef.current;
            const bboxes = {};
            paths.forEach((path, index) => {
                const pathElement = svg.querySelector(`#path-${index}`);
                if (pathElement) {
                    const bbox = pathElement.getBBox();
                    bboxes[index] = bbox;
                }
            });
            setBoundingBoxes(bboxes);
        };
        if (svgRef.current) {
            calculateBoundingBoxes();
        }
    }, [paths]);

    useEffect(() => {
        const updateScale = () => {
            const width = window.innerWidth;
            const draft = width / 500;
            setScale(draft >= 1.5 ? 1.5 : draft);
        };
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    const wrapText = (text, width, fontSize) => {
        const words = text.split('');
        let lines = [];
        let currentLine = words[0];

        const context = document.createElement("canvas").getContext("2d");
        context.font = `${fontSize}px Arial`;

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const widthWithWord = context.measureText(currentLine + word).width;
            if (widthWithWord < width) {
                currentLine += word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    };

    const calculateFontSize = (text, width, height) => {
        const context = document.createElement("canvas").getContext("2d");
        let fontSize = 10;
        let lines = wrapText(text, width, fontSize);
        while ((lines.length * fontSize) > height) {
            fontSize -= 1;
            lines = wrapText(text, width, fontSize);
        }
        return fontSize;
    };

    return (
        <svg ref={svgRef} width={500 * scale - 30} height={420 * scale} viewBox="0 0 500 420">
            {paths.map((path, index) => (
                <React.Fragment key={index}>
                    <path
                        id={`path-${index}`}
                        d={path.d}
                        fill={possible[path.name] ? possible[path.name] : 'lightgray'}
                        stroke="black"
                        data-content={path.name}
                        onClick={() => { dispatch(selectclass([path.name, '본관 2층'])) }} />
                    {boundingBoxes[index] && (() => {
                        const bbox = boundingBoxes[index];
                        const fontSize = calculateFontSize(path.name, bbox.width, bbox.height);
                        const lines = wrapText(path.name, bbox.width, fontSize);
                        const lineHeight = fontSize * 1.2;
                        return lines.map((line, i) => (
                            <text
                                key={i}
                                x={bbox.x + bbox.width / 2}
                                y={bbox.y + (bbox.height / 2) - ((lines.length - 1) * lineHeight) / 2 + i * lineHeight}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                fontSize={fontSize}
                                fill="black"
                            >
                                {line}
                            </text>
                        ));
                    })()}
                </React.Fragment>
            ))}
        </svg>
    );
}

function Main3(props) {
    let possible = props.possible
    const [paths, setPaths] = useState([
        { d: "m0,0 90,0 0,120 -90,0 z", name: "미술실" },
        { d: "m130,0 65,0 0,120 -65,0 z", name: "1-4" },
        { d: "m195,0 65,0 0,120 -65,0 z", name: "1-3" },
        { d: "m260,0 65,0 0,120 -65,0 z", name: "1-2" },
        { d: "m325,0 65,0 0,120 -65,0 z", name: "1-1" },
        { d: "m390,0 55,0 0,120 -55,0 z", name: "화장실(남)" },
        { d: "m445,0 55,0 0,120 -55,0 z", name: "화장실(여)" },
        { d: "m50,150 60,0 0,120 -60,0 z", name: "엘리베이터" },
        { d: "m110,150 100,0 0,120 -100,0 z", name: "IB생명과학실" },
        { d: "m210,150 100,0 0,120 -100,0 z", name: "준비실" },
        { d: "m310,150 100,0 0,120 -100,0 z", name: "IB화학실" },
        { d: "m450,150 50,0 0,120 -50,0 z", name: "화장실(여)" },
        { d: "m0,300 50,0 0,120 -50,0 z", name: "상담실" },
        { d: "m50,300 100,0 0,120 -100,0 z", name: "1학년실" },
        { d: "m150,300 90,0 0,120 -90,0 z", name: "2-7(IB)" },
        { d: "m240,300 50,0 0,120 -50,0 z", name: "원격수업지원실" },
        { d: "m290,300 90,0 0,120 -90,0 z", name: "Wee클래스" },
        { d: "m420,300 80,0 0,120 -80,0 z", name: "음악실" },
    ]);

    const dispatch = useDispatch();
    const svgRef = useRef(null);
    const [boundingBoxes, setBoundingBoxes] = useState({});
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const calculateBoundingBoxes = () => {
            const svg = svgRef.current;
            const bboxes = {};
            paths.forEach((path, index) => {
                const pathElement = svg.querySelector(`#path-${index}`);
                if (pathElement) {
                    const bbox = pathElement.getBBox();
                    bboxes[index] = bbox;
                }
            });
            setBoundingBoxes(bboxes);
        };
        if (svgRef.current) {
            calculateBoundingBoxes();
        }
    }, [paths]);

    useEffect(() => {
        const updateScale = () => {
            const width = window.innerWidth;
            const draft = width / 500;
            setScale(draft >= 1.5 ? 1.5 : draft);
        };
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    const wrapText = (text, width, fontSize) => {
        const words = text.split('');
        let lines = [];
        let currentLine = words[0];

        const context = document.createElement("canvas").getContext("2d");
        context.font = `${fontSize}px Arial`;

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const widthWithWord = context.measureText(currentLine + word).width;
            if (widthWithWord < width) {
                currentLine += word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    };

    const calculateFontSize = (text, width, height) => {
        const context = document.createElement("canvas").getContext("2d");
        let fontSize = 10;
        let lines = wrapText(text, width, fontSize);
        while ((lines.length * fontSize) > height) {
            fontSize -= 1;
            lines = wrapText(text, width, fontSize);
        }
        return fontSize;
    };

    return (
        <svg ref={svgRef} width={500 * scale - 30} height={420 * scale} viewBox="0 0 500 420">
            {paths.map((path, index) => (
                <React.Fragment key={index}>
                    <path
                        id={`path-${index}`}
                        d={path.d}
                        fill={possible[path.name] ? possible[path.name] : 'lightgray'}
                        stroke="black"
                        data-content={path.name}
                        onClick={() => { dispatch(selectclass([path.name, '본관 3층'])) }} />
                    {boundingBoxes[index] && (() => {
                        const bbox = boundingBoxes[index];
                        const fontSize = calculateFontSize(path.name, bbox.width, bbox.height);
                        const lines = wrapText(path.name, bbox.width, fontSize);
                        const lineHeight = fontSize * 1.2;
                        return lines.map((line, i) => (
                            <text
                                key={i}
                                x={bbox.x + bbox.width / 2}
                                y={bbox.y + (bbox.height / 2) - ((lines.length - 1) * lineHeight) / 2 + i * lineHeight}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                fontSize={fontSize}
                                fill="black"
                            >
                                {line}
                            </text>
                        ));
                    })()}
                </React.Fragment>
            ))}
        </svg>
    );
}

function Free1(props) {
    let possible = props.possible

    const [paths, setPaths] = useState([
        { d: "m370,0 40,0 0,230 -40,0 z", name: "복도" },
        { d: "m410,0 150,0 0,180 -150,0 z", name: "기계실" },
        { d: "m410,180 150,0 0,50 -150,0 z", name: "상상제작소2(첨단제작실)" },
        { d: "m210,200 80,0 0,30 -80,0 z", name: "승강기" },
        { d: "m290,200 80,0 0,30 -80,0 z", name: "출입문" },
        { d: "m410,230 150,0 0,30 -150,0 z", name: "" },
        { d: "m0,230 30,0 0,180 -30,0 z", name: "계단" },
        { d: "m30,230 180,0 0,180 -180,0 z", name: "도서관" },
        { d: "m210,230 80,0 0,90 -80,0 z", name: "화장실(남)" },
        { d: "m210,320 80,0 0,90 -80,0 z", name: "화장실(여)" },
        { d: "m290,350 80,0 0,60 -80,0 z", name: "출입문" },
        { d: "m370,350 40,0 0,60 -40,0 z", name: "복도" },
        { d: "m290,230 120,0 0,120 -120,0 z", name: "" },
        { d: "m410,260 150,0 0,30 -150,0 z", name: "계단" },
        { d: "m410,290 150,0 0,60 -150,0 z", name: "상상제작소1(첨단기구실)" },
        { d: "m410,350 150,0 0,60 -150,0 z", name: "과학(준비실)" },
        { d: "m410,410 150,0 0,90 -150,0 z", name: "과학실2(화생)" },
        { d: "m410,500 150,0 0,90 -150,0 z", name: "과학실1(물지)" },
    ]);

    const dispatch = useDispatch();
    const svgRef = useRef(null);
    const [boundingBoxes, setBoundingBoxes] = useState({});
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            const width = window.innerWidth;
            const draft = width / 660;
            setScale(draft >= 1.5 ? 1.5 : draft);
        };
        if (window.location.pathname == '/booking') {
            updateScale();
        } else {
            setScale(1.06);
        } 
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    useEffect(() => {
        const calculateBoundingBoxes = () => {
            const svg = svgRef.current;
            const bboxes = {};
            paths.forEach((path, index) => {
                const pathElement = svg.querySelector(`#path-${index}`);
                if (pathElement) {
                    const bbox = pathElement.getBBox();
                    bboxes[index] = bbox;
                }
            });
            setBoundingBoxes(bboxes);
        };
        if (svgRef.current) {
            calculateBoundingBoxes();
        }
    }, [paths]);



    const wrapText = (text, width, fontSize) => {
        const words = text.split('');
        let lines = [];
        let currentLine = words[0];

        const context = document.createElement("canvas").getContext("2d");
        context.font = `${fontSize}px Arial`;

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const widthWithWord = context.measureText(currentLine + word).width;
            if (widthWithWord < width) {
                currentLine += word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    };

    const calculateFontSize = (text, width, height) => {
        const context = document.createElement("canvas").getContext("2d");
        let fontSize = 10;
        let lines = wrapText(text, width, fontSize);
        while ((lines.length * fontSize) > height) {
            fontSize -= 1;
            lines = wrapText(text, width, fontSize);
        }
        return fontSize;
    };

    return (
        <svg ref={svgRef} width={660 * scale - 30} height={590 * scale} viewBox="0 0 660 590">
            {paths.map((path, index) => (
                <React.Fragment key={index}>
                    <path
                        id={`path-${index}`}
                        d={path.d}
                        fill={possible[path.name] ? possible[path.name] : 'lightgray'}
                        stroke="black"
                        data-content={path.name}
                        onClick={() => { dispatch(selectclass([path.name, '자율관 1층'])) }} />
                    {boundingBoxes[index] && (() => {
                        const bbox = boundingBoxes[index];
                        const fontSize = calculateFontSize(path.name, bbox.width, bbox.height);
                        const lines = wrapText(path.name, bbox.width, fontSize);
                        const lineHeight = fontSize * 1.2;
                        return lines.map((line, i) => (
                            <text
                                key={i}
                                x={bbox.x + bbox.width / 2}
                                y={bbox.y + (bbox.height / 2) - ((lines.length - 1) * lineHeight) / 2 + i * lineHeight}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                fontSize={fontSize}
                                fill="black"
                            >
                                {line}
                            </text>
                        ));
                    })()}
                </React.Fragment>
            ))}
        </svg>
    );
}

function Free2(props) {
    let possible = props.possible

    const [paths, setPaths] = useState([
        { d: "m490,0 190,0 0,80 -190,0 z", name: "직원휴게실(남)" },
        { d: "m490,80 40,0 0,120 -40,0 z", name: "복도" },
        { d: "m530,80 150,0 0,40 -150,0 z", name: "직원휴게실(여)" },
        { d: "m530,120 150,0 0,40 -150,0 z", name: "화장실" },
        { d: "m530,160 150,0 0,40 -150,0 z", name: "화장실" },
        { d: "m0,200 530,0 0,30 -530,0 z", name: "복도" },
        { d: "m530,200 150,0 0,30 -150,0 z", name: "계단" },
        { d: "m0,230 30,0 0,150 -30,0 z", name: "계단" },
        { d: "m30,230 120,0 0,150 -120,0 z", name: "고교학점제2A" },
        { d: "m150,230 120,0 0,150 -120,0 z", name: "고교학점제2B" },
        { d: "m260,230 120,0 0,150 -120,0 z", name: "고교학점제2C" },
        { d: "m380,230 50,0 0,150 -50,0 z", name: "다용도실" },
        { d: "m430,230 100,0 0,150 -100,0 z", name: "포산스퀘어" },
        { d: "m530,230 150,0 0,80 -150,0 z", name: "진로교실" },
        { d: "m530,310 150,0 0,90 -150,0 z", name: "자기주도학습실1" },
        { d: "m530,400 150,0 0,90 -150,0 z", name: "자기주도학습실2" },
        { d: "m490,380 40,0 0,110 -40,0 z", name: "복도" },
    ]);

    const dispatch = useDispatch();
    const svgRef = useRef(null);
    const [boundingBoxes, setBoundingBoxes] = useState({});
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const calculateBoundingBoxes = () => {
            const svg = svgRef.current;
            const bboxes = {};
            paths.forEach((path, index) => {
                const pathElement = svg.querySelector(`#path-${index}`);
                if (pathElement) {
                    const bbox = pathElement.getBBox();
                    bboxes[index] = bbox;
                }
            });
            setBoundingBoxes(bboxes);
        };
        if (svgRef.current) {
            calculateBoundingBoxes();
        }
    }, [paths]);

    useEffect(() => {
        const updateScale = () => {
            const width = window.innerWidth;
            const draft = width / 680;
            setScale(draft >= 1.5 ? 1.5 : draft);
        };
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    const wrapText = (text, width, fontSize) => {
        const words = text.split('');
        let lines = [];
        let currentLine = words[0];

        const context = document.createElement("canvas").getContext("2d");
        context.font = `${fontSize}px Arial`;

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const widthWithWord = context.measureText(currentLine + word).width;
            if (widthWithWord < width) {
                currentLine += word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    };

    const calculateFontSize = (text, width, height) => {
        const context = document.createElement("canvas").getContext("2d");
        let fontSize = 10;
        let lines = wrapText(text, width, fontSize);
        while ((lines.length * fontSize) > height) {
            fontSize -= 1;
            lines = wrapText(text, width, fontSize);
        }
        return fontSize;
    };

    return (
        <svg ref={svgRef} width={680 * scale - 30} height={490 * scale} viewBox="0 0 680 490">
            {paths.map((path, index) => (
                <React.Fragment key={index}>
                    <path
                        id={`path-${index}`}
                        d={path.d}
                        fill={possible[path.name] ? possible[path.name] : 'lightgray'}
                        stroke="black"
                        data-content={path.name}
                        onClick={() => { dispatch(selectclass([path.name, '자율관 2층'])) }} />
                    {boundingBoxes[index] && (() => {
                        const bbox = boundingBoxes[index];
                        const fontSize = calculateFontSize(path.name, bbox.width, bbox.height);
                        const lines = wrapText(path.name, bbox.width, fontSize);
                        const lineHeight = fontSize * 1.2;
                        return lines.map((line, i) => (
                            <text
                                key={i}
                                x={bbox.x + bbox.width / 2}
                                y={bbox.y + (bbox.height / 2) - ((lines.length - 1) * lineHeight) / 2 + i * lineHeight}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                fontSize={fontSize}
                                fill="black"
                            >
                                {line}
                            </text>
                        ));
                    })()}
                </React.Fragment>
            ))}
        </svg>
    );
}

function Free3(props) {

    let possible = props.possible
    const [paths, setPaths] = useState([
        { d: "m490,0 40,0 0,50 -40,0 z", name: "진학상담실" },
        { d: "m490,50 40,0 0,110 -40,0 z", name: "복도" },
        { d: "m530,0 150,0 0,80 -150,0 z", name: "3학년 교무실" },
        { d: "m530,80 150,0 0,40 -150,0 z", name: "화장실" },
        { d: "m530,120 150,0 0,40 -150,0 z", name: "화장실" },
        { d: "m0,160 530,0 0,30 -530,0 z", name: "복도" },
        { d: "m530,160 150,0 0,30 -150,0 z", name: "계단" },
        { d: "m0,190 30,0 0,150 -30,0 z", name: "계단" },
        { d: "m30,190 130,0 0,150 -130,0 z", name: "3-1" },
        { d: "m160,190 100,0 0,150 -100,0 z", name: "3-2" },
        { d: "m260,190 100,0 0,150 -100,0 z", name: "3-3" },
        { d: "m360,190 100,0 0,150 -100,0 z", name: "기숙사생활교육실" },
        { d: "m460,190 70,0 0,150 -70,0 z", name: "홈베이스" },
        { d: "m530,190 150,0 0,80 -150,0 z", name: "3-4" },
        { d: "m530,270 150,0 0,90 -150,0 z", name: "3-5" },
        { d: "m530,360 150,0 0,90 -150,0 z", name: "3-6 (IB)" },
        { d: "m490,340 40,0 0,110 -40,0 z", name: "복도" },
    ]);

    const dispatch = useDispatch();
    const svgRef = useRef(null);
    const [boundingBoxes, setBoundingBoxes] = useState({});
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const calculateBoundingBoxes = () => {
            const svg = svgRef.current;
            const bboxes = {};
            paths.forEach((path, index) => {
                const pathElement = svg.querySelector(`#path-${index}`);
                if (pathElement) {
                    const bbox = pathElement.getBBox();
                    bboxes[index] = bbox;
                }
            });
            setBoundingBoxes(bboxes);
        };
        if (svgRef.current) {
            calculateBoundingBoxes();
        }
    }, [paths]);

    useEffect(() => {
        const updateScale = () => {
            const width = window.innerWidth;
            const draft = width / 680;
            setScale(draft >= 1.5 ? 1.5 : draft);
        };
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    const wrapText = (text, width, fontSize) => {
        const words = text.split('');
        let lines = [];
        let currentLine = words[0];

        const context = document.createElement("canvas").getContext("2d");
        context.font = `${fontSize}px Arial`;

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const widthWithWord = context.measureText(currentLine + word).width;
            if (widthWithWord < width) {
                currentLine += word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    };

    const calculateFontSize = (text, width, height) => {
        const context = document.createElement("canvas").getContext("2d");
        let fontSize = 10;
        let lines = wrapText(text, width, fontSize);
        while ((lines.length * fontSize) > height) {
            fontSize -= 1;
            lines = wrapText(text, width, fontSize);
        }
        return fontSize;
    };

    return (
        <svg ref={svgRef} width={680 * scale - 30} height={450 * scale} viewBox="0 0 680 450" >
            {paths.map((path, index) => (
                <React.Fragment key={index}>
                    <path
                        id={`path-${index}`}
                        d={path.d}
                        fill={possible[path.name] ? possible[path.name] : 'lightgray'}
                        stroke="black"
                        data-content={path.name}
                        onClick={() => { dispatch(selectclass([path.name, '자율관 3층'])) }} />
                    {boundingBoxes[index] && (() => {
                        const bbox = boundingBoxes[index];
                        const fontSize = calculateFontSize(path.name, bbox.width, bbox.height);
                        const lines = wrapText(path.name, bbox.width, fontSize);
                        const lineHeight = fontSize * 1.2;
                        return lines.map((line, i) => (
                            <text
                                key={i}
                                x={bbox.x + bbox.width / 2}
                                y={bbox.y + (bbox.height / 2) - ((lines.length - 1) * lineHeight) / 2 + i * lineHeight}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                fontSize={fontSize}
                                fill="black"
                            >
                                {line}
                            </text>
                        ));
                    })()}
                </React.Fragment>
            ))}
        </svg>
    );
}

function Free4(props) {

    let possible = props.possible
    const [paths, setPaths] = useState([
        { d: "m0,0 530,0 0,30 -530,0 z", name: "복도" },
        { d: "m530,0 70,0 0,30 -70,0 z", name: "계단" },
        { d: "m600,0 120,0 0,30 -120,0 z", name: "" },
        { d: "m0,30 30,0 0,150 -30,0 z", name: "계단" },
        { d: "m30,30 140,0 0,150 -140,0 z", name: "고교학점제실4A" },
        { d: "m170,30 145,0 0,150 -145,0 z", name: "고교학점제실4B" },
        { d: "m315,30 145,0 0,150 -145,0 z", name: "고교학점제실4C" },
        { d: "m460,30 70,0 0,150 -70,0 z", name: "진로상담실" },
        { d: "m530,30 70,0 0,260 -70,0 z", name: "복도" },
        { d: "m600,30 120,0 0,130 -120,0 z", name: "화장실" },
        { d: "m600,160 120,0 0,130 -120,0 z", name: "화장실" },
    ]);

    const dispatch = useDispatch();
    const svgRef = useRef(null);
    const [boundingBoxes, setBoundingBoxes] = useState({});
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const calculateBoundingBoxes = () => {
            const svg = svgRef.current;
            const bboxes = {};
            paths.forEach((path, index) => {
                const pathElement = svg.querySelector(`#path-${index}`);
                if (pathElement) {
                    const bbox = pathElement.getBBox();
                    bboxes[index] = bbox;
                }
            });
            setBoundingBoxes(bboxes);
        };
        if (svgRef.current) {
            calculateBoundingBoxes();
        }
    }, [paths]);

    useEffect(() => {
        const updateScale = () => {
            const width = window.innerWidth;
            const draft = width / 730;
            setScale(draft >= 1.5 ? 1.5 : draft);
        };
        updateScale();
        window.addEventListener('resize', updateScale);
        return () => window.removeEventListener('resize', updateScale);
    }, []);

    const wrapText = (text, width, fontSize) => {
        const words = text.split('');
        let lines = [];
        let currentLine = words[0];

        const context = document.createElement("canvas").getContext("2d");
        context.font = `${fontSize}px Arial`;

        for (let i = 1; i < words.length; i++) {
            const word = words[i];
            const widthWithWord = context.measureText(currentLine + word).width;
            if (widthWithWord < width) {
                currentLine += word;
            } else {
                lines.push(currentLine);
                currentLine = word;
            }
        }
        lines.push(currentLine);
        return lines;
    };

    const calculateFontSize = (text, width, height) => {
        const context = document.createElement("canvas").getContext("2d");
        let fontSize = 10;
        let lines = wrapText(text, width, fontSize);
        while ((lines.length * fontSize) > height) {
            fontSize -= 1;
            lines = wrapText(text, width, fontSize);
        }
        return fontSize;
    };

    return (
        <svg ref={svgRef} width={730 * scale - 30} height={300 * scale} viewBox="0 0 730 300">
            {paths.map((path, index) => (
                <React.Fragment key={index}>
                    <path
                        id={`path-${index}`}
                        d={path.d}
                        fill={possible[path.name] ? possible[path.name] : 'lightgray'}
                        stroke="black"
                        data-content={path.name}
                        onClick={() => { dispatch(selectclass([path.name, '자율관 4층'])) }} />
                    {boundingBoxes[index] && (() => {
                        const bbox = boundingBoxes[index];
                        const fontSize = calculateFontSize(path.name, bbox.width, bbox.height);
                        const lines = wrapText(path.name, bbox.width, fontSize);
                        const lineHeight = fontSize * 1.2;
                        return lines.map((line, i) => (
                            <text
                                key={i}
                                x={bbox.x + bbox.width / 2}
                                y={bbox.y + (bbox.height / 2) - ((lines.length - 1) * lineHeight) / 2 + i * lineHeight}
                                textAnchor="middle"
                                alignmentBaseline="middle"
                                fontSize={fontSize}
                                fill="black"
                            >
                                {line}
                            </text>
                        ));
                    })()}
                </React.Fragment>
            ))}
        </svg>
    );
}

export default SchoolMap;