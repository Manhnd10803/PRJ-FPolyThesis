import { Modal, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DropdownPrivacy } from './dropdown-privacy';
import { useDropzone } from 'react-dropzone';
import { useCallback, useMemo, useState } from 'react';

const imageUrl = 'https://picsum.photos/20';

type CreateFeedModalProps = {
  handleClose: () => void;
  show: boolean;
};

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

export const CreateFeedModal = ({ handleClose, show }: CreateFeedModalProps) => {
  //state
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader();

    file.onload = function () {
      setPreview(file.result);
    };

    file.readAsDataURL(acceptedFiles[0]);
  }, []);

  // const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop,
  // });

  const { acceptedFiles, getRootProps, getInputProps, isDragActive, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: { 'image/*': [] },
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );
  async function handleOnSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    if (typeof acceptedFiles[0] === 'undefined') return;

    const formData = new FormData();

    // formData.append('file', acceptedFiles[0]);
    // formData.append('upload_preset', '<Your Upload Preset>');
    // formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);

    // const results = await fetch('https://api.cloudinary.com/v1_1/<Your Cloud Name>/image/upload', {
    //   method: 'POST',
    //   body: formData,
    // }).then(r => r.json());

    // console.log('results', results);
  }

  const renderHeader = () => {
    return (
      <Modal.Header className="d-flex justify-content-between">
        <Modal.Title id="post-modalLabel" className="text-center w-100">
          Create Post
        </Modal.Title>
        <Link to="#" className="lh-1" onClick={handleClose}>
          <span className="material-symbols-outlined">close</span>
        </Link>
      </Modal.Header>
    );
  };

  //render
  return (
    <Modal centered size="md" className="fade" id="post-modal" onHide={handleClose} show={show}>
      {renderHeader()}
      <Modal.Body>
        <>
          <div className="d-flex flex-column align-items-start">
            <div className="d-flex align-items-center mb-5">
              <img src={imageUrl} alt="story-img" className="rounded-circle img-fluid avatar-60" />
              <div className="stories-data ms-3">
                <h5>Hieu Minh</h5>
                <DropdownPrivacy />
              </div>
            </div>

            {/* ============== FORM ============== */}
            <form
              className="post-text pb-4"
              data-bs-toggle="modal"
              data-bs-target="#post-modal"
              onSubmit={handleOnSubmit}
            >
              <input
                type="text"
                className="form-control rounded"
                placeholder="Write something here..."
                style={{ border: 'none' }}
              />

              {/* ======= drag zone ====== */}
              <div {...getRootProps(style)}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop the files here ...</p>
                ) : (
                  <p>Drag 'n' drop some files here, or click to select files</p>
                )}
              </div>
              {preview && (
                <div className="mb-5 w-100">
                  <img src={preview as string} alt="Upload preview" className="img-fluid" />
                </div>
              )}
            </form>
          </div>
          <hr />
          <div className="d-flex justify-content-between align-items-center borderbox border rounded p-2 px-3">
            <div>Add to your post</div>

            <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
              <li className="ms-3">
                <OverlayTrigger placement="top" overlay={<Tooltip>Photo/Video</Tooltip>}>
                  <div className="bg-soft-primary rounded p-2 pointer">
                    <img src={imageUrl} alt="icon" className="img-fluid" />
                  </div>
                </OverlayTrigger>
              </li>
              <li className="ms-3">
                <OverlayTrigger placement="top" overlay={<Tooltip>Tag Friend</Tooltip>}>
                  <div className="bg-soft-primary rounded p-2 pointer">
                    <img src={imageUrl} alt="icon" className="img-fluid" />
                  </div>
                </OverlayTrigger>
              </li>
              <li className="ms-3">
                <OverlayTrigger placement="top" overlay={<Tooltip>Feeling/Activity</Tooltip>}>
                  <div className="bg-soft-primary rounded p-2 pointer">
                    <img src={imageUrl} alt="icon" className="img-fluid" />
                  </div>
                </OverlayTrigger>
              </li>
              <li className="ms-3">
                <OverlayTrigger placement="top" overlay={<Tooltip>Check in</Tooltip>}>
                  <div className="bg-soft-primary rounded p-2 pointer">
                    <Link to="#"></Link>
                    <img src={imageUrl} alt="icon" className="img-fluid" />
                  </div>
                </OverlayTrigger>
              </li>
            </ul>
          </div>

          <button type="submit" className="btn btn-primary d-block w-100 mt-3">
            Post
          </button>
        </>
      </Modal.Body>
    </Modal>
  );
};
