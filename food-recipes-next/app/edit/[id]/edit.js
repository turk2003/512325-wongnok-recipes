"use client";
import axios from "axios";
import update from "./action";
import { useState, useEffect } from "react";
const BaseUrl = "http://localhost:8000";
export default function Edit(props) {
  const [menu, setMenu] = useState({
    menu: props.blog.menu,
    img: props.blog.img,
    hard: props.blog.hard,
    time: props.blog.time,
    ingredients: props.blog.ingredients,
    step: props.blog.step,
  });
  const menuchange = (event) => {
    setMenu((previousState) => ({
      ...previousState,
      menu: event.target.value,
    }));
  };
  const imgchange = (event) => {
    setMenu((previousState) => ({
      ...previousState,
      img: event.target.value,
    }));
  };
  const stepchange = (event) => {
    setMenu((previousState) => ({
      ...previousState,
      step: event.target.value,
    }));
  };
  const ingredientschange = (event) => {
    setMenu((previousState) => ({
      ...previousState,
      ingredients: event.target.value,
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-semibold mb-4">เเก้ไขสูตร</h1>
      <div className="max-w-lg w-full p-6 bg-white rounded-md shadow-md">
        <form action={update} className="space-y-6">
          <div>
            <input type="text" name="id" hidden value={props.blog.id} />
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              ชื่อเมนู
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={menu.menu}
              onChange={menuchange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              รูปภาพ
            </label>
            <input
              onChange={imgchange}
              type="text"
              id="email"
              name="img"
              value={menu.img}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ความยาก
            </label>
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-indigo-600"
                  name="hard"
                  value="Easy"
                />
                <span className="ml-2">ง่าย</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-indigo-600"
                  name="hard"
                  value="Medium"
                />
                <span className="ml-2">ปานกลาง</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-indigo-600"
                  name="hard"
                  value="Hard"
                />
                <span className="ml-2">ยาก</span>
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              ระยะเวลา
            </label>
            <div className="mt-1">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-indigo-600"
                  name="time"
                  value="5 - 10 mins"
                />
                <span className="ml-1">5-10 นาที</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-indigo-600"
                  name="time"
                  value="11 - 30 mins"
                />
                <span className="ml-1">11-30 นาที</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-indigo-600"
                  name="time"
                  value="31 - 60 mins"
                />
                <span className="ml-1">31-60 นาที</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio h-4 w-4 text-indigo-600"
                  name="time"
                  value="60+ mins"
                />
                <span className="ml-1">60นาทีขึ้นไป</span>
              </label>
            </div>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              วัตถุดิบ
            </label>
            <textarea
              onChange={ingredientschange}
              value={menu.ingredients}
              id="message"
              name="ingredients"
              rows="3"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              วิธีทำ
            </label>
            <textarea
              onChange={stepchange}
              value={menu.step}
              id="message"
              name="step"
              rows="3"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center bg-indigo-500 text-white py-2 px-4 border border-transparent rounded-md hover:bg-indigo-600 focus:outline-none focus:border-indigo-700 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
