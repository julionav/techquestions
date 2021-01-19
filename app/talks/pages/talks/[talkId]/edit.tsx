import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getTalk from "app/talks/queries/getTalk"
import updateTalk from "app/talks/mutations/updateTalk"
import TalkForm from "app/talks/components/TalkForm"

export const EditTalk = () => {
  const router = useRouter()
  const talkId = useParam("talkId", "number")
  const [talk, { setQueryData }] = useQuery(getTalk, { where: { id: talkId } })
  const [updateTalkMutation] = useMutation(updateTalk)

  return (
    <div>
      <h1>Edit Talk {talk.id}</h1>
      <pre>{JSON.stringify(talk)}</pre>

      <TalkForm
        initialValues={talk}
        onSubmit={async (values) => {
          try {
            const updated = await updateTalkMutation({
              where: { id: talk.id },
              data: { name: values.name },
            })
            await setQueryData(updated)
            router.push(`/talks/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error editing talk " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditTalkPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTalk />
      </Suspense>

      <p>
        <Link href="/talks">
          <a>Talks</a>
        </Link>
      </p>
    </div>
  )
}

EditTalkPage.getLayout = (page) => <Layout title={"Edit Talk"}>{page}</Layout>

export default EditTalkPage
