import { RichEditor } from '@/components/shared/rich-editor';
import { Container } from 'react-bootstrap';

export const RichEditorPage = () => {
  return (
    <div id="content-page" className="content-page">
      <Container>
        <RichEditor />
      </Container>
    </div>
  );
};
