import axios from "axios";
import Comment from "@/app/component/comment";
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
const getcomments = async (id) => {
  try {
    const res = await axios.get(`${BaseUrl}/comments/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export default async function Page({ params }) {
  const BlogId = params.id;
  const blog = await getmenu(BlogId);
  const comments = await getcomments(BlogId);
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
      <div>
        <h1 className="text-lg font-semibold mb-4 mt-4">Comments</h1>
        <Comment BlogId={BlogId} />
        {comments.map((comment, index) => (
          <div
            key={index}
            className="bg-blue-300 border border-gray-200 rounded-md shadow-sm p-3 mb-3"
          >
            <p className="text-black text-lg font-semibold ">
              {comment.writer}
            </p>
            <p className="text-black font-semibold text-sm">
              คะเเนน :{comment.score}
            </p>
            <p className="text-gray-800 text-sm">{comment.comment_content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
