import { EmojiHappyIcon } from '@heroicons/react/outline';
import { CameraIcon, VideoCameraIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { ChangeEventHandler, MouseEventHandler, useRef, useState } from 'react';
// import firebase from 'firebase';
import Image from 'next/image';

// import { db as database, storage } from '../firebase';

function InputBox() {
    const { data: session } = useSession();
    const inputRef = useRef<HTMLInputElement>(null);
    const [imageToPost, setImageToPost] = useState<string | null>(null);
    const filepickerRef = useRef<HTMLInputElement>(null);

    if (!session?.user) {
        return null;
    }

    const sendPost: MouseEventHandler<HTMLButtonElement> = event => {
        event.preventDefault();

        if (!inputRef.current?.value) {
            return;
        }

        // database
        //     .collection('posts')
        //     .add({
        //         message: inputRef.current?.value,
        //         name: session.user.name,
        //         email: session.user.email,
        //         image: session.user.image,
        //         // timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        //     })
        //     .then(document_ => {
        //         if (imageToPost) {
        //             const uploadTask = storage
        //                 .ref(`posts/${document_.id}`)
        //                 .putString(imageToPost, 'data_url');

        //             removeImage();

        //             uploadTask.on(
        //                 'state_changed',
        //                 null,
        //                 error => {
        //                     // ERROR function
        //                     console.log(error);
        //                 },
        //                 () => {
        //                     // COMPLETE function
        //                     storage
        //                         .ref('posts')
        //                         .child(document_.id)
        //                         .getDownloadURL()
        //                         .then(url => {
        //                             database.collection('posts').doc(document_.id).set(
        //                                 {
        //                                     postImage: url,
        //                                 },
        //                                 { merge: true },
        //                             );
        //                         });
        //                 },
        //             );
        //         }
        //     });

        inputRef.current.value = '';
    };

    const addImageToPost: ChangeEventHandler<HTMLInputElement> = event => {
        const reader = new FileReader();

        if (event?.target?.files?.[0]) {
            reader.readAsDataURL(event.target.files[0]);
        }

        reader.addEventListener('load', readerEvent => {
            setImageToPost(readerEvent?.target?.result as string);
        });
    };

    const removeImage = () => {
        setImageToPost(null);
    };

    return (
        <div className="bg-white p-2 rounded-2xl shadow-md text-gray-500 font-medium mt-6">
            <div className="flex space-x-4 p-4 items-center">
                {session.user.image && (
                    <Image
                        className="rounded-full"
                        src={session.user.image}
                        width={40}
                        height={40}
                        layout="fixed"
                        alt=""
                    />
                )}
                <form className="flex flex-1">
                    <input
                        className="rounded-full h-12 bg-gray-100 flex-grow px-5 focus:outline-none"
                        type="text"
                        placeholder={`What's on your mind, ${session.user.name}?`}
                        ref={inputRef}
                    />
                    <button hidden onClick={sendPost}>
                        Submit
                    </button>
                </form>

                {imageToPost && (
                    <div
                        onClick={removeImage}
                        className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
                    >
                        <Image className="h-10 object-contain " src={imageToPost} alt="" />
                        <p className="text-xs text-red-500 text-center">Remove</p>
                    </div>
                )}
            </div>

            <div className="flex justify-evenly p-3 border-t">
                <div className="inputIcon">
                    <VideoCameraIcon className="h-7 text-red-500" />
                    <p className="text-xs sm:text-sm xl:text-base">Live Video</p>
                </div>

                <div onClick={() => filepickerRef.current?.click()} className="inputIcon">
                    <CameraIcon className="h-7 text-green-400" />
                    <p className="text-xs sm:text-sm xl:text-base">Photo/Video</p>
                    <input onChange={addImageToPost} ref={filepickerRef} type="file" hidden />
                </div>

                <div className="inputIcon">
                    <EmojiHappyIcon className="h-7 text-yellow-300" />
                    <p className="text-xs sm:text-sm xl:text-base">Feeling/Activity</p>
                </div>
            </div>
        </div>
    );
}

export default InputBox;
