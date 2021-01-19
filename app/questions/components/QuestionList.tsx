import React from "react"
import { useQuery } from "blitz"
import getQuestions from "../queries/getQuestions"

function QuestionList({ talkId }: { talkId: number }) {
  const [{ questions }] = useQuery(getQuestions, { where: { talk: { id: talkId } } })

  return (
    <div>
      <ul>
        {questions.map((question) => (
          <li>{question.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default QuestionList
