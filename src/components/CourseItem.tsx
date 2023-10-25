import { parseISO } from "date-fns";
import Link from "next/link";
import Date from "./Date";

import type { CourseContent } from "@/lib/courses";
import type { FC } from "react";

export interface CourseItemProps {
  course: CourseContent;
}

const CourseItem: FC<CourseItemProps> = ({ course }) => {
  return (
    <Link href={"/courses/" + course.slug} className="text-gray-800 inline-block">
      <Date date={parseISO(course.date)} />
      <h2 className="m-0 font-medium">{course.title}</h2>
    </Link>
  );
};

export default CourseItem;
