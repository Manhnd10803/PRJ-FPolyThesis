import { Link, useLocation, useParams } from 'react-router-dom';
import Navbar from './components/navbar';
import { Header } from './components/header';
import { Timeline } from './timeline';
import { Row, Col, Container, Nav, Tab, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { MyBlog } from './my-blog';
import { ProfileService } from '@/apis/services/profile.service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MyListQa } from './question-and-answer';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { FriendsMyUserPage } from './friends';
// images
const imageUrl = 'https://picsum.photos/20';

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
  const isUser = id == undefined || id == localUserId ? true : false;
  const idUser = id == undefined || id == localUserId ? localUserId : id;

  const getDetailProfile = async () => {
    const user_id = id || localUserId;
    const { data } = await ProfileService.getDetailProfile(user_id, type, status);
    return data;
  };

  const queryKey = ['profile', type, status, id];
  const { data: detailProfile, isLoading } = useQuery(queryKey, getDetailProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries([type, status]);
    },
  });

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
                    <Timeline
                      about={detailUserProfile?.user}
                      listImage={detailProfile?.detailTimeline?.images}
                      listFriend={detailProfile?.detailTimeline?.friend_details}
                      isLoading={isLoading}
                      isUser={isUser}
                      idUser={idUser}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    {type === 'blog' && <MyBlog listBlog={detailProfile?.data[0]?.blog?.data} isLoading={isLoading} />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <FriendsMyUserPage isUser={isUser} typeURL={type} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="forth">
                    {(type === 'qa' || type === 'commentedQuestions') && (
                      <MyListQa
                        listQa={type === 'qa' ? detailProfile?.data[0]?.qa?.data : detailProfile?.data[0]?.qa?.data}
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
