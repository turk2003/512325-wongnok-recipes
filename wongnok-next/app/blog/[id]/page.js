import axios from "axios";
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
  return (
    <div>
      <div>
        <h1>{blog.menu}</h1>
        <img width="200" alt="logo" src={blog.img} />
        <div>ขั้นตอน {blog.ingredients}</div>
        <div>เวลา : {blog.time}</div>
        <div>วิธีทำ : {blog.step}</div>
        <div> hard : {blog.hard}</div>
      </div>
    </div>
  );
}
