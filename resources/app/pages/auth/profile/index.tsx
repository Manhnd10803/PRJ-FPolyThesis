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

  const queryClient = useQueryClient();
  const { id } = useParams();
  const localUserId = StorageFunc.getUserId();
  const isUser = id == undefined || +id == localUserId ? true : false;
  const idUser = id == undefined || +id == localUserId ? localUserId : id;

  const getDetailProfile = async ({ pageParam = 1 }) => {
    const user_id = id || localUserId;
    const { data } = await ProfileService.getDetailProfile(user_id, type, status, pageParam);
    return data;
  };

  const queryKeyProfile = ['profile', type, status, id];

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useInfiniteQuery({
    queryKey: queryKeyProfile,
    queryFn: getDetailProfile,
    getNextPageParam: (lastPage, _) => {
      // console.log(lastPage);
      if (lastPage.current_page === lastPage.last_page) {
        return undefined;
      }
      return lastPage.current_page + 1;
    },
  });

  const detailProfile = data?.pages.flatMap(page => page.datas);

  const getDetailUesrProfile = async () => {
    const user_id = id || localUserId;
    const { data } = await ProfileService.getDetailUserProfile(user_id);
    return data;
  };

  const queryKeyUser = ['user', id];
  const { data: detailUserProfile, isLoading: isUserLoading } = useQuery(queryKeyUser, getDetailUesrProfile);

  const { ref: endRefTimeLine, inView: endInViewTimeLine } = useInView();

  useEffect(() => {
    if (endInViewTimeLine && hasNextPage && !isFetching) {
      fetchNextPage();
    }

    console.log('endInViewTimeLine', endInViewTimeLine);
  }, [endInViewTimeLine, isFetching, hasNextPage, fetchNextPage]);

  //data list post
  // const listPosts = data?.pages.flatMap(page => page.datas);

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
                          about={detailUserProfile?.user}
                          listImage={data?.pages.flatMap(page => page.detailTimeline.images)}
                          listFriend={data?.pages.flatMap(page => page.detailTimeline.friend_details)}
                          isLoading={isLoading}
                          isUser={isUser}
                          idUser={idUser}
                        />
                        <div ref={endRefTimeLine}></div>
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
