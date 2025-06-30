import React, { useState, useEffect } from 'react';
import { Container, PostForm } from '../components';
import appwriteService from '../Appwrite/Config';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const [post, setPost] = useState(null);

  const { slug } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    appwriteService.getPost(slug).then((fetchedPost) => {
      if (fetchedPost) {
        setPost(fetchedPost);
      } else {
        navigate('/');
      }
    });
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default EditPost;
 