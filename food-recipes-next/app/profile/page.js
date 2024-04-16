import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import axios from "axios";

const BaseUrl = "http://localhost:8000";
const getmenu = async () => {
  const { user } = await getSession();
  try {
    const res = await axios.get(`${BaseUrl}/auth/${user.name}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default async function Profile() {
  const { user } = await getSession();
  const blog = await getmenu();
  console.log(blog);

  return (
    user && (
      <>
        <div className="p-6">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full mr-4"
              src={user.picture}
              alt={user.name}
            />
            <h2 className="text-lg font-semibold">{user.name}</h2>
          </div>
          <div className="my-4">
            <a
              className="text-white bg-red-500 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium mr-2"
              href="/createblog"
            >
              เพิ่มสูตร
            </a>
            <a
              className="text-red-500 hover:text-red-700 text-sm font-medium"
              href="/api/auth/logout"
            >
              Logout
            </a>
          </div>
          <h1 className="text-2xl font-semibold mb-4">สูตรของคุณ</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {blog.map((blog, index) => (
              <div key={index} className="border rounded-lg p-4">
                <img
                  className="h-40 w-full object-cover mb-4"
                  src={blog.img}
                  alt="Recipe Image"
                />
                <div className="mb-2 text-2xl">เมนู : {blog.menu}</div>
                <div className="mb-2">ระดับความยาก: {blog.hard}</div>
                <div className="mb-2">
                  คะเเนน :{" "}
                  {blog.commenter !== 0
                    ? (blog.sum_score / blog.commenter).toFixed(2)
                    : 0}{" "}
                  จาก {blog.commenter} คน
                </div>
                <div className="flex justify-between">
                  <Link
                    href={`edit/${blog.id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium"
                  >
                    เเก้ไขสูตร
                  </Link>
                  <Link
                    href={`/delete/${blog.id}`}
                    className="bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium"
                  >
                    ลบสูตร
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    )
  );
}
