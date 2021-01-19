import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getTalks from "app/talks/queries/getTalks"

const ITEMS_PER_PAGE = 100

export const TalksList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ talks, hasMore }] = usePaginatedQuery(getTalks, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {talks.map((talk) => (
          <li key={talk.id}>
            <Link href={`/talks/${talk.id}`}>
              <a>{talk.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const TalksPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/talks/new">
          <a>Create Talk</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <TalksList />
      </Suspense>
    </div>
  )
}

TalksPage.getLayout = (page) => <Layout title={"Talks"}>{page}</Layout>

export default TalksPage
