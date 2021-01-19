import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateTalkInput = Pick<Prisma.TalkUpdateArgs, "where" | "data">

export default async function updateTalk({ where, data }: UpdateTalkInput, ctx: Ctx) {
  ctx.session.authorize()

  const talk = await db.talk.update({ where, data })

  return talk
}
