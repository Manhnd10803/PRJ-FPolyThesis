import { CloudiaryService } from '@/apis/services/cloudinary.service';
import { useState } from 'react';
import { Container } from 'react-bootstrap';

export const ExampleUploadPage = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  // Should upload file when submit form
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!files) return;

    try {
      const imageUrls = await CloudiaryService.uploadImages(files, 'avatar');
      console.log('upload successfully', imageUrls);
      // set urlImages to your body data
      // call your api

      // const bodyData = {}
      // const response = await httpRequest.post('/your-api', { ...bodyData, image: imageUrls });
    } catch (error) {
      //handle error
      console.log(error);
    }
  };

  // Please don't upload file when change input file
  const handleChange = ({ currentTarget: { files } }: React.FormEvent<HTMLInputElement>) => {
    console.log('preparing files to upload', files);
    if (files && files.length) {
      setFiles(files);
    }
  };

  return (
    <div id="content-page" className="content-page">
      <Container>
        {/* generate form with 1 input file */}
        <form onSubmit={handleSubmit}>
          <input type="file" name="file" onChange={handleChange} multiple />
          <button type="submit">Upload</button>
        </form>
      </Container>
    </div>
  );
};
