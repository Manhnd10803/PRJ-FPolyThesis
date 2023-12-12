import { formatFullName } from '@/utilities/functions';
import { Badge, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type QandAItemProps = {
  item: any;
  key: number;
};

const imageUrl = 'https://i.imgur.com/7I2kF9Z.png';

export const QandAItem = ({ item, key }: QandAItemProps) => {
  return (
    <Card key={key}>
      <Card.Body>
        <div className="borderbox1 mt-3 rounded d-flex">
          <div className="user-img me-2">
            <img loading="lazy" src={imageUrl} alt="userimg" className="avatar-40 rounded-circle" />
          </div>
          <div className="borderbox border rounded p-2">
            <div className="d-flex align-items-center flex-wrap mb-2">
              <h5>Phan Văn Luân</h5>

              <span className="text-primary ms-1 d-flex align-items-center">
                <i className="material-symbols-outlined me-2 text-primary md-16">check_circle</i>
              </span>

              <Link to="#" className="mb-0">
                Thiết kế web
              </Link>

              <div className="ms-auto d-flex align-items-center">
                <div className="ms-auto d-flex align-items-center">
                  <i className="material-symbols-outlined md-16"> thumb_up </i>
                  <span className="mx-1">
                    <small>0</small>
                  </span>
                </div>
                <div className="ms-auto d-flex align-items-center">
                  <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                  <span className="mx-1">
                    <small>5</small>
                  </span>
                </div>
                <i className="material-symbols-outlined md-16 text-primary">schedule</i>
                <span className="mx-1 text-primary">
                  <small>11/12/2023</small>
                </span>
              </div>
            </div>

            <Link to="#" className="h3">
              title
            </Link>
            <div>
              <Badge as={Link} bg="" to="#" className="badge border border-danger text-danger mt-2 h-1 ms-2 me-2">
                #hihi
              </Badge>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
