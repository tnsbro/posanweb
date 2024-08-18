import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Pagination from 'react-bootstrap/Pagination';
import Button from 'react-bootstrap/Button';

function Community() {

  let navigate = useNavigate();
  let [data, setData] = useState([{'admin' : {'title' : '1', 'id' : 'admin' }}]);
  let [currentUrl, setUrl] = useState(false);

  useEffect(() => {
    let url = window.location.pathname;
    if (url == '/') {
      if (data.length > 5) {
        let copy = [...data];
        copy.splice(5, copy.length - 5);
        setData(copy);
      }
      setUrl(false);
    } else {
      setUrl(true)
    }
    
  }, [data])

  let communityData = useQuery('community', () => {
    axios.get('https://posan-web.vercel.app/communitylist')
      .then((result) => {
        console.log(result.data)
        setData(result.data);
      });
  });


  return (
    <Container>
      <br />
      <h4 onClick={() => navigate('/community')}>커뮤니티</h4>
      <br />

      <ListGroup as="ol">
        {

          data.map((a, i) => {
            let Onedata = Object.values(a)[0];
            return (
              <ListGroup.Item key={i} style={{ textAlign: 'left' }} onClick={() => { navigate(`/community/view/${Onedata['id']}`) }}>{Onedata['title']}</ListGroup.Item>
            );            
          })
        }
      </ListGroup>
      {
        currentUrl ?
          <div style={{ textAlign: 'left' }} >
            <br/><br/>
            <Pagination>
              <Pagination.First />
              <Pagination.Prev />
              <Pagination.Item>{1}</Pagination.Item>
              <Pagination.Ellipsis />

              <Pagination.Item>{10}</Pagination.Item>
              <Pagination.Item>{11}</Pagination.Item>
              <Pagination.Item active>{12}</Pagination.Item>
              <Pagination.Item>{13}</Pagination.Item>
              <Pagination.Item disabled>{14}</Pagination.Item>

              <Pagination.Ellipsis />
              <Pagination.Item>{20}</Pagination.Item>
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
            <Button variant='secondary' onClick={()=>{navigate('/communitywrite')}} >글 작성</Button>
          </div> : null
      }
    </Container>
  );
}


export default Community;