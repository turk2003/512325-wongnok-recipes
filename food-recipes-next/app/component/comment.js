"use client";
import { useFormState } from "react-dom";
import comment from "./action";
export default function Comment(props) {
  const initialState = {
    message: null,
  };
  const [state, formAction] = useFormState(comment, initialState);
  return (
    <form className="mb-4 " action={formAction}>
      <div>
        <input type="hidden" name="id" value={props.BlogId} />
      </div>
      <div className="mb-4">
        <input
          name="content"
          type="text"
          placeholder="กรอก Comment"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          max="10"
          min="1"
          name="score"
          type="number"
          placeholder="ให้ดาว"
          className="w-1/5 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-1/4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          ส่ง
        </button>
      </div>
    </form>
  );
}
