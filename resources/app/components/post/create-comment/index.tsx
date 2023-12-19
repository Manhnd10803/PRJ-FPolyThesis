import { useAddCommentPost, useAddCommentPostDetail, useCreateCommentPost } from '@/hooks/useCommentQuery';
import { TCommentSchema, createCommentSchema } from '@/validation/zod/comment';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';

type CreateCommentProps = {
  postId: number;
  isDetail?: boolean;
};

export const CreateComment = ({ postId, isDetail = false }: CreateCommentProps) => {
  const { reset, register, handleSubmit } = useForm<TCommentSchema>({
    resolver: zodResolver(createCommentSchema),
  });
  const { pathname } = useLocation();

  const { createComment, isLoading } = useCreateCommentPost();

  const typeQueryKey = pathname.includes('profile') ? 'profile' : 'posts';

  const { manuallyAddCommentPostItem } = useAddCommentPost(typeQueryKey);

  const { manuallyAddCommentPostDetail } = useAddCommentPostDetail(typeQueryKey);

  const onSubmit: SubmitHandler<TCommentSchema> = async dataForm => {
    createComment(
      {
        bodyData: dataForm,
        id: postId,
      },
      {
        onSuccess: ({ data }) => {
          if (isDetail) {
            manuallyAddCommentPostDetail({
              newComment: data.comment,
              postId: postId,
            });
          } else {
            manuallyAddCommentPostItem({
              newComment: data.comment,
              postId: postId,
            });
          }

          reset();
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="comment-text d-flex align-items-center mt-3 relative">
      <input
        {...register('content')}
        type="text"
        className="form-control rounded"
        placeholder="Nhập bình luận..."
        style={{ padding: '10px' }}
      />
      <div className="comment-attagement d-flex align-items-center">
        <Link to="#" style={{ lineHeight: 1 }} className="me-3">
          <span className="material-symbols-outlined">sentiment_satisfied</span>
        </Link>
        <Link to="#" style={{ lineHeight: 1 }} className="me-2">
          <span className="material-symbols-outlined">photo_camera</span>
        </Link>
        <button style={{ display: 'none' }} type="submit">
          Submit
        </button>
      </div>
      {isLoading ? (
        <div style={{ position: 'absolute', top: '4px', left: 0, right: 0, opacity: 0.5 }} className="text-center">
          <img src="https://i.gifer.com/ZKZg.gif" alt="loader" style={{ height: '20px' }} />
        </div>
      ) : null}
    </form>
  );
};
