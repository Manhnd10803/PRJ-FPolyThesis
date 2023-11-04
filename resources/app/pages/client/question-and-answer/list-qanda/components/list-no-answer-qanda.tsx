import { QandAService } from '@/apis/services/qanda.service';
import { formatDateFromCreatedAt } from '@/pages/client/blog/components/format-date';
import { useEffect, useState } from 'react';
import { Badge, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const imageUrl = 'https://picsum.photos/20';

export const ListNoAnswerQAndAs = ({ data }: any) => {
  console.log(data);

  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  // console.log(data);

  const handleDetailsClick = (id: number) => {
    QandAService.getDetailQandA(id)
      .then(response => {
        const detailData = response.data;
        const idToPass = detailData.id;
        console.log(`Thông tin chi tiết câu hỏi ID - ${id}`);
        navigate(`/quests/${id}`);
      })
      .catch(error => {
        console.error('Error fetching details:', error);
      });
  };

  useEffect(() => {
    QandAService.getUnAnswerQandA()
      .then(response => {
        const filteredQAndA = response.data;
        setFilteredData(filteredQAndA);
      })
      .catch(error => {
        console.error('Error fetching filtered data:', error);
      });
  }, [filteredData]);

  return (
    <>
      {/* List câu hỏi */}

      {filteredData &&
        filteredData.map((qandA, index) => (
          <div key={qandA.qa.id} className="borderbox1 mt-3 rounded d-flex rounded">
            <div className="user-img me-2">
              <img loading="lazy" src={imageUrl} alt="userimg" className="avatar-40 rounded-circle" />
            </div>
            <div className="borderbox border rounded p-2">
              <div className="d-flex align-items-center flex-wrap mb-2">
                <h5>{qandA?.qa?.user?.username}</h5>

                <span className="text-primary ms-1 d-flex align-items-center">
                  <i className="material-symbols-outlined me-2 text-primary md-16">check_circle</i>
                </span>

                <Link to="#" className="mb-0">
                  {qandA?.qa?.major?.majors_name}
                </Link>

                <div className="ms-auto d-flex align-items-center">
                  <div className="ms-auto d-flex align-items-center">
                    {qandA.like_counts_by_emotion.total_likes > 0 ? (
                      <>
                        <i className="material-symbols-outlined md-16"> thumb_up </i>
                        <span className="mx-1">
                          <small>{qandA.like_counts_by_emotion.total_likes}</small>
                        </span>
                      </>
                    ) : (
                      <>
                        <i className="material-symbols-outlined md-16"> thumb_up </i>
                        <span className="mx-1">
                          <small>0</small>
                        </span>
                      </>
                    )}

                    {/* <i className="material-symbols-outlined md-16"> thumb_up </i>
                    <span className="mx-1">
                      <small>0</small>
                    </span> */}
                  </div>

                  <div className="ms-auto d-flex align-items-center">
                    <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                    <span className="mx-1">
                      <small>{qandA.total_comments ? qandA.total_comments : '0'}</small>
                    </span>
                  </div>

                  <i className="material-symbols-outlined md-16">schedule</i>
                  <span className="mx-1">
                    <small>{formatDateFromCreatedAt(qandA.qa.created_at)}</small>
                  </span>
                </div>
              </div>

              <Link onClick={() => handleDetailsClick(qandA.qa.id)} className="h3">
                {qandA.qa.title.substring(0, 110)} ...
              </Link>

              <Row className="mt-2">
                {/* IMAGE */}
                {/* <Col lg="4" md="6" className="mt-1">
                  <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                </Col>
                <Col lg="4" md="6" className="mt-1">
                  <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                </Col>
                <Col lg="4" md="6" className="mt-1">
                  <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                </Col> */}
              </Row>

              {/* Hashtag */}
              <div>
                {qandA.qa.hashtag.split(',').map((hashtag, index) => (
                  <Badge
                    as={Link}
                    bg=""
                    to="#"
                    className="badge border border-danger text-danger mt-2 h-1 ms-2 me-2"
                    key={index}
                  >
                    {hashtag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
