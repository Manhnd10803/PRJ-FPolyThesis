import { Form } from 'react-bootstrap';

type DropdownPrivacyProps = {
  onChangePrivacy: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const DropdownPrivacy = ({ onChangePrivacy }: DropdownPrivacyProps) => {
  return (
    <div className="card-post-toolbar">
      <Form.Select aria-label="Default select example" onChange={onChangePrivacy}>
        <option value={0}>Mọi người</option>
        <option value={1}>Bạn bè</option>
        <option value={2}>Chỉ mình tôi</option>
      </Form.Select>
    </div>
  );
};
