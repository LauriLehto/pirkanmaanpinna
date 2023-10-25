import Layout from "@/components/Layout";
import BasicMeta from "@/components/meta/BasicMeta";
import OpenGraphMeta from "@/components/meta/OpenGraphMeta";
import TwitterCardMeta from "@/components/meta/TwitterCardMeta";
import CourseList from "@/components/CourseList";
import config from "@/lib/config";
import { countCourses, listCourseContent } from "@/lib/courses";
import { listTags } from "@/lib/tags";

import type { CourseContent } from "@/lib/courses";
import type { TagContent } from "@/lib/tags";

interface CoursesProps {
  courses: CourseContent[];
  tags: TagContent[];
  pagination: {
    current: number;
    pages: number;
  };
}

const getCourses = async (): Promise<CoursesProps> => {
  const courses = listCourseContent(1, config.courses_per_page);
  const tags = listTags();
  const pagination = {
    current: 1,
    pages: Math.ceil(countCourses() / config.courses_per_page),
  };
  return {
    courses,
    tags,
    pagination,
  };
};

const Courses = async () => {
  const { courses, tags, pagination } = await getCourses();

  const url = "/courses";
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

export default Courses;
