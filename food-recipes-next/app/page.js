import axios from "axios";
import Link from "next/link";
import Search from "./component/search";
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
    <div className="bg-gray ">
      <h1 className="p-5 text-center text-4xl ">สูตรอาหาร </h1>
      <Search />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-2 ">
        {blog.map((blog, index) => (
          <div key={index} className="border-2 borded rounded-lg p-4 shadow-xl">
            <img
              className="h-40 w-full object-cover mb-4"
              src={blog.img}
              alt="Recipe Image"
            />
            <div className="mb-2 text-2xl">เมนู : {blog.menu}</div>
            <div className="mb-4">ระดับความยาก: {blog.hard}</div>
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
