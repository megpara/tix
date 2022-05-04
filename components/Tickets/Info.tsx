import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Info as InfoType } from "../../lib/types";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

type FieldItemProps = {
  name: string;
  label: string;
  touched: boolean | undefined;
  errors: string | undefined;
};
const FieldItem = ({ name, label, touched, errors }: FieldItemProps) => (
  <div>
    <div>{label}</div>
    <Field name={name} />
    {errors && touched ? <div>{errors}</div> : null}
  </div>
);

type Props = {
  info: InfoType;
  onSubmit: (values: any) => void;
};

export default function Info({ info, onSubmit }: Props) {
  return (
    <div>
      <div>Info</div>
      <Formik
        initialValues={info}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col">
            <FieldItem
              name="firstName"
              label="First Name"
              errors={errors.firstName}
              touched={touched.firstName}
            />
            <FieldItem
              name="lastName"
              label="Last Name"
              errors={errors.lastName}
              touched={touched.lastName}
            />
            <FieldItem
              name="email"
              label="Email"
              errors={errors.email}
              touched={touched.email}
            />
            <button disabled={isSubmitting} type="submit" className="btn mt-10">
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
