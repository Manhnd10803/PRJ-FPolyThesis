import { Link } from 'react-router-dom';
import { formatImagesToRender, getClassImages } from '../../constants';
import { usePostContext, usePostItemContext } from '../../contexts';

export const ImageGrid = () => {
  const { post, item } = usePostItemContext();

  const { handleShowDetail } = usePostContext();

  const { newImages, originalImages } = formatImagesToRender(post?.image);

  if (newImages.length === 0) return null;

  return (
    <div onClick={() => handleShowDetail(item)} style={{ cursor: 'pointer' }}>
      <div className="user-post">
        {newImages.length > 1 ? (
          <div className={`d-grid gap-3 ${getClassImages(newImages.length)}`}>
            {/* Image list */}
            {newImages?.map((imageUrl: string, index: number) => (
              <div
                key={imageUrl}
                className="col-span-1 rounded"
                style={{ position: 'relative', border: '1px  #ececec', borderStyle: 'dotted' }}
              >
                <img
                  style={{ objectFit: 'cover', aspectRatio: '1/1' }}
                  src={imageUrl}
                  alt={`post${index}`}
                  className="img-fluid rounded w-100"
                  loading="lazy"
                />
                {/* last image */}
                {originalImages.length > 4 && index === 3 && (
                  <div
                    className="d-flex flex-column align-items-center justify-content-center h-100"
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backdropFilter: 'blur(10px)' }}
                  >
                    <span style={{ fontSize: '40px', color: 'white' }} className="material-symbols-outlined">
                      add
                    </span>
                    <span style={{ fontSize: '20px' }}>Xem thêm...</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="user-post text-center">
            <Link to="#">
              <img src={newImages[0]} alt="post1" className="img-fluid rounded w-100 mt-3" loading="lazy" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
