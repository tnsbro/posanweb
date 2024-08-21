import { useEffect } from "react";

function Catmap() {
    useEffect(() => {
        // 카카오 지도 API가 로드될 때까지 기다립니다.
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=0de8a93d1da235c5f124f1c12dac5629&autoload=false`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            // API 로드 후 지도 생성
            window.kakao.maps.load(() => {
                const container = document.getElementById('map'); // 지도를 표시할 div
                const options = {
                    center: new window.kakao.maps.LatLng(35.69047316868262, 128.4482840731287), // 지도 중심 좌표
                    level: 2 // 지도 확대 레벨
                };
                const map = new window.kakao.maps.Map(container, options); // 지도 생성 및 객체 리턴

                // 마커 추가
                const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667);
                const marker = new window.kakao.maps.Marker({
                    position: markerPosition
                });
                marker.setMap(map);
                
            });
        };

        return () => script.remove();
    }, []);
    return (
        <>
            <div
                id="map"
                style={{
                    'width': '100%',
                    'height': '400px'
                }}
            ></div>
        </>
    )
}

export default Catmap;