import { IUser } from '@/models/user';
import { pathName } from '@/routes/path-name';
import { formatFullName } from '@/utilities/functions';
import { Card } from 'react-bootstrap';
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
          <ul className="profile-img-gallary p-0 m-0 list-unstyled">
            {listFriend &&
              listFriend.map((item: IUser, index: number) => {
                if (index < 3) {
                  return (
                    <li key={index} className={`${listFriend?.length === 1 ? 'col-4' : ''}`}>
                      <Link to={`/profile/${item.id}`}>
                        <img loading="lazy" src={item.avatar} alt="gallary" className="img-fluid" />
                      </Link>
                      <h6 className="mt-2 text-center">{formatFullName(item)}</h6>
                    </li>
                  );
                }
              })}
          </ul>
        </Card.Body>
      </Card>
    </>
  );
};
