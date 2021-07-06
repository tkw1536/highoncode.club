import * as React from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';
import { Post, readAll, readPost } from "../lib/posts";
import Posting from "../components/posting";

export default class PostPage extends React.Component<{path: string, post: Post}> {
    render() {
        const { post } = this.props;
        return <Posting post={post} />
    }
}

export const getStaticProps: GetStaticProps = async ({params: {path}}) => {
    const id = (path as string[]).join("-");
    const post = await readPost(id);
    return {
        props: {
            post,
            path: id,
        }
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const posts = await readAll();
    const paths = posts.map(({ path }) => ({params: {path: path.split("/") }}));

    return {
        paths,
        fallback: false,
    };
}