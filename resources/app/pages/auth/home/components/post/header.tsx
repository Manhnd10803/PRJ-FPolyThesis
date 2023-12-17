import { formatFullName } from '@/utilities/functions';
import { usePostItemContext } from '../../contexts';
import { momentVi } from '@/utilities/functions/moment-locale';
import { MoreActionDropdown } from '@/components/post/more-action';
import { Link } from 'react-router-dom';
import { pathName } from '@/routes/path-name';

//======================== Component PostItemHeader ========================//
export const Header = () => {
  const { post } = usePostItemContext();
  const actionType = 'đã thêm một bài viết';

  return (
    <div className="user-post-data">
      <div className="d-flex justify-content-between">
        <div className="me-3">
          <Link to={`${pathName.PROFILE}/${post?.user?.id}`}>
            <img className="avatar-50 rounded-circle" src={post?.user?.avatar} alt="avatar" loading="lazy" />
          </Link>
        </div>
        <div className="w-100">
          <div className="d-flex justify-content-between ">
            <div>
              <h5 className="mb-0 d-inline-block">{formatFullName(post?.user)}</h5>
              <span className="mb-0 ps-1 d-inline-block">{actionType}</span>
              <div className="d-flex align-items-center">
                <p className="mb-0 text-primary">{momentVi(post?.updated_at).fromNow()}</p>

                <span className="material-symbols-outlined " style={{ marginLeft: '10px', fontSize: '20px' }}>
                  {post?.status === 0 ? 'public' : post?.status === 1 ? 'group' : 'lock'}
                </span>
              </div>
            </div>
            <MoreActionDropdown friendId={post?.user?.id} postId={post?.id} username={post?.user?.username} />
          </div>
        </div>
      </div>
    </div>
  );
};
