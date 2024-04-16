import axios from "axios";
import update from "./action";
import Edit from "./edit";
const BaseUrl = "http://localhost:8000";
const getmenu = async (id) => {
  try {
    const res = await axios.get(`${BaseUrl}/menu/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export default async function Page({ params }) {
  const BlogId = params.id;
  const blog = await getmenu(BlogId);

  return <Edit blog={blog} />;
}
