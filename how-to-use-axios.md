## SỬ DỤNG AXIOS ĐỂ CALL API

Dưới đây là một ví dụ đơn giản về cách sử dụng Axios instance để quản lý bài viết trong một ứng dụng React TypeScript. Trong ví dụ này, chúng ta sẽ tạo một service (`postService.ts`) để thực hiện các yêu cầu API liên quan đến quản lý bài viết:

1. **Cài đặt Axios:**
   Đảm bảo bạn đã cài đặt Axios trong dự án của mình:

   ```bash
   npm install axios
   ```

   Hoặc sử dụng yarn:

   ```bash
   yarn add axios
   ```

2. **Tạo Axios Instance:**
   Tạo một file để quản lý Axios instance (`api.ts`):

   ```typescript
   // api.ts

   import axios, { AxiosInstance } from 'axios';

   const baseURL = 'https://jsonplaceholder.typicode.com'; // Một API mẫu

   const instance: AxiosInstance = axios.create({
     baseURL,
     timeout: 5000,
     headers: {
       'Content-Type': 'application/json',
     },
   });

   export default instance;
   ```

3. **Tạo Post Service:**
   Tạo một service để thực hiện các yêu cầu liên quan đến quản lý bài viết (`postService.ts`):

   ```typescript
   // postService.ts

   import api from './api';

   interface Post {
     userId: number;
     id: number;
     title: string;
     body: string;
   }

   export const getPosts = async (): Promise<Post[]> => {
     try {
       const response = await api.get('/posts');
       return response.data;
     } catch (error) {
       console.error('Get Posts Error:', error);
       throw error;
     }
   };
   

   export const createPost = async (newPost: Post): Promise<Post> => {
     try {
       const response = await api.post('/posts', newPost);
       return response.data;
     } catch (error) {
       console.error('Create Post Error:', error);
       throw error;
     }
   };

   export const updatePost = async (postId: number, updatedPost: Post): Promise<Post> => {
     try {
       const response = await api.put(`/posts/${postId}`, updatedPost);
       return response.data;
     } catch (error) {
       console.error('Update Post Error:', error);
       throw error;
     }
   };

   export const deletePost = async (postId: number): Promise<void> => {
     try {
       await api.delete(`/posts/${postId}`);
     } catch (error) {
       console.error('Delete Post Error:', error);
       throw error;
     }
   };
   ```

   ```typescript
   export const getPosts = async (params?: AxiosRequestConfig['params']): Promise<Post[]> => {
      try {
        const response = await instance.get('/posts', { params });
        return response.data;
      } catch (error) {
        console.error('Get Posts Error:', error);
        throw error;
      }
    };

   ```

4. **Sử dụng trong Component:**
   Sử dụng service trong một component React (`PostList.tsx`):

   ```typescript
   // PostList.tsx

   import React, { useEffect, useState } from 'react';
   import { getPosts, createPost, updatePost, deletePost } from './postService';

   const PostList: React.FC = () => {
     const [posts, setPosts] = useState([]);

     useEffect(() => {
       // Lấy danh sách bài viết khi component được mount
       getPosts()
         .then((data) => setPosts(data))
         .catch((error) => console.error('Error fetching posts:', error));
     }, []);

     const handleCreatePost = () => {
       const newPost = { userId: 1, title: 'New Post', body: 'This is a new post.' };

       createPost(newPost)
         .then((createdPost) => setPosts([...posts, createdPost]))
         .catch((error) => console.error('Error creating post:', error));
     };

     const handleUpdatePost = (postId: number) => {
       const updatedPost = { title: 'Updated Post', body: 'This post has been updated.' };

       updatePost(postId, updatedPost)
         .then((updatedPost) =>
           setPosts((prevPosts) =>
             prevPosts.map((post) => (post.id === postId ? { ...post, ...updatedPost } : post))
           )
         )
         .catch((error) => console.error('Error updating post:', error));
     };

     const handleDeletePost = (postId: number) => {
       deletePost(postId)
         .then(() => setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId)))
         .catch((error) => console.error('Error deleting post:', error));
     };

     return (
       <div>
         <h1>Post List</h1>
         <button onClick={handleCreatePost}>Create Post</button>
         <ul>
           {posts.map((post) => (
             <li key={post.id}>
               <h3>{post.title}</h3>
               <p>{post.body}</p>
               <button onClick={() => handleUpdatePost(post.id)}>Update</button>
               <button onClick={() => handleDeletePost(post.id)}>Delete</button>
             </li>
           ))}
         </ul>
       </div>
     );
   };

   export default PostList;
   ```

Trong ví dụ trên, chúng ta đã tạo một `PostList` component để hiển thị danh sách bài viết và thực hiện các chức năng CRUD (Create, Read, Update, Delete) bài viết bằng cách sử dụng Axios instance và Post service.