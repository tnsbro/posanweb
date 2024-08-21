import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import './../App.css'

function Meals() {

    let [range, setRange] = useState('day');
    let [data, setData] = useState({});
    let [loading, setLoading] = useState(true);

    let [url, setUrl] = useState(window.location.pathname);

    let navigate = useNavigate();


    useEffect(() => {
        const fetchmeal = async () => {
            await axios.post('https://posan-web.vercel.app/meals', {
                range: range
            }).then((result) => {
                setData(result.data)
                setLoading(false);
            });
        }
        fetchmeal();

    }, [range]);

    useEffect(() => {
        let d_url = window.location.pathname
        if (d_url == '/meal') {
            setRange('month');
        }
        setUrl(d_url)
    }, []);

    if (loading) {
        return (
            <a>Loading....</a>
        )
    }

    if (url == '/meal') {
        return (
            <>
                <Container>
                    <br />
                    {
                        Object.keys(data).map((key, i) => {
                            let date = key.substring(4, 6) + '월 ' + key.substring(6) + "일";
                            let nowMealkind = Object.keys(data[key]).length;
                            let mealkind = [];
                            if (nowMealkind > 0) {
                                if (nowMealkind == 3) {
                                    mealkind = ['조식', '중식', ' 석식'];
                                } else if (nowMealkind == 2) {
                                    mealkind = ['조식', '중식'];
                                } else {
                                    mealkind = ['조식']
                                }
                                console.log(data[key]['조식'])

                                return (
                                    <Row>
                                        {
                                            mealkind.map((k) => {
                                                return (
                                                    <div className="rounded-outline-box" >
                                                        {typeof data[key][k]}
                                                        {/* {
                                                            data[key][k].map((item) => {
                                                                return (
                                                                    <>
                                                                    {k}
                                                                    <br/>
                                                                    </>
                                                                )
                                                            })
                                                        } */}
                                                    </div>
                                                )

                                            })
                                        }
                                    </Row>
                                );

                            } else {
                                return (
                                    null
                                )
                            }
                        })
                    }
                </Container>
            </>
        );

    } else {
        let now = new Date();
        var year = now.getFullYear();
        var month = ('0' + (now.getMonth() + 1)).slice(-2);
        var day = ('0' + now.getDate()).slice(-2);

        let date = year + month + day;
        let hour = now.getHours();
        let type = '';
        if (hour <= 9) {
            type = '조식';
        } else if (hour <= 12) {
            type = '중식';
        } else {
            type = '석식';
        }
        let mealdata = data[date];

        if (!mealdata || Object.keys(mealdata).length == 0) {
            return (
                <>
                    <br />
                    <div>
                        <h4 onClick={() => { navigate('/meal') }} style={{ 'cursor': 'pointer' }}><b>오늘의 급식</b></h4>
                        <a>오늘의 급식이 없습니다.</a>
                        <br />
                        <a href='/meal'>이번달 급식 확인하기</a>
                    </div>
                </>
            );

        } else {
            return (
                <>
                    <br />
                    <div>
                        <h4 style={{ 'cursor': 'pointer' }} onClick={() => { navigate('/meal') }}><b>오늘의 {type}</b></h4>
                        <br />
                        {
                            mealdata[type].map((item, i) => {
                                return (
                                    <>
                                        {item}
                                        <br />
                                    </>
                                );

                            })
                        }
                    </div>
                </>
            );
        }



    };



};

export default Meals;