import { CommentItem, CommentItemProps } from './comment-item';

type CommentListProps = {
  commentList: CommentItemProps[];
};

export const CommentList = ({ commentList }: CommentListProps) => {
  return (
    <ul className="post-comments list-inline p-0 m-0">
      {commentList.map(comment => (
        <CommentItem
          key={comment.id}
          avatar={comment.avatar}
          authorName={comment.authorName}
          content={comment.content}
          createdAt={comment.createdAt}
        />
      ))}
    </ul>
  );
};
