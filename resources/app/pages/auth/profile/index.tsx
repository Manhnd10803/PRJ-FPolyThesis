import { useLocation, useParams } from 'react-router-dom';
import Navbar from './components/navbar';
import { Header } from './components/header';
import { Timeline } from './timeline';
import { Row, Col, Container, Tab } from 'react-bootstrap';
import { MyBlog } from './my-blog';
import { ProfileService } from '@/apis/services/profile.service';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { MyListQa } from './question-and-answer';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { FriendsMyUserPage } from './friends';
import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { IPost } from '@/models/post';
import { getQueryKeyPostProfile } from '@/hooks/usePostQuery';

export const ProfilePage = () => {
  let { hash } = useLocation();
  let type = hash.split('#')[1];

  let status = '';
  let activeTab = 'first';
  switch (type) {
    case 'timeline':
    case '':
      type = 'post';
      break;
    case 'blog':
      type = 'blog';
      activeTab = 'second';
      break;
    case 'blog-pending':
      type = 'blog';
      status = 'pending';
      activeTab = 'second';
      break;
    case 'blog-reject':
      type = 'blog';
      status = 'reject';
      activeTab = 'second';
      break;
    case 'pills-friends-tab':
      activeTab = 'third';
      break;
    case 'qa':
      type = 'qa';
      activeTab = 'forth';
      break;
    case 'commentedQuestions':
      type = 'commentedQuestions';
      activeTab = 'forth';
      break;
    default:
      type = 'post';
      activeTab = 'first';
      break;
  }

  const localUserId = StorageFunc.getUserId();
  const { id } = useParams();

  const isUser = id == undefined || +id == localUserId ? true : false;
  const idUser = id == undefined || +id == localUserId ? localUserId : id;

  const getDetailProfile = async ({ pageParam = 1 }) => {
    const user_id = id || localUserId;
    const { data } = await ProfileService.getDetailProfile(user_id, type, status, pageParam);
    return data;
  };
  const userId = id || localUserId;
  const queryKeyProfile = getQueryKeyPostProfile({ userId: +userId!, type: type, status: status });

  const { data, fetchNextPage, isError, hasNextPage, isLoading, isFetching, isFetchingNextPage } = useInfiniteQuery({
    queryKey: queryKeyProfile,
    queryFn: getDetailProfile,
    getNextPageParam: (lastPage, _) => {
      if (lastPage.current_page === lastPage.last_page) {
        return undefined;
      }
      return lastPage.current_page + 1;
    },
  });

  const detailProfile = data?.pages.flatMap(page => page.data);

  const getDetailUesrProfile = async () => {
    const user_id = id || localUserId;
    const { data } = await ProfileService.getDetailUserProfile(user_id);
    return data;
  };

  const queryKeyUser = ['user', id];
  const { data: detailUserProfile, isLoading: isUserLoading } = useQuery(queryKeyUser, getDetailUesrProfile);

  return (
    <>
      <div id="content-page" className="content-page" style={{ overflow: 'visible' }}>
        <Container>
          <Row>
            <Header
              detailUser={detailUserProfile}
              queryKey={queryKeyUser}
              isLoading={isUserLoading}
              isUser={isUser}
              idUser={id}
            />
            <Tab.Container id="left-tabs-example" activeKey={activeTab}>
              <Navbar isUser={isUser} />
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    {(type === 'post' || type === '') && (
                      <>
                        <Timeline
                          isError={isError}
                          about={detailUserProfile?.user}
                          listImage={detailUserProfile?.list_image}
                          listFriend={detailUserProfile?.list_friend}
                          listPost={detailProfile}
                          isUser={isUser}
                          idUser={idUser}
                          isFetchingNextPage={isFetchingNextPage}
                          hasNextPage={hasNextPage}
                          fetchNextPage={fetchNextPage}
                          isLoading={isLoading}
                        />
                      </>
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    {type === 'blog' && (
                      <>
                        <MyBlog
                          isFetching={isFetching}
                          hasNextPage={hasNextPage}
                          fetchNextPage={fetchNextPage}
                          listBlog={detailProfile}
                          isLoading={isLoading}
                        />
                      </>
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <FriendsMyUserPage isUser={isUser} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="forth">
                    {(type === 'qa' || type === 'commentedQuestions') && (
                      <MyListQa
                        listQa={detailProfile}
                        isFetching={isFetching}
                        hasNextPage={hasNextPage}
                        fetchNextPage={fetchNextPage}
                        isLoading={isLoading}
                      />
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Tab.Container>
          </Row>
        </Container>
      </div>
    </>
  );
};
