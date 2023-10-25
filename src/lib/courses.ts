import fs from "fs";
import matter from "gray-matter";
import path from "path";
import yaml from "js-yaml";

const coursessDirectory = path.join(process.cwd(), "content/courses");

export interface CourseContent {
  readonly date: string;
  readonly startDate: string;
  readonly endDate: string;
  readonly title: string;
  readonly slug: string;
  readonly tags?: string[];
  readonly fullPath: string;
}

let courseCache: CourseContent[];

export function fetchCourseContent(): CourseContent[] {
  if (courseCache) {
    return courseCache;
  }
  // Get file names under /posts
  const fileNames = fs.readdirSync(coursessDirectory);
  const allCoursesData = fileNames
    .filter((it) => it.endsWith(".mdx"))
    .map((fileName) => {
      // Read markdown file as string
      const fullPath = path.join(coursessDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents, {
        engines: {
          yaml: (s) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
        },
      });
      const matterData = matterResult.data as {
        date: string;
        startDate: string;
        endDate: string;
        title: string;
        tags: string[];
        slug: string;
        fullPath: string;
      };
      matterData.fullPath = fullPath;

      const slug = fileName.replace(/\.mdx$/, "");

      // Validate slug string
      if (matterData.slug !== slug) {
        throw new Error(
          "slug field not match with the path of its content source"
        );
      }

      return matterData;
    });
  console.log(allCoursesData);
  // Sort posts by date
  courseCache = allCoursesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
  return courseCache;
}

export function countCourses(tag?: string): number {
  return fetchCourseContent().filter(
    (it) => !tag || (it.tags && it.tags.includes(tag))
  ).length;
}

export function listCourseContent(
  page: number,
  limit: number,
  tag?: string
): CourseContent[] {
  return fetchCourseContent()
    .filter((it) => !tag || (it.tags && it.tags.includes(tag)))
    .slice((page - 1) * limit, page * limit);
}
