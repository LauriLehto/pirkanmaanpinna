import PostLayout from "@/components/PostLayout";
import { fetchCourseContent } from "@/lib/courses";
import { parseISO } from "date-fns";
import fs from "fs";
import matter from "gray-matter";
import yaml from "js-yaml";
import { serialize } from "next-mdx-remote/serialize";

import type { CourseContent } from "@/lib/courses";
import type { MDXRemoteSerializeResult } from "next-mdx-remote/dist/types";

const slugToCourseContent = ((CourseContents) => {
  let hash: Record<string, CourseContent> = {};
  CourseContents.forEach((it) => (hash[it.slug] = it));
  return hash;
})(fetchCourseContent());

interface CourseProps {
  title: string;
  dateString: string;
  startDateString: string;
  endDateString: string;
  slug: string;
  tags: string[];
  author: string;
  description?: string;
  source: MDXRemoteSerializeResult;
}

const getCourse = async (slug: string): Promise<CourseProps> => {
  const source = fs.readFileSync(slugToCourseContent[slug].fullPath, "utf8");
  const { content, data } = matter(source, {
    engines: { yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object },
  });
  const mdxSource = await serialize(content);
  return {
    title: data.title,
    dateString: data.date,
    startDateString: data.startDate,
    endDateString: data.endDate,
    slug: data.slug,
    description: "",
    tags: data.tags,
    author: data.author,
    source: mdxSource,
  };
};

export const generateStaticParams = async () => {
  return fetchCourseContent().map((it) => ({ course: it.slug }));
};

const Course = async ({ params }: { params: { course: string } }) => {
  const slug = params.course;

  const { title, dateString, tags, author, description, source } = await getCourse(slug);

  return (
    <PostLayout
      title={title}
      date={parseISO(dateString)}
      slug={slug}
      tags={tags}
      author={author}
      description={description}
      source={source}
    />
  );
};

export default Course;
