 import React, { useEffect, useState } from 'react';

const FetchPosts = () => {
  const [ptPosts] = useState([]);
  const [ title , setTitle]  = useState('')
  const [body , setBody]  = useState('')
  const [editingPostId , setEditingPostId] = useState(null )


  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setPosts(json));
  }, []);
 
    const handleEdit = (post) => {
    setEditingPostId(post.id);  // Set the ID of the post being edited
    setTitle(post.title); // Populate the title input with the current title
    setBody(post.body);   // Populate the body input with the current body
  };

    
  const handleSubmit = (event) => {
    event.preventDefault();
    debugger
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        id: 1,
        title: 'foo',
        body: 'bar',
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    
      fetch('https://jsonplaceholder.typicode.com/posts/$ {editingPostId}',{
        method: 'PUT',
        body: JSON.stringify({
        
          title,
          body,
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        
    
  
    .then((response) => response.json())
    .then((json) => {
      setPosts([json, ...posts]);
      setTitle('');
    });

    // then((response) => response.json())
      // .then((updatedPost) => {
        setPosts(posts.map((post) => 
          post.id === updatedPost.id ? updatedPost : post
        ));
        setTitle('');
        setBody('');
        setEditingPostId(null); // Clear the editing state
      };
  
  return (
    <div>
      
      <form onSubmit={handleSubmit}>
      <label>
      <input 
        type="text" 
        value={title}
        onChange={(e) => setTitle(e.target.value)} >
          <button onClick={(e) => setTitles(e.target.value)}>update</button>
      </input>

      <input 
        type="text" 
        value={body}
        onChange={(e) => setBody(e.target.value)} >
          <button onClick={(e) => setBody  }>update</button>
      </input>
      {/* <input type="submit" > /</input> */}
      </label>
      <input type="submit" value={editingPostId ? "Update Post" : "Submit"} />

      </form>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id} >
            <h3>{post.title}</h3>
            <p>{post.body}</p>
      <button onClick={() => handleEdit(post)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FetchPosts;




 