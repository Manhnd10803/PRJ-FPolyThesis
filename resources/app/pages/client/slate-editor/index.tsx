import { SlateEditor } from '@/components/shared/slate-editor';
import { Container } from 'react-bootstrap';

export const SlateEditorPage = () => {
  const initialValue = [
    {
      type: 'paragraph',
      children: [
        { text: 'This is editable ' },
        { text: 'rich', bold: true },
        { text: ' text, ' },
        { text: 'much', italic: true },
        { text: ' better' },
        { text: '!' },
      ],
    },
    {
      type: 'paragraph',
      children: [
        {
          text: "Since it's rich text, you can do things like turn a selection of text ",
        },
        { text: 'bold', bold: true },
        {
          text: ', or add a semantically rendered block quote in the middle of the page, like this:',
        },
      ],
    },
    {
      type: 'block-quote',
      children: [{ text: 'A wise quote.' }],
    },
    {
      type: 'paragraph',
      children: [{ text: 'Try it out for yourself!' }],
    },
  ];
  return (
    <div id="content-page" className="content-page">
      <Container>
        <h1>SlateEditorPage</h1>
        <SlateEditor initialValue={initialValue} />
      </Container>
    </div>
  );
};
