import { useDropzone, FileRejection, DropzoneOptions } from 'react-dropzone';
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
} & DropzoneOptions;

export const DropZoneField = ({ onChangeFiles, onCloseAndRemoveAll, multiple = true, ...rest }: DropZoneFieldProps) => {
  //state
  const [files, setFiles] = useState<Array<File & { preview: string }>>([]);
  const [rejected, setRejected] = useState<FileRejection[]>([]);

  const onDrop = useCallback((acceptedFiles: Array<File>, rejectedFiles: FileRejection[]) => {
    if (multiple) {
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
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
      </div>
      {/* preview */}
      {files.length ? (
        <>
          {files.map(file => {
            return (
              <div className={`${styles.imagePreviewItem} mb-4 w-100`} key={file.preview}>
                <img src={file.preview} alt="Upload preview" className="img-fluid" />
                <ButtonRemove onClick={() => removeFile(file.name)} />
              </div>
            );
          })}
        </>
      ) : null}
      <ul className="mt-6 flex flex-col">
        {rejected.map(({ file, errors }) => (
          <li key={file.name} className="flex items-start justify-between">
            <div>
              <p className="">{file.name}</p>
              <ul className="text-danger">
                {errors.map(error => (
                  <li key={error.code}>{error.message}</li>
                ))}
              </ul>
            </div>
            <ButtonRemove onClick={() => removeRejected(file.name)} />
          </li>
        ))}
      </ul>
    </>
  );
};

export const ButtonRemove = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={styles.buttonRemove} onClick={onClick}>
      <i className="icon material-symbols-outlined">cancel</i>
    </div>
  );
};
