import React, { useState, useEffect } from 'react';
import appwriteService from '../Appwrite/Config';

import { Container, PostCards } from '../components';

function Allposts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => setPosts(posts));
  }, []);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-col items-center justify-center">
          {posts.map((post) => (
            <div className="p-2 w-1/4" key={post.$id}>
              <PostCards post={post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Allposts;
 