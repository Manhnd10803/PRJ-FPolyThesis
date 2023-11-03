import { Container, Col, Row, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { QandAService } from '@/apis/services/qanda.service';
import { useQuery } from '@tanstack/react-query';
import { ListQandAPage } from './list-qanda';

export const QuestionAndAnswerPage = () => {
  const fetchQandAs = async () => {
    const { data } = await QandAService.getAllQandA();
    const qAndAsData = data;
    return qAndAsData;
  };

  const { data } = useQuery(['qa'], () => fetchQandAs());
  console.log(data);

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col sm="12">
              <Card className="position-relative inner-page-bg bg-primary">
                <div
                  className="d-flex flex-wrap align-items-center justify-content-between p-5"
                  style={{ height: '100px' }}
                >
                  <div className=" d-flex align-items-center text-center profile-forum-items p-0 m-0 w-75">
                    <h3
                      className="text-white"
                      style={{ fontWeight: 'bold', fontSize: '25px', color: 'blue', textTransform: 'uppercase' }}
                    >
                      TẤT CẢ CÁC CÂU HỎI
                    </h3>
                  </div>

                  <Link
                    to="/quests/create"
                    style={{
                      fontWeight: '600',
                    }}
                    className="bg-white px-3 py-2 d-flex align-items-center rounded-2 d-block"
                  >
                    ĐẶT CÂU HỎI MỚI
                  </Link>
                </div>
              </Card>
            </Col>

            {/* Danh sách câu hỏi */}
            <ListQandAPage data={data} />
          </Row>
        </Container>
      </div>
    </>
  );
};
