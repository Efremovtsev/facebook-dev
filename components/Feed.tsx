import React from 'react';

import InputBox from './InputBox';
import Stories from './Stories';
import Posts from './Posts';

// const storyMock = [
//     {
//         name: 'asdf',
//         src: 'asdf',
//         profile: 'asdf',
//     },
// ];

interface FeedProps {
    posts: string[];
}

function Feed({ posts }: FeedProps) {
    return (
        <div className="flex-grow h-screen pb-44 pt-6 mr-4 xl:mr-40 overflow-y-auto scrollbar-hide">
            <div className="mx-auto max-w-md md:max-w-lg lg:max-w-2xl">
                {/* {storyMock.map(story => (
                    <div>sdf</div>
                ))} */}
                <Stories />
                <InputBox />
                <Posts posts={posts} />
            </div>
        </div>
    );
}

export default Feed;
