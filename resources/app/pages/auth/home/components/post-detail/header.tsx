import { momentVi } from '@/utilities/functions/moment-locale';
import { usePostDetailContext } from '../../contexts';
import { MoreActionDropdown } from '../more-action-dropdown';
import { formatFullName } from '@/utilities/functions';

export const Header = () => {
  const { post } = usePostDetailContext();

  const actionType = 'đã thêm một bài viết';

  return (
    <div className="user-post-data">
      <div className="d-flex justify-content-between">
        <div className="me-3">
          <img className="avatar-50 rounded-circle" src={post?.user?.avatar} alt="avatar" />
        </div>
        <div className="w-100">
          <div className="d-flex justify-content-between">
            <div>
              <h5 className="mb-0 d-inline-block">{formatFullName(post?.user)}</h5>
              <span className="mb-0 ps-1 d-inline-block">{actionType}</span>
              <p className="mb-0 text-primary">{momentVi(post?.updated_at).fromNow()}</p>
            </div>
            <MoreActionDropdown friendId={post?.user?.id} postId={post?.id} username={post?.user?.username} />
          </div>
        </div>
      </div>
    </div>
  );
};
