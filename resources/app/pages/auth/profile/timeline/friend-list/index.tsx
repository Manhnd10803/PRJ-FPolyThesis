import { IUser } from '@/models/user';
import { pathName } from '@/routes/path-name';
import { formatFullName } from '@/utilities/functions';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type FriendListProps = {
  listFriend: IUser[];
  idUser: string;
};

export const FriendList = ({ listFriend, idUser }: FriendListProps) => {
  return (
    <>
      <Card>
        <div className="card-header d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Bạn bè</h4>
          </div>
          <div className="card-header-toolbar d-flex align-items-center">
            <p className="m-0">
              <Link to={`${pathName.PROFILE}/${idUser}#pills-friends-tab`}>Xem thêm</Link>
            </p>
          </div>
        </div>
        <Card.Body>
          <Row className="p-0 m-0 d-flex flex-wrap gap-2">
            {listFriend &&
              listFriend.map((item: IUser, index: number) => {
                if (index < 3) {
                  return (
                    <Col
                      {...(listFriend.length === 2 || listFriend.length === 1 ? { sm: 4 } : {})}
                      className="p-0"
                      style={{ cursor: 'pointer' }}
                      key={index}
                    >
                      <Link to={`/profile/${item.id}`}>
                        <img loading="lazy" src={item.avatar} alt="gallary" className="img-fluid" />
                      </Link>
                      <h6 className="mt-2 text-center">{formatFullName(item)}</h6>
                    </Col>
                  );
                }
              })}
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};
