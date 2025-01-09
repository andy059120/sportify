"use client";
import { useEffect, useState } from "react";

export default function Homepage() {
  interface Event {
    id: number;
    host: string;
    date: string;
    startTime: string;
    endTime: string;
    description: string;
    location: string;
  }

  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("18:00");

  useEffect(() => {
    // 呼叫後端 API 取得事件資料
    fetch("http://localhost:8000/api/events")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // 解析 JSON 格式的回應
      })
      .then((data) => {
        console.log(data); // 顯示取得的資料
        setEvents(data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const handleRowClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="px-4">新增一筆揪團</h1>
        <button className="btn ">新增一筆揪團</button>
      </div>
      <div className="overflow-x-auto px-4">
        <label className="form-control w-full max-w-xs py-2">
          <div className="label">
            <span className="label-text">揪團內容</span>
          </div>
          <input
            type="text"
            placeholder="輸入揪團內容"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs py-2">
          <div className="label">
            <span className="label-text">揪團場地</span>
          </div>
          <input
            type="text"
            placeholder="輸入揪團場地"
            className="input input-bordered w-full max-w-xs"
          />
        </label>
        <label className="form-control w-full max-w-xs py-2">
          <div className="label">
            <span className="label-text">揪團日期</span>
          </div>

          <div className="relative max-w-sm cursor-pointer">
            <div className="cursor-pointer absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="cursor-pointer w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              id="datepicker-actions"
              type="date"
              className="cursor-pointer bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Select date"
            />
          </div>
        </label>
        <div className="flex flex-row gap-4">
          <label className="form-control w-full max-w-xs py-2">
            <div className="label">
              <span className="label-text">揪團開始時間</span>
            </div>

            <input
              type="time"
              id="time"
              className="cursor-pointer rounded-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              min="09:00"
              max="22:00"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </label>
          <label className="form-control w-full max-w-xs py-2">
            <div className="label">
              <span className="label-text">揪團結束時間</span>
            </div>
            <input
              type="time"
              id="time"
              className="cursor-pointer rounded-lg bg-gray-50 border text-gray-900 leading-none focus:ring-blue-500 focus:border-blue-500 block flex-1 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              min="09:00"
              max="22:00"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </label>
        </div>
      </div>
    </div>
  );
}
