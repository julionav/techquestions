import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateTalkInput = Pick<Prisma.TalkCreateArgs, "data">
export default async function createTalk({ data }: CreateTalkInput, ctx: Ctx) {
  ctx.session.authorize()

  const talk = await db.talk.create({ data })

  return talk
}
