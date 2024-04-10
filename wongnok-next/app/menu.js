"use server";
const getmenu = async () => {
  try {
    const res = await axios.get(`${BaseUrl}/menu`);
    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
export const menu = () => {
  const blog = getmenu();
  return blog;
};
