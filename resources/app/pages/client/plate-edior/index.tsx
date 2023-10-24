import PlateEditor from '@/components/shared/plate-editor';
import { Container } from 'react-bootstrap';

export const PlateEditorPage = () => {
  return (
    <div id="content-page" className="content-page">
      <Container>
        <div className="max-w-[1336px] rounded-lg border bg-background shadow min-h-screen">
          <PlateEditor />
        </div>
      </Container>
    </div>
  );
};
