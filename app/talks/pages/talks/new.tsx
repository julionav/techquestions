import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createTalk from "app/talks/mutations/createTalk"
import TalkForm from "app/talks/components/TalkForm"

const NewTalkPage: BlitzPage = () => {
  const router = useRouter()
  const [createTalkMutation] = useMutation(createTalk)

  return (
    <div>
      <h1>Create New Talk</h1>

      <TalkForm
        initialValues={{}}
        onSubmit={async (values) => {
          try {
            const talk = await createTalkMutation({ data: values })
            router.push(`/talks/${talk.id}`)
          } catch (error) {
            alert("Error creating talk " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/talks">
          <a>Talks</a>
        </Link>
      </p>
    </div>
  )
}

NewTalkPage.getLayout = (page) => <Layout title={"Create New Talk"}>{page}</Layout>

export default NewTalkPage
