import { useEffect, useRef } from 'react';

type PopUpDeleteChatProps = {
  showModal: boolean;
  onClose: () => void;
  onDelete: () => void;
};

export const PopUpDeleteChat = ({ showModal, onClose, onDelete }: PopUpDeleteChatProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  if (!showModal) return null;

  return (
    <div className="modal fade show" tabIndex={-1} role="dialog" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered" ref={modalRef} role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Xác nhận xóa đoạn chat</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            Bạn có chắc chắn muốn xóa đoạn chat này không? Hành động này không thể hoàn tác.
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Hủy
            </button>
            <button type="button" className="btn btn-danger" onClick={onDelete}>
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
