import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Button } from "semantic-ui-react";
const initialState = {
  title: "",
  content: "",
  tag: "",
  speed: 0,
  location: "",
  amount: 0,
  price: 0,
  path: "/storage1"
};
class CreatePost extends Component {
  constructor() {
    super()
    this.state = initialState;
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  initialState = () => {
    this.setState(initialState);
  };

  createPost = e => {
    e.preventDefault();
    this.props.createPost({ ...this.state, likes: 0 });
    this.initialState();
  };

  render() {
    return (
      <Form className="padding-30">
        <Form.Field>
          <label>Title</label>
          <input
            className="margin-bottom-15"
            name="title"
            value={this.state.title}
            onChange={this.handleOnChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Path</label>
          <input
            className="margin-bottom-15"
            name="path"
            value={this.state.path}
            onChange={this.handleOnChange}
            placeholder="Path"
          />
        </Form.Field>
        <Form.Field>
          <label>Speed (mb/s)</label>
          <input
            className="margin-bottom-15"
            name="speed"
            value={this.state.speed}
            onChange={this.handleOnChange}
            placeholder="speed"
          />
        </Form.Field>
        <Form.Field>
          <label>Location</label>

          <input
            className="margin-bottom-15"
            name="location"
            value={this.state.location}
            onChange={this.handleOnChange}
            placeholder="Location"
          />
        </Form.Field>
        <Form.Field>
          <label>Amount</label>

          <input
            className="margin-bottom-15"
            type="number"
            name="amount"
            value={this.state.amount}
            onChange={this.handleOnChange}
            placeholder="amount"
          />
        </Form.Field>
        <Form.Field>
          <label>Price</label>

          <input
            className="margin-bottom-15"
            name="price"
            type="number"
            value={this.state.price}
            onChange={this.handleOnChange}
            placeholder="price"
          />
        </Form.Field>

        <Button type="submit" onClick={this.createPost}>
          Put your storage on the sell list
        </Button>
      </Form>
    );
  }
}
CreatePost.displayName = "CreatePost"; // Tell React Dev Tools the component name

// Assign Prop Types
CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired
};

export default CreatePost;
