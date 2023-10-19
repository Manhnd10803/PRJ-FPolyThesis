import React, { Component } from 'react';
import 'react-quill/dist/quill.snow.css'; // CSS cho trình chỉnh sửa
import ReactQuill from 'react-quill';
import { Row, Col, Form, Container } from 'react-bootstrap';

class EditableTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '', // Nội dung ban đầu
    };
  }

  handleChange = content => {
    this.setState({ content });
  };

  render() {
    return (
      <Row className="form-group">
        <Form.Label column sm="2" htmlFor="to" className="col-form-label">
          Content
        </Form.Label>
        <Col sm="12">
          <ReactQuill
            name="content"
            as="textarea"
            className="textarea"
            value={this.state.content}
            onChange={this.handleChange}
          />
        </Col>
      </Row>
    );
  }
}

export default EditableTextArea;
