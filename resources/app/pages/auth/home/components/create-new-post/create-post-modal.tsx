import { DropZoneField } from '@/components/custom/drop-zone-field';
import { useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { DropdownPrivacy } from './dropdown-privacy';

import { PostService } from '@/apis/services/post.service';
import { TCreateNewPostSchema, createNewPostSchema } from '@/validation/zod/post';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateNewPostChoice } from './create-post-choice';
import { CloudiaryService } from '@/apis/services/cloudinary.service';
import { StorageFunc } from '@/utilities/local-storage/storage-func';

type CreatePostModalProps = {
  handleClose: () => void;
  show: boolean;
};

export const CreatePostModal = ({ handleClose, show }: CreatePostModalProps) => {
  //state
  const fullName = StorageFunc.getFullName();
  const userInfo = StorageFunc.getUser();

  const [isShowDrop, setShowDrop] = useState(false);
  const imagesRef = useRef<File[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TCreateNewPostSchema>({
    resolver: zodResolver(createNewPostSchema),
  });

  const handleChangeFiles = (files: File[]) => {
    imagesRef.current = files;
  };

  const onSubmit = async (dataForm: TCreateNewPostSchema) => {
    let bodyData = dataForm;
    try {
      if (imagesRef.current.length) {
        const urlImages = await CloudiaryService.uploadImages(imagesRef.current, 'post');
        bodyData = { ...dataForm, image: urlImages };
      }

      console.log({ bodyData });

      await PostService.createNewPost(bodyData);
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
          Đăng trạng thái
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
                <img src={userInfo?.avatar} alt="story-img" className="rounded-circle img-fluid avatar-60" />
                <div className="stories-data ms-3">
                  <h5>{fullName}</h5>
                  <DropdownPrivacy />
                </div>
              </div>

              {/* ============== FORM ============== */}
              <div className="post-text pb-4 px-2 w-100" data-bs-toggle="modal" data-bs-target="#post-modal">
                <input
                  {...register('content')}
                  type="text"
                  className="form-control rounded mb-3 p-0"
                  placeholder="Bạn đang nghĩ gì vậy..."
                  style={{ border: 'none' }}
                />

                {/* ======= drag zone ====== */}

                {isShowDrop ? (
                  <DropZoneField
                    onCloseAndRemoveAll={() => setShowDrop(false)}
                    onChangeFiles={handleChangeFiles}
                    maxFiles={5}
                    accept={{ 'image/*': [] }}
                  />
                ) : null}
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center borderbox border rounded p-2 px-3">
              <div>Thêm vào bài viết của bạn</div>
              <CreateNewPostChoice onClickAddPhoto={() => setShowDrop(p => !p)} />
            </div>
            <button disabled={isSubmitting} type="submit" className="btn btn-primary d-block w-100 mt-3">
              Đăng
            </button>
          </form>
        </>
      </Modal.Body>
    </Modal>
  );
};
