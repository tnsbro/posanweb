import axios from "axios";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
                            return (
                                <div className="date" key={i}>
                                    {
                                        Object.keys(data[key]).map((type, index) => (
                                            <div key={index}>
                                                <h4>{date} {type}</h4>
                                                {
                                                    data[key][type].map((item) => (
                                                        <>
                                                            {item}
                                                            <br />
                                                        </>
                                                    ))
                                                }
                                                <br />
                                            </div>
                                        ))
                                    }
                                </div>
                            );
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
        } else if (hour <= 14) {
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
                        <h4 onClick={() => { navigate('/meal') }}>오늘의 급식</h4>
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
                        <h4 onClick={() => { navigate('/meal') }}>오늘의 {type}</h4>
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