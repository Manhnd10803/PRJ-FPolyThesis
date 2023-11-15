import { DropZoneField } from '@/components/custom/drop-zone-field';
import { useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { DropdownPrivacy } from './dropdown-privacy';

const imageUrl = 'https://picsum.photos/20';

import { PostService } from '@/apis/services/post.service';
import { TCreateNewFeedSchema, createNewFeedSchema } from '@/validation/zod/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateNewFeedChoice } from './create-feed-choice';
import { CloudiaryService } from '@/apis/services/cloudinary.service';

type CreateFeedModalProps = {
  handleClose: () => void;
  show: boolean;
};

export const CreateFeedModal = ({ handleClose, show }: CreateFeedModalProps) => {
  //state
  const [isHaveImage, setIsHaveImage] = useState(false);
  const imagesRef = useRef<File[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TCreateNewFeedSchema>({
    resolver: zodResolver(createNewFeedSchema),
  });

  const handleChangeFiles = (files: File[]) => {
    imagesRef.current = files;
  };

  const onSubmit = async (dataForm: TCreateNewFeedSchema) => {
    let bodyData = dataForm;
    try {
      if (imagesRef.current.length) {
        const urlImages = await CloudiaryService.uploadImages(imagesRef.current, 'post');
        bodyData = { ...dataForm, image: urlImages };
      }

      console.log({ bodyData });

      await PostService.createNewFeed(bodyData);
      toast.success('Đăng bài thành công');
      reset();
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

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
    // @ts-ignore: Unreachable code error
    <Modal centered size="md" className="fade" id="post-modal" onHide={handleClose} show={show}>
      {renderHeader()}
      <Modal.Body>
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="d-flex flex-column align-items-start">
              <div className="d-flex align-items-center mb-5">
                <img src={imageUrl} alt="story-img" className="rounded-circle img-fluid avatar-60" />
                <div className="stories-data ms-3">
                  <h5>Hieu Minh</h5>
                  <DropdownPrivacy />
                </div>
              </div>

              {/* ============== FORM ============== */}
              <div className="post-text pb-4 px-2 w-100" data-bs-toggle="modal" data-bs-target="#post-modal">
                <input
                  {...register('content')}
                  type="text"
                  className="form-control rounded mb-3 p-0"
                  placeholder="Write something here..."
                  style={{ border: 'none' }}
                />

                {/* ======= drag zone ====== */}

                {isHaveImage ? (
                  <DropZoneField
                    onCloseAndRemoveAll={() => setIsHaveImage(false)}
                    onChangeFiles={handleChangeFiles}
                    maxFiles={3}
                    accept={{ 'image/*': [] }}
                  />
                ) : null}
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center borderbox border rounded p-2 px-3">
              <div>Add to your post</div>
              <CreateNewFeedChoice onClickAddPhoto={() => setIsHaveImage(p => !p)} />
            </div>
            <button disabled={isSubmitting} type="submit" className="btn btn-primary d-block w-100 mt-3">
              Post
            </button>
          </form>
        </>
      </Modal.Body>
    </Modal>
  );
};
