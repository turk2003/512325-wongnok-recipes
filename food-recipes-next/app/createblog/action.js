"use server";
import axios from "axios";
import { redirect } from "next/navigation";
import { getSession } from "@auth0/nextjs-auth0";
export default async function create(prevState, formData) {
  const { user } = await getSession();
  try {
    const menu = formData.get("name");
    const img = formData.get("img");
    const ingredients = formData.get("ingredients");
    const step = formData.get("step");
    const time = formData.get("time");
    const hard = formData.get("hard");
    const writer = user.name;
    const res = await axios.post("http://localhost:8000/menu", {
      menu,
      img,
      ingredients,
      step,
      time,
      hard,
      writer,
    });
    res;
  } catch (error) {
    console.log(error);
    return { message: error.message || "Create Fail" };
  }
  redirect("/");
}
