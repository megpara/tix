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
    <div className="mb-2">{label}</div>
    <div className="mb-5">
      <Field
        name={name}
        className="bg-f2f2f2 border-2 border-white rounded-full p-2 text-sm outline-0 w-full md:w-3/5"
      />
      {errors && touched ? (
        <div className="text-red-500 text-xs mt-3">{errors}</div>
      ) : null}
    </div>
  </div>
);

type Props = {
  info: InfoType;
  onSubmit: (values: any) => void;
};

export default function Info({ info, onSubmit }: Props) {
  return (
    <div className="w-4/5 lg:w-3/5 mt-10 lg:m-0">
      <Formik
        initialValues={info}
        validationSchema={SignupSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col">
            <div className="lg:ml-10">
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
              <label className="text-xs">
                <Field type="checkbox" name="toggle" className="mr-2" />
                Subscribe to our mailing list
              </label>
            </div>
            <div className="flex justify-center">
              <button
                disabled={isSubmitting}
                type="submit"
                className="btn mt-10 w-min"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
