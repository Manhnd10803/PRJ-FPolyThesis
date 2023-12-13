import { pathName } from '@/routes/path-name';
import { formatFullName } from '@/utilities/functions';
import { momentVi } from '@/utilities/functions/moment-locale';
import { Badge, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type QandAItemProps = {
  item: any;
  key: number;
};

export const QandAItem = ({ item, key }: QandAItemProps) => {
  return (
    <Card key={key}>
      <Card.Body>
        <div className="borderbox1 mt-3 rounded d-flex">
          <div className="user-img me-2">
            <img loading="lazy" src={item?.qa?.user?.avatar} alt="userimg" className="avatar-40 rounded-circle" />
          </div>
          <div className="borderbox border rounded p-2">
            <div className="d-flex align-items-center flex-wrap mb-2">
              <Link to={`${pathName.PROFILE}/${item?.qa?.user.id}`} className="mb-0">
                <h5>{formatFullName(item?.qa?.user)}</h5>
              </Link>

              <span className="text-primary ms-1 d-flex align-items-center">
                <i className="material-symbols-outlined me-2 text-primary md-16">check_circle</i>
              </span>

              <Link to="#" className="mb-0">
                {item?.qa?.major?.majors_name}
              </Link>

              <div className="ms-auto d-flex align-items-center">
                <div className="ms-auto d-flex align-items-center">
                  <i className="material-symbols-outlined md-16"> thumb_up </i>
                  <span className="mx-1">
                    <small>{item?.like_counts_by_emotion.like || item?.qa?.likes_count}</small>
                  </span>
                </div>
                <div className="ms-auto d-flex align-items-center">
                  <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                  <span className="mx-1">
                    <small>{item?.total_comments}</small>
                  </span>
                </div>
                <i className="material-symbols-outlined md-16 text-primary">schedule</i>
                <span className="mx-1 text-primary">
                  <small>{momentVi(item?.qa?.created_at).format('DD/MM/YYYY')}</small>
                </span>
              </div>
            </div>

            <Link to={`${pathName.QUESTS_DETAIL}/${item?.qa?.id}`} className="h3">
              {item?.qa?.title}
            </Link>
            <div>
              {item?.qa?.hashtag.split(',').map((hashtag: string, index: number) => (
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
      </Card.Body>
    </Card>
  );
};
