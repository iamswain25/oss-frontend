import React, { Component } from "react";
import axios from "axios";

import EOSIOClient from "utils/eosio-client";
import IOClient from "utils/io-client";
import {
  updatePostsForCreateAndEdit,
  updatePostsForLike,
  updatePostsForDelete
} from "utils/posts-updater";
import CreatePost from "CreatePost/CreatePost";

import Posts from "Posts/Posts";
import { Modal } from "semantic-ui-react";
class App extends Component {
  state = {
    createOpen: false,
    posts: [],
    postsShowing: [],
    postsMeta: {}
  };

  // Instantiate shared eosjs helper and socket io helper
  constructor(props) {
    super(props);
    const contractAccount = process.env.REACT_APP_EOSIO_CONTRACT_ACCOUNT;
    this.eosio = new EOSIOClient(contractAccount);
    this.io = new IOClient();
  }

  // Enable Realtime updates via Socket.io
  async componentDidMount() {
    this.loadPosts();
    this.io.onMessage("createpost", post => {
      this.setState(prevState => ({
        posts: updatePostsForCreateAndEdit(prevState, post)
      }));
    });
    this.io.onMessage("editpost", post => {
      this.setState(prevState => ({
        posts: updatePostsForCreateAndEdit(prevState, post)
      }));
    });
    this.io.onMessage("deletepost", post => {
      this.setState(prevState => ({
        posts: updatePostsForDelete(prevState, post)
      }));
    });
    this.io.onMessage("likepost", post => {
      this.setState(prevState => ({
        posts: updatePostsForLike(prevState, post)
      }));
    });
  }

  // Load posts
  loadPosts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/posts`);
    if (process.env.NODE_ENV === "development") {
      await response.data.forEach(post => {
        post.speed = Math.round(Math.random() * 100);
        post.location = "United States";
      });
    }

    // const locationFilter = getLocations(response.data);
    // const speedRange = getSpeedRange(response.data);
    // console.log(locationFilter, speedRange)
    this.setState({
      posts: response.data.reverse(),
      postsShowing: response.data.reverse()
      // postsMeta: { locationFilter, speedRange, keyword }
    });
  };

  // Create a post
  createPost = async post => {
    try {
      const newPost = {
        ...post,
        _id: {
          timestamp: Math.floor(Date.now() / 1000),
          author: process.env.REACT_APP_EOSIO_ACCOUNT
        },
        author: process.env.REACT_APP_EOSIO_ACCOUNT
      };

      await this.eosio.transaction(
        process.env.REACT_APP_EOSIO_ACCOUNT,
        "createpost",
        {
          timestamp: newPost._id.timestamp,
          author: newPost._id.author,
          ...post
        }
      );
      this.setState(prevState => ({
        posts: updatePostsForCreateAndEdit(prevState, newPost)
      }));
      this.toggleCreate();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit a post
  editPost = async post => {
    try {
      await this.eosio.transaction(
        process.env.REACT_APP_EOSIO_ACCOUNT,
        "editpost",
        {
          timestamp: post._id.timestamp,
          author: post._id.author,
          ...post
        }
      );
      this.setState(prevState => ({
        posts: updatePostsForCreateAndEdit(prevState, post)
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // Delete a post
  deletePost = async post => {
    try {
      await this.eosio.transaction(
        process.env.REACT_APP_EOSIO_ACCOUNT,
        "deletepost",
        {
          timestamp: post._id.timestamp,
          author: post._id.author
        }
      );
      this.setState(prevState => ({
        posts: updatePostsForDelete(prevState, post)
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // Like a post
  likePost = async post => {
    try {
      await this.eosio.transaction(
        process.env.REACT_APP_EOSIO_ACCOUNT,
        "likepost",
        {
          timestamp: post._id.timestamp,
          author: post._id.author
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  //filter search
  filterSearch = searchObject => {
    // const searchObject = this.state.postsMeta;
    // console.log(searchObject)
    const locationsFilters = Object.keys(searchObject.locationFilter)
      .filter(key => searchObject.locationFilter[key].enabled === true)
      .toString();
    console.log(locationsFilters);
    this.setState(prevState => ({
      postsShowing: prevState.posts
        .filter(
          post =>
            post.title
              .toLowerCase()
              .indexOf(searchObject.keyword.toLowerCase()) !== -1
        )
        .filter(
          post =>
            post.speed >= searchObject.speedRange[0] &&
            post.speed <= searchObject.speedRange[1]
        )
        .filter(post => locationsFilters.indexOf(post.location) !== -1)
    }));
  };
  render() {
    return (
      <div className={`layoutStandard`}>
        <div className="logo">Online Smart Storage</div>
        <div className="main">
          <Modal trigger={<div className="toggleCreate" />}>
            <CreatePost createPost={this.createPost} />
          </Modal>

          <Posts
            filterSearch={this.filterSearch}
            originalPosts={this.state.posts}
            posts={this.state.postsShowing}
            handleOnChange={this.handleOnChange}
            deletePost={this.deletePost}
            editPost={this.editPost}
            likePost={this.likePost}
          />
        </div>
      </div>
    );
  }
}
App.displayName = "App"; // Tell React Dev Tools the component name

export default App;
