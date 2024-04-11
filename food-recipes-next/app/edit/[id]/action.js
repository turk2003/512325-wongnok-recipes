"use server";
import axios from "axios";
import { redirect } from "next/navigation";
export const getmenu = async (id) => {
  try {
    const res = await axios.get(`${BaseUrl}/menu/${id}`);

    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export default async function update(formData) {
  try {
    const id = formData.get("id");
    const menu = formData.get("name");
    const img = formData.get("img");
    const ingredients = formData.get("ingredients");
    const step = formData.get("step");
    const time = formData.get("time");
    const hard = formData.get("hard");
    const res = await axios.put(`http://localhost:8000/menu/${id}`, {
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
    return { message: error.message || "Edit Fail" };
  }
  redirect("/");
}
