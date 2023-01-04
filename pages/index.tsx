import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

import Header from '../components/Header';
import Login from '../components/Login';
import Sidebar from '../components/Sidebar';
import Feed from '../components/Feed';
import Widgets from '../components/Widgets';

// import { db as database } from '../firebase';

interface HomeProps {
    session: Session | null;
}

export default function Home({ session }: HomeProps) {
    if (!session) {
        return <Login />;
    }

    return (
        <div className="h-screen bg-gray-100 overflow-hidden">
            <Head>
                <title>Facebook</title>
            </Head>

            <Header />

            <main className="flex">
                <Sidebar />
                {/* <Feed posts={posts} /> */}
                <Feed posts={[]} />
                <Widgets />
            </main>
        </div>
    );
}

export async function getServerSideProps(context: object) {
    // Get User
    const session = await getSession(context);

    // const posts = await database.collection('posts').orderBy('timestamp', 'desc').get();

    // const docs = posts.docs.map(post => ({
    //     id: post.id,
    //     ...post.data(),
    //     timestamp: null,
    // }));

    return {
        props: {
            session,
            // posts: docs,
        },
    };
}
