import { Row, Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { Comments } from './components/comments';
import { FormComment } from './components/form-comment';
import { BlogService } from '@/apis/services/blog.service';
import { IBlogs } from '@/models/blog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ContentBlogDetail } from './components/content-detail';
import { CommentService } from '@/apis/services/comment.service';
import { TokenService } from '@/apis/services/token.service';
import { LikeService } from '@/apis/services/like.service';

export const BlogDetailPage = () => {
  const location = useLocation();
  const id = location.state && location.state.id;
  const queryClient = useQueryClient();
  const fetchBlogs = async (): Promise<IBlogs> => {
    const { data } = await BlogService.getBlogDetail(id);
    const blogData = data;
    return blogData;
  };
  const commentsQueryKey = ['comments', id];
  const { data, isLoading } = useQuery<IBlogs>(commentsQueryKey, { queryFn: fetchBlogs });

  const user = TokenService.getUser();

  // Like
  const postLikeMutation = useMutation(LikeService.postLike);

  const postLike = async (emotion: any) => {
    try {
      const formData = {
        user_id: user.user.id,
        emotion: emotion,
        blog_id: data?.id,
      };
      const response = await postLikeMutation.mutateAsync(formData);
      console.log('Post liked successfully', response);
      // You can update the local data or refetch it as needed
      queryClient.invalidateQueries(commentsQueryKey); // Invalidate the cache to refresh data
    } catch (error) {
      console.error('Error liking the post', error);
    }
  };

  // Comments
  const postCommentMutation = useMutation(CommentService.postComment, {
    onSettled: () => {
      queryClient.invalidateQueries(commentsQueryKey); // Chỉnh sửa tên query nếu cần
    },
  });

  const postComment = async (commentText: any, parent_id: number, reply_to: string) => {
    try {
      const formData = {
        user_id: user.user.id,
        parent_id: parent_id,
        reply_to: reply_to,
        content: commentText,
        blog_id: data?.id,
      };
      const response = await postCommentMutation.mutateAsync(formData);
      console.log('Bình luận đã được đăng thành công', response);
      return response;
    } catch (error) {
      // console.error('Lỗi khi gửi bình luận', error);
      throw error;
    }
  };

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                <ContentBlogDetail data={data} postLike={postLike} />
                <FormComment postComment={postComment} />
                <Comments data={data?.comments} postComment={postComment} />
              </>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};
