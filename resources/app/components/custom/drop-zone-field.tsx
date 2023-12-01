import { useDropzone, FileRejection, DropzoneOptions, ErrorCode, FileError } from 'react-dropzone';
import { useCallback, useEffect, useMemo, useState } from 'react';

import styles from './drop-zone-field.module.scss';

const baseStyle = {
  position: 'relative',
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
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

// type DropImageFieldProps = {
//   onDrop: (acceptedFiles: Array<File>) => void;
// };

type DropZoneFieldProps = {
  onChangeFiles?: (files: Array<File>) => void;
  onCloseAndRemoveAll?: () => void;
  maxFiles?: number;
} & DropzoneOptions;

export const DropZoneField = ({
  onChangeFiles,
  onCloseAndRemoveAll,
  multiple = true,
  maxFiles = 0,
  ...rest
}: DropZoneFieldProps) => {
  //state
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [files, setFiles] = useState<Array<File & { preview: string }>>([]);
  const [rejected, setRejected] = useState<FileRejection[]>([]);

  const onDrop = useCallback((acceptedFiles: Array<File>, rejectedFiles: FileRejection[]) => {
    if (multiple) {
      if (acceptedFiles?.length > maxFiles || rejectedFiles?.length > maxFiles) {
        setErrorMessage(`Chỉ được chọn tối đa ${maxFiles} ảnh`);
      }
      if (acceptedFiles?.length) {
        setFiles(previousFiles => [
          ...previousFiles,
          ...acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) })),
        ]);
      }
    } else {
      const singleFile = acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) }));
      setFiles(singleFile);
    }

    if (rejectedFiles?.length) {
      setRejected(previousFiles => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  useEffect(() => {
    if (onChangeFiles) {
      onChangeFiles(files);
    }
  }, [files]);

  const { acceptedFiles, getRootProps, getInputProps, isDragActive, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple,
      maxFiles,
      ...rest,
    });

  const removeFile = (name: string) => {
    setFiles(files => files.filter(file => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };
  const removeRejected = (name: string) => {
    setRejected(files => files.filter(({ file }) => file.name !== name));
  };

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  const style: any = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
  );

  return (
    <>
      <div {...getRootProps({ style })}>
        <div
          className={styles.buttonRemoveAll}
          onClick={e => {
            onCloseAndRemoveAll?.();
            e.stopPropagation();
            removeAll();
          }}
        >
          <i className="icon material-symbols-outlined">cancel</i>
        </div>
        <input {...getInputProps()} />
        {files.length ? <p>Kéo thả hoặc chọn ảnh vào đây ...</p> : <p>Kéo thả hoặc vào đây, hoặc click để chọn ảnh</p>}

        {/*============= preview =============*/}
        {files.length ? (
          <div className={`d-grid col-auto grid-flow-col gap-2 ${getClassNamePreview(files.length)}`}>
            {files.map(file => {
              return (
                <div className={`${styles.imagePreviewItem} m2-4 w-100`} key={file.preview}>
                  <img src={file.preview} alt="Upload preview" className="img-fluid" />
                  <ButtonRemove onClick={() => removeFile(file.name)} />
                </div>
              );
            })}
          </div>
        ) : null}

        {/*============= error =============*/}
        {rejected.length ? (
          <ul className="mt-6 w-100">
            {rejected.map(({ file, errors }) => (
              <li key={file.name} className="flex items-start justify-between position-relative m-3">
                <div className="d-flex flex-col align-items-center">
                  <span className="">{file.name}</span>
                  <ul className="text-danger">
                    {errors.map(error => (
                      <li key={error.code}>{mappingError(error)}</li>
                    ))}
                  </ul>
                </div>
                <ButtonRemove size={30} onClick={() => removeRejected(file.name)} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {errorMessage ? (
        <div className="mt-2" style={{ color: 'red' }}>
          {errorMessage}
        </div>
      ) : null}
    </>
  );
};

type ButtonRemoveProps = { onClick: () => void; size?: number };

export const ButtonRemove = ({ onClick, size = 40 }: ButtonRemoveProps) => {
  return (
    <div
      className={styles.buttonRemove}
      onClick={e => {
        e.stopPropagation();
        onClick();
      }}
    >
      <i style={{ fontSize: size }} className="icon material-symbols-outlined">
        cancel
      </i>
    </div>
  );
};

const getClassNamePreview = (length: number) => {
  switch (length) {
    case 1:
      return 'grid-cols-1';
    case 2:
      return 'grid-cols-2';
    case 3:
      return 'grid-cols-2 grid-rows-2';
    case 4:
      return 'grid-cols-2 grid-rows-2';

    default:
      break;
  }
};

const mappingError = (error: FileError) => {
  switch (error.code) {
    case ErrorCode.TooManyFiles:
      return 'Quá nhiều ảnh';
    case ErrorCode.FileTooLarge:
      return 'Kích thước ảnh quá lớn';
    case ErrorCode.FileInvalidType:
      return 'Định dạng ảnh không được chấp nhận';
    case ErrorCode.FileTooSmall:
      return 'Kích thước ảnh quá nhỏ';

    default:
      return error.message;
  }
};
