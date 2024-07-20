"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const ContactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email(),
  age: z.number().min(21, "Min age is 21"),
  message: z.string(),
  reply: z.boolean(),
});

export function ContactForm() {
  const form = useForm({
    resolver: zodResolver(ContactFormSchema),
  });

  const handleSendData = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSendData)}>
      <div className="flex flex-col w-8/12 mx-auto">
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          className="border rounded"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <div className="text-xs text-red-400">
            {form.formState.errors.name.message}
          </div>
        )}

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="border rounded"
          {...form.register("email")}
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          className="border rounded"
          {...form.register("message")}
        ></textarea>

        <div className="flex flew-row gap-2">
          <input id="reply" type="checkbox" {...form.register("reply")} />
          <label htmlFor="reply">Reply with email</label>
        </div>

        <label htmlFor="age">Age</label>
        <input
          id="age"
          type="number"
          className="border rounded"
          {...form.register("age", {
            valueAsNumber: true,
          })}
        />
        {form.formState.errors.age && (
          <div className="text-xs text-red-400">
            {form.formState.errors.age.message}
          </div>
        )}

        <button
          type="submit"
          className="bg-sky-500 text-white p-3 rounded mt-4"
        >
          Send Info
        </button>
      </div>
    </form>
  );
}