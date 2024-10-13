"use server";
import { google, createGoogleGenerativeAI } from "@ai-sdk/google";
import { createStreamableValue, streamUI } from "ai/rsc";
import { generateObject, generateText, streamObject } from "ai";
import { z } from "zod";
import { db } from "@/db";
import { forms } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

const genAI = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY as string,
});

const { userId } = auth();

const schema = z.object({
  form: z.object({
    formTitle: z.string(),
    formDescription: z.string(),
    formFields: z.array(
      z.object({
        label: z.string(),
        fieldType: z.enum([
          "text",
          "email",
          "number",
          "date",
          "checkbox",
          "radio",
          "select",
          "textarea",
        ]),
        required: z.boolean().optional(),
      })
    ),
  }),
});

export const aiGenerate = async (userInput: string) => {
  "use server";
  const stream = createStreamableValue();

  const { object: form } = await generateObject({
    model: google("gemini-1.5-pro-002"),
    output: "object",
    schema,
    prompt: `Build me a complete form using shadcnUi with react using the given context. Give me the form only: ${userInput}`,
  });

  return form;
};

export const createForm = async (userInput: string, name: string) => {
  await db.insert(forms).values({
    jsonForm: JSON.stringify(userInput, null, 2),
    createdBy: String(name),
  });
};
