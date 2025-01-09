
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

  const handleRowClick = () => {
    const modal = document.getElementById("my_modal_3");
    if (modal) {
      (modal as HTMLDialogElement).showModal();
    }
  };

  return (
    <div>
      <h1 className="px-4">所有揪團資訊</h1>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>ID</th>
              <th>HOST</th>
              <th>DATE</th>
              <th>START TIME</th>
              <th>END TIME</th>
              <th>LOCATION</th>
              <th>DESCRIPTION</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over events to generate rows */}
            {events.map((event) => (
              <>
                <tr
                  className="hover cursor-pointer"
                  key={event.id}
                  onClick={handleRowClick} // 使用處理函數
                >
                  <th>{event.id}</th>
                  <td>{event.host}</td>
                  <td>{event.date}</td>
                  <td>{event.startTime}</td>
                  <td>{event.endTime}</td>
                  <td>{event.location}</td>
                  <td>{event.description}</td>
                </tr>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                      </button>
                    </form>
                    <h3 className="font-bold text-lg">揪團資訊</h3>
                    <div className="my-4 p-4 flex flex-col  bg-base-200 rounded-lg">
                      <p className="py-2">團長：{event.host}</p>
                      <hr />
                      <p className="py-2">揪團活動：{event.description}</p>
                      <hr />
                      <p className="py-2">日期：{event.date}</p>
                      <hr />
                      <p className="py-2">
                        時間：{event.startTime} - {event.endTime}
                      </p>
                      <hr />
                      <p className="py-2">地點：{event.location}</p>

                      <hr />
                    </div>
                    <button className="btn btn-warning ml-80 min-w-[150px] text-lg flex-shrink-0">
                      加入揪團
                    </button>
                  </div>
                </dialog>
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
