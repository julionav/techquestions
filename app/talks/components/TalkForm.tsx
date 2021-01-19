import React from "react"
import { Formik, Form, Field } from "formik"

type TalkFormProps = {
  initialValues: any
  onSubmit: (data: { name: string }) => void
}

const TalkForm = ({ initialValues, onSubmit }: TalkFormProps) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <label htmlFor="name">Name</label>
        <Field id="name" name="name" />
        <button>Submit</button>
      </Form>
    </Formik>
  )
}

export default TalkForm
