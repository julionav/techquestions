import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteTalkInput = Pick<Prisma.TalkDeleteArgs, "where">

export default async function deleteTalk({ where }: DeleteTalkInput, ctx: Ctx) {
  ctx.session.authorize()

  const talk = await db.talk.delete({ where })

  return talk
}
