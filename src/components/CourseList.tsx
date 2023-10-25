import Pagination from "./Pagination";
import CourseItem from "./CourseItem";
import TagLink from "./TagLink";

import type { CourseContent } from "@/lib/courses";
import type { TagContent } from "@/lib/tags";
import type { FC } from "react";

export interface CourseListProps {
  courses: CourseContent[];
  tags: TagContent[];
  pagination: {
    current: number;
    pages: number;
  };
}

const CourseList: FC<CourseListProps> = ({ courses, tags, pagination }) => {
  return (
    <div className="flex my-0 mx-auto max-w-[1200px] w-full py-0 px-6">
      <div className="flex flex-col flex-auto">
        <ul className="flex-[1_0_auto]">
          {courses.map((it, i) => (
            <li key={i} className="mb-6">
              <CourseItem course={it} />
            </li>
          ))}
        </ul>
        <Pagination
          current={pagination.current}
          pages={pagination.pages}
          link={{
            href: (page) => (page === 1 ? "/courses" : "/courses/page/[page]"),
            as: (page) => (page === 1 ? "" : "/courses/page/" + page),
          }}
        />
      </div>
      <ul className="hidden md:block">
        {tags.map((it, i) => (
          <li key={i} className="mb-3">
            <TagLink tag={it} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
