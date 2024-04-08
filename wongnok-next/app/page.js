import axios from "axios";
import Link from "next/link";
import { getSession } from "@auth0/nextjs-auth0";
const BaseUrl = "http://localhost:8000";
const getmenu = async () => {
  try {
    const res = await axios.get(`${BaseUrl}/menu`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default async function Page() {
  const blog = await getmenu();
  console.log(blog);

  return (
    <div className="  ">
      <h1 className="p-5 text-center text-4xl ">สูตรอาหาร </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {blog.map((blog, index) => (
          <div key={index} className="border rounded-lg p-4">
            <img
              className="h-40 w-full object-cover mb-4"
              src={blog.img}
              alt="Recipe Image"
            />
            <div className="mb-2">Menu: {blog.menu}</div>
            <div className="mb-4">Hard: {blog.hard}</div>
            <div className="flex justify-between">
              <Link
                href={`blog/${blog.id}`}
                className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium"
              >
                ดูสูตร
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
