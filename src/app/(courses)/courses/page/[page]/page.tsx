import Layout from "@/components/Layout";
import CourseList from "@/components/CourseList";
import BasicMeta from "@/components/meta/BasicMeta";
import OpenGraphMeta from "@/components/meta/OpenGraphMeta";
import TwitterCardMeta from "@/components/meta/TwitterCardMeta";
import config from "@/lib/config";
import { countCourses, listCourseContent } from "@/lib/courses";
import { listTags } from "@/lib/tags";

import type { CourseContent } from "@/lib/courses";
import type { TagContent } from "@/lib/tags";

interface PageProps {
  courses: CourseContent[];
  tags: TagContent[];
  page: number;
  pagination: {
    current: number;
    pages: number;
  };
}

const getPage = async (page: number): Promise<PageProps> => {
  const courses = listCourseContent(page, config.courses_per_page);
  const tags = listTags();
  const pagination = {
    current: page,
    pages: Math.ceil(countCourses() / config.courses_per_page),
  };
  return {
    page,
    courses,
    tags,
    pagination,
  };
};

export const generateStaticParams = async () => {
  const pages = Math.ceil(countCourses() / config.courses_per_page);
  return Array.from(Array(pages - 1).keys()).map((it) => ({
    page: (it + 2).toString(),
  }));
};

const Page = async ({ params }: { params: { page: number } }) => {
  const { courses, tags, pagination, page } = await getPage(params.page);

  const url = `/courses/page/${page}`;
  const title = "All courses";
  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta url={url} title={title} />
      <CourseList courses={courses} tags={tags} pagination={pagination} />
    </Layout>
  );
};

export default Page;
