"use server";
import axios from "axios";
import { redirect } from "next/navigation";
export default async function create(prevState, formData) {
  try {
    const menu = formData.get("name");
    const img = formData.get("img");
    const ingredients = formData.get("ingredients");
    const step = formData.get("step");
    const time = formData.get("time");
    const hard = formData.get("hard");
    const res = await axios.post("http://localhost:8000/menu", {
      menu,
      img,
      ingredients,
      step,
      time,
      hard,
    });
    res;
  } catch (error) {
    console.log(error);
    return { message: error.message || "Log in Fail" };
  }
  redirect("/");
}
