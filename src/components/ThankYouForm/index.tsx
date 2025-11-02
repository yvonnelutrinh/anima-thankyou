'use client';
import { useForm } from "react-hook-form";

export default function ThankYouForm() {
  const { register, handleSubmit, watch } = useForm();

  //TODO: delete console log + convert to PDF download
  const onSubmit = (data) => console.log(data);

  console.log(watch("firstName"));
  console.log(watch("lastName"));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        First name:
        <input type="text" {...register("firstName")} />
      </label>
      <label>
        Last name:
        <input type="text" {...register("lastName")} />
      </label>
      <button type="submit">Download PDF</button>
    </form>
  );
}
