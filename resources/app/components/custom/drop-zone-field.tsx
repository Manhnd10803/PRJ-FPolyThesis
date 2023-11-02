import { useDropzone, FileRejection, DropzoneOptions } from 'react-dropzone';
import { useCallback, useEffect, useMemo, useState } from 'react';

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

// type DropImageFieldProps = {
//   onDrop: (acceptedFiles: Array<File>) => void;
// };

type DropZoneFieldProps = {
  onChange?: (files: Array<File>) => void;
} & DropzoneOptions;

export const DropZoneField = ({ onChange, multiple = true, ...rest }: DropZoneFieldProps) => {
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

  const { acceptedFiles, getRootProps, getInputProps, isDragActive, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      multiple,
      ...rest,
    });

  console.log('acceptedFiles', acceptedFiles);
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
      <button onClick={removeAll}>Remove all files</button>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
      </div>
      {/* preview */}
      {files.length ? (
        <>
          {files.map(file => {
            return (
              <div className="mb-5 w-100" key={file.preview}>
                <img src={file.preview} alt="Upload preview" className="img-fluid" />
                <button onClick={() => removeFile(file.name)}>Remove</button>
              </div>
            );
          })}
        </>
      ) : null}
      <ul className="mt-6 flex flex-col">
        <h3>Rejected files</h3>
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
            <button onClick={() => removeRejected(file.name)}>remove</button>
          </li>
        ))}
      </ul>
    </>
  );
};
