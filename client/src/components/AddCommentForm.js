import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import useUser from '../hooks/useUser';

const AddCommentForm=({ articleName, onArticleUpdated }) => {
  //const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");
  const {user}=useUser();

  const addComment = async () => {
    const token = user && (await user.getIdToken());
    const headers = token ? { authtoken: token } : {};
    const response = await axios.post(`/api/articles/${articleName}/comments`, {
      postedBy: user.email,
      text: commentText,
    },{headers});
    const updatedArticle = response.data;
    
    onArticleUpdated(updatedArticle);

    //setName("");
    setCommentText("");
  }

  return (
    <div id="add-comment-form">
      <h3>Add a Comment</h3>
      {/* <label>
        Name:
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </label> */}
      {user && <p>Your are posting as {user.email}</p>}
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rows="4"
          cols="50"
        />
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
}

export default AddCommentForm;
