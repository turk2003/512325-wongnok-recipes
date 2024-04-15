"use server";
import axios from "axios";
import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
export default async function comment(prevState, formData) {
  const { user } = await getSession();
  const blog_post_id = formData.get("id");
  try {
    const comment_content = formData.get("content");
    const score = formData.get("score");
    const writer = user.name;
    const blog_post_id = formData.get("id");
    const res = await axios.post("http://localhost:8000/comments", {
      comment_content,
      score,
      blog_post_id,
      writer,
    });
    res;
  } catch (error) {
    console.log(error);
    return { message: error.message || "Comment Fail" };
  }
  redirect(`/blog/${blog_post_id}`);
}
