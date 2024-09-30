import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string, chapterId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const isCourseOwner = await db.course.findUnique({
      where: { userId, id: params.courseId },
    })

    if (!isCourseOwner) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const unpublishedChapter = await db.chapter.update({
      where: { id: params.chapterId },
      data: { isPublished: false }
    })

    const publishedChaptersInCourse = await db.chapter.count({
      where: { courseId: params.courseId, isPublished: true }
    })

    if (publishedChaptersInCourse === 0) {
      await db.course.update({
        where: { id: params.courseId },
        data: { isPublished: false }
      })
    }

    return NextResponse.json(unpublishedChapter)
  } catch (error) {
    console.log("CHAPTER_PUBLISH", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}