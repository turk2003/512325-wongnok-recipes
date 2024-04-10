import axios from "axios";
const BaseUrl = "http://localhost:8000";
const deletemenu = async (id) => {
  try {
    const res = await axios.delete(`${BaseUrl}/menu/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export default function page({ params }) {
  const BlogId = params.id;
  deletemenu(BlogId);
  return (
    <div class="flex flex-col items-center justify-center h-screen">
      <img
        src="https://cdn-icons-png.flaticon.com/512/860/860829.png"
        alt="trach"
        width="200px"
      />
      <span class="text-2xl text-gray-700 mt-4 mb-4">ลบเรียบร้อย</span>
      <a
        href="/"
        class="bg-blue-500 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-blue-600 transition-colors duration-300 ease-in-out mb-2"
      >
        กลับหน้าหลัก
      </a>
      <a
        href="/profile"
        class="bg-blue-500 text-white px-4 py-2 rounded-md text-lg font-medium hover:bg-blue-600 transition-colors duration-300 ease-in-out"
      >
        กลับหน้า Profile
      </a>
    </div>
  );
}
