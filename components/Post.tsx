import { ChatAltIcon, ShareIcon, ThumbUpIcon } from '@heroicons/react/outline';
import { Timestamp } from 'firebase/firestore';
import Image from 'next/image';

interface PostProps {
    name: string;
    message: string;
    email: string;
    postImage: string;
    image: string;
    timestamp: Timestamp;
}

function Post({ name, message, postImage, image, timestamp }: PostProps) {
    return (
        <div className="flex flex-col">
            <div className="p-5 bg-white mt-5 rounded-t-2xl shadow-sm">
                <div className="flex items-center space-x-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img className="rounded-full" src={image} width={40} height={40} alt="" />
                    <div>
                        <p className="font-medium">{name}</p>
                        {timestamp ? (
                            <p className="text-xs text-gray-400">
                                {new Date(timestamp.toDate()).toLocaleString()}
                            </p>
                        ) : (
                            <p className="text-xs text-gray-400">Loading</p>
                        )}
                    </div>
                </div>

                <p className="pt-4">{message}</p>
            </div>
            {postImage && (
                <div className="relative h-56 md:h-96 bg-white">
                    <Image src={postImage} objectFit="cover" layout="fill" alt="" />
                </div>
            )}

            {/* Post Footer */}
            <div className="flex justify-between items-center rounded-b-2xl bg-white shadow-md text-gray-400 border-t">
                <div className="inputIcon p-3 rounded-none rounded-bl-2xl">
                    <ThumbUpIcon className="h-4" />
                    <p className="text-xs sm:text-base">Like</p>
                </div>

                <div className="inputIcon p-3 rounded-none">
                    <ChatAltIcon className="h-4" />
                    <p className="text-xs sm:text-base">Comment</p>
                </div>

                <div className="inputIcon p-3 rounded-none rounded-br-2xl">
                    <ShareIcon className="h-4" />
                    <p className="text-xs sm:text-base">Share</p>
                </div>
            </div>
        </div>
    );
}

export default Post;
