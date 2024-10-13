import { db } from "@/db";
import { forms } from "@/db/schema";
import { eq } from "drizzle-orm";
import React, { FC } from "react";

type props = {
  params: {
    formId: string;
  };
};

const FormPage: FC<props> = async ({ params: { formId } }) => {
  const form = await db.query.forms.findFirst({
    where: eq(forms.id, formId),
  });
  console.log(form);

  if (!form) {
    return <div>Form not found</div>;
  }

  const formData = JSON.parse(JSON.parse(form.jsonForm));
  console.log(formData);

  return (
    <div>
      <h1>Form Details</h1>
      <p>Form ID: {formId}</p>
      <div>{formData.formFields[0].label}</div>
    </div>
  );
};

export default FormPage;
