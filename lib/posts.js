import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDir = path.join(process.cwd(), "posts");

export const getSortedPostsData = () => {
  const fileNames = fs.readdirSync(postsDir);

  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/.md$/, "");

    const fileContents = fs.readFileSync(
      path.join(postsDir, fileName),
      "utf-8"
    );

    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
};

export const getAllPostIds = () => {
  const fileNames = fs.readdirSync(postsDir);
  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/.md$/, ""),
    },
  }));
};

export const getPostDataByid = async (id) => {
  const fileContents = fs.readFileSync(path.join(postsDir, `${id}.md`));
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHTML = processedContent.toString();

  return {
    id,
    contentHTML,
    ...matterResult.data,
  };
};
