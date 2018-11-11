import React from "react";

import Post from "Posts/Post/Post";
import SearchBar from "./SearchBar";
import { Card, Container } from "semantic-ui-react";
const Posts = ({ posts, deletePost, editPost, likePost, filterSearch, originalPosts }) => {
  // console.log(postsMeta, posts)
  return (
    <Container>
      <SearchBar
        filterSearch={filterSearch}
        originalPosts={originalPosts}
      />
      <Card.Group>
        {posts.map(post => (
          <Post
            post={post}
            deletePost={deletePost}
            editPost={editPost}
            likePost={likePost}
            key={JSON.stringify(post._id)}
          />
        ))}
      </Card.Group>
    </Container>
  );
};
Posts.displayName = "Posts"; // Tell React Dev Tools the component name

export default Posts;
