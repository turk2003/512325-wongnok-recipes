import axios from "axios";
const BaseUrl = "http://localhost:8000";
const getmenu = async (menu) => {
  try {
    const res = await axios.get(`${BaseUrl}/menu2/${menu}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export default async function Page({ params }) {
  const BlogMenu = params.menu;
  const blog = await getmenu(BlogMenu);
  return (
    <div class="p-6 max-w-md mx-auto bg-gray rounded-xl shadow-xl overflow-hidden md:max-w-2xl">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img
            class="h-48 w-full object-cover md:h-full md:w-48"
            src={blog.img}
            alt="blog image"
          />
        </div>
        <div class="p-8">
          <div class="uppercase tracking-wide text-3xl text-indigo-500 font-semibold">
            {blog.menu}
          </div>
          <div class="mt-2 text-yellow-500 text-xl ">วัตถุดิบ : </div>
          {blog.ingredients}

          <div class="mt-2 text-yellow-500 text-xl ">วิธีทำ :</div>
          {blog.step}
          <div class="mt-2 text-gray-500">เวลา : {blog.time}</div>
          <div class="mt-2 text-gray-500">ระดับความยาก : {blog.hard}</div>
        </div>
      </div>
    </div>
  );
}
