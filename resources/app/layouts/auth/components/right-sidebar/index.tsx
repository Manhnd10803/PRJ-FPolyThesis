import { useFriend } from '@/hooks/useFriendQuery';
import { pathName } from '@/routes/path-name';
import { formatFullName } from '@/utilities/functions';
import { Skeleton } from '@mui/material';
import { Card, Image } from 'react-bootstrap';

export const RightSidebar = () => {
  const minirightsidebar = () => {
    (document.getElementById('rightSidebar') as HTMLElement).classList.toggle('right-sidebar');
    document.body.classList.toggle('right-sidebar-close');
  };

  const { data: friendsMyUser, isLoading } = useFriend();

  return (
    <>
      <div className="right-sidebar-mini" id="rightSidebar">
        <div className="right-sidebar-panel p-0">
          <Card className="shadow-none">
            <Card.Body className="p-0">
              <div className="media-height p-3" data-scrollbar="init">
                {isLoading ? (
                  <>
                    {Array.from({ length: 9 }).map((_, index) => (
                      <Card>
                        <Card.Body>
                          <div className="d-flex gap-2 align-items-center">
                            <Skeleton className="skeleton-color" variant="circular" height={50} width={50} />
                            <div>
                              <Skeleton
                                className="skeleton-color"
                                height={15}
                                width={100}
                                style={{ marginBottom: '5px' }}
                              />
                              <Skeleton className="skeleton-color" height={10} width={100} />
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    ))}
                  </>
                ) : (
                  <>
                    {friendsMyUser && friendsMyUser.length > 0 ? (
                      <>
                        {friendsMyUser.map((itemfriend: any) => (
                          <a
                            key={itemfriend?.friend?.id}
                            href={`${pathName.CHAT}/${itemfriend?.friend?.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <div className="d-flex align-items-center mb-4">
                              <div
                                className={`iq-profile-avatar ${
                                  itemfriend?.friend?.activity_user === 'Đang hoạt động'
                                    ? 'status-online'
                                    : itemfriend?.friend?.activity_user === 'Đang bận'
                                      ? 'status-away'
                                      : itemfriend?.friend?.activity_user === 'Ẩn'
                                        ? 'status-invisible'
                                        : 'status-offline'
                                } `}
                              >
                                <Image
                                  className="rounded-circle avatar-50"
                                  src={itemfriend?.friend?.avatar}
                                  alt=""
                                  loading="lazy"
                                />
                              </div>
                              <div className="ms-3">
                                <h6 className="mb-0">{formatFullName(itemfriend?.friend)}</h6>
                                <p className="mb-0">{itemfriend?.friend?.activity_user}</p>
                              </div>
                            </div>
                          </a>
                        ))}
                      </>
                    ) : (
                      <div>Chưa có bạn bè</div>
                    )}
                  </>
                )}
              </div>
              <div className="right-sidebar-toggle bg-primary text-white mt-3 d-flex" onClick={minirightsidebar}>
                <span className="material-symbols-outlined">chat</span>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};
