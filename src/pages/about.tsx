import * as React from 'react';
import { GetStaticProps } from "next";
import { markdownToHtml } from "../lib/posts";
import { join } from "path";
import { promises } from "fs";
import StaticPage from "../components/static";

export default class Page extends React.Component<{ html: string }> {
    render() {
        const { html } = this.props;
        return <StaticPage title="About" html={html} />;
    }
}

export const getStaticProps: GetStaticProps = async () => {
    const content = join(process.cwd(), 'src', '_static', 'about.md');
    const data = await promises.readFile(content);
    return {
        props: {
            html: await markdownToHtml(data), 
        }
    }
}