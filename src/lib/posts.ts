import { join } from "path";

import remark from 'remark'
import html from 'remark-html'
import externalLinks from 'remark-external-links'
import { read as readMatter } from "gray-matter";
import { readdirSync } from "fs";

export interface Post {
    path: string; /* id = path.split("/").join("-") */

    title?: string;
    date?: string;
    author?: string;

    html: string;
}

const _posts = join(process.cwd(), 'src', '_posts');
const suffix = '.md';
const suffixLength = suffix.length;

/** reads a single post */
export async function readPost(id: string): Promise<Post> {
    // read data and content!
    const path = join(_posts, id + suffix);
    const { data: { title: titleD, date, author: authorD }, content } = readMatter(path);
    
    // parse gray matter!
    const title = typeof titleD === 'string' ? titleD : undefined;
    const author = typeof authorD === 'string' ? authorD : undefined;

    // renader the html
    const html = await markdownToHtml(content);

    return {
        path: makePath(id),
        title,
        date,
        author,
        html
    }
}

const SLUG_REGEX = /^(\d{4})-(\d{2})-(\d{2})-(.*)$/;

function makePath(id: string): string {
    const match = id.match(SLUG_REGEX);
    if(!match) return id;
    return `${match[1]}/${match[2]}/${match[3]}/${match[4]}`;
}


export async function markdownToHtml(markdown) {
    const result = await remark().use(externalLinks, {target: '_blank', rel: ['noreferrer', 'noopener']}).use(html).process(markdown)
    return result.toString()
}

/** reads all posts */
export async function readAll(count?: number): Promise<Array<Post>> {
    const ids = readdirSync(_posts)
        .filter(v => v.endsWith(suffix))
        .map(f => f.substr(0, f.length - suffixLength));
    
    // sort and reverse
    ids.sort();
    ids.reverse();

    return Promise.all(ids.slice(0, count ?? ids.length ).map(readPost));
}