import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetTalksInput = Pick<Prisma.FindManyTalkArgs, "where" | "orderBy" | "skip" | "take">

export default async function getTalks(
  { where, orderBy, skip = 0, take }: GetTalksInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const talks = await db.talk.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.talk.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    talks,
    nextPage,
    hasMore,
    count,
  }
}
