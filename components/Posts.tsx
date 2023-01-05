import { useCollection } from 'react-firebase-hooks/firestore';
import { Query, Timestamp } from 'firebase/firestore';

import { database } from '../firebase';

import Post from './Post';

export interface IPost {
    id: string;
    name: string;
    message: string;
    email: string;
    postImage: string;
    image: string;
    timestamp: Timestamp;
}

interface PostsProps {
    posts: IPost[];
}

function Posts({ posts }: PostsProps) {
    const [realtimePosts, loading, error] = useCollection(
        database.collection('posts').orderBy('timestamp', 'desc') as unknown as Query,
    );

    return (
        <div>
            {realtimePosts
                ? realtimePosts?.docs.map(post => (
                      <Post
                          key={post.id}
                          name={post.data().name}
                          message={post.data().message}
                          email={post.data().email}
                          timestamp={post.data().timestamp}
                          image={post.data().image}
                          postImage={post.data().postImage}
                      />
                  ))
                : posts.map(post => (
                      <Post
                          key={post.id}
                          name={post.name}
                          message={post.message}
                          email={post.email}
                          timestamp={post.timestamp}
                          image={post.image}
                          postImage={post.postImage}
                      />
                  ))}
        </div>
    );
}

export default Posts;
