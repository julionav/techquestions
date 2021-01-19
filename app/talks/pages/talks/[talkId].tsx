import React, { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getTalk from "app/talks/queries/getTalk"
import deleteTalk from "app/talks/mutations/deleteTalk"
import QuestionList from "app/questions/QuestionList"

export const Talk = () => {
  const router = useRouter()
  const talkId = useParam("talkId", "number")
  const [talk] = useQuery(getTalk, { where: { id: talkId } })
  const [deleteTalkMutation] = useMutation(deleteTalk)

  return (
    <div>
      <h1>Talk {talk.name}</h1>

      <Link href={`/talks/${talk.id}/edit`}>
        <a>Edit</a>
      </Link>

      <QuestionList talkId={talkId} />

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteTalkMutation({ where: { id: talk.id } })
            router.push("/talks")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowTalkPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/talks">
          <a>Talks</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Talk />
      </Suspense>
    </div>
  )
}

ShowTalkPage.getLayout = (page) => <Layout title={"Talk"}>{page}</Layout>

export default ShowTalkPage
