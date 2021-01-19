import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetTalkInput = Pick<Prisma.FindFirstTalkArgs, "where">

export default async function getTalk({ where }: GetTalkInput, ctx: Ctx) {
  ctx.session.authorize()

  const talk = await db.talk.findFirst({ where })

  if (!talk) throw new NotFoundError()

  return talk
}
