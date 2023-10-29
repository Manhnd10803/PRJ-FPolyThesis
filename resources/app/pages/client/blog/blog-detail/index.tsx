import { Row, Container, Spinner } from 'react-bootstrap';
import { Comments } from './components/comments';
import { FormComment } from './components/form-comment';
import { ContentBlogDetail } from './components/content-detail';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BlogService } from '@/apis/services/blog.service';
import { useRef } from 'react';
import { CommentService } from '@/apis/services/comment.service';

export const BlogDetailPage = () => {
  const commentRef = useRef(null);
  const queryClient = useQueryClient();
  const { id } = useParams();
  // Show Blog Detail
  const fetchDetailBlog = async () => {
    const { data } = await BlogService.showDetailBlog(id);
    const blogData = data;
    return blogData;
  };
  const BlogsQueryKey = ['blogs', id];
  const { data, isLoading } = useQuery(BlogsQueryKey, { queryFn: fetchDetailBlog });

  // Create Comment
  const createCommentMutation = useMutation(CommentService.createComment, {
    onSettled: () => {
      queryClient.invalidateQueries(BlogsQueryKey); // Chỉnh sửa tên query nếu cần
    },
  });
  const postComment = async (content: any, parent_id: number, reply_to: string) => {
    try {
      const formData = {
        parent_id: parent_id,
        reply_to: reply_to,
        content: content,
        blog_id: data?.blog?.id,
      };
      const response = await createCommentMutation.mutateAsync(formData);
      console.log('Bình luận đã được đăng thành công', response);
      return response;
    } catch (error) {
      throw error;
    }
  };
  // Delete Comment
  const deleteCommentMutation = useMutation(CommentService.deleteComment, {
    onSettled: () => {
      queryClient.invalidateQueries(BlogsQueryKey);
    },
  });

  const deleteComment = async (commentId: any) => {
    try {
      await deleteCommentMutation.mutateAsync(commentId);
    } catch (error) {
      console.error('Lỗi khi xóa bình luận', error);
    }
  };
  // Edit Comment
  const editCommentMutation = useMutation(CommentService.editComment, {
    onSettled: () => {
      queryClient.invalidateQueries(BlogsQueryKey);
    },
  });
  const putComment = async (content: string, commentId: any) => {
    console.log(content);
    try {
      const formData = {
        id: commentId,
        content: content,
      };
      const response = await editCommentMutation.mutateAsync(formData);
      console.log('Bình luận đã được cập nhật thành công', response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            {isLoading ? (
              <Spinner animation="border" variant="primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <>
                <ContentBlogDetail data={data} commentRef={commentRef} />
                <FormComment postComment={postComment} />
                <div ref={commentRef}>
                  <Comments
                    data={data?.comments}
                    postComment={postComment}
                    deleteComment={deleteComment}
                    putComment={putComment}
                  />
                </div>
              </>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};
