import React, { useState } from "react";
import {
  Mail,
  MessageSquare,
  Clock3,
  Reply,
  Trash2,
  LoaderCircle,
  SquareX,
  SendHorizontal,
} from "lucide-react";
import clsx from "clsx";

function enquirycard({
  enquiry,
  deleteenquiry,
  handlereply,
  replymode,
  clickreply,
  reply,
  setreply,
  replysubmission,
}) {
  const statusStyles = {
    new: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      dot: "bg-blue-500",
    },
    "in-progress": {
      bg: "bg-amber-50",
      text: "text-amber-600",
      dot: "bg-amber-500",
    },
    responded: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      dot: "bg-emerald-500",
    },
  };

  const currentStatus = statusStyles[enquiry.status] || statusStyles.new;

  return (
    <div className="group relative overflow-hidden  border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:scale-[1.005]">
      {/* Top Gradient Line */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />

      {/* Header */}
      <div className=" flex items-start justify-between">
        <div>
          <div className=" flex items-center gap-2 text-[0.7rem] text-gray-500">
            <Clock3 size={14} />
            {new Date(enquiry.date).toLocaleString()}
          </div>
          <h2 className="text-lg font-bold text-blue-800">{enquiry.name}</h2>
        </div>

        <div
          className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${currentStatus.bg} ${currentStatus.text}`}
        >
          <span className={`h-2 w-2  rounded-full ${currentStatus.dot}`} />
          {enquiry.status}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Mail className="text-gray-400 w-[15px] translate-y-0.5" />
          <span className="truncate text-black/50">{enquiry.email}</span>
        </div>

        <div className="flex items-center gap-1">
          <p className="mx-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Subject:
          </p>

          <p className="font-medium text-gray-800">{enquiry.subject}</p>
        </div>

        <div>
          <p className="mb-1 mx-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Message
          </p>

          <div className="rounded-[4px] bg-gray-100 p-3">
            <p
              className={clsx(
                "mx-1 text-[0.7rem] leading-tight text-gray-600",
                replymode ? "" : "line-clamp-2",
              )}
            >
              {enquiry.message}
            </p>
            {replymode && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  if(replysubmission())
                    clickreply();
                }}
                className="mt-5 w-full flex gap-3"
              >
                <input
                  type="text"
                  name="reply"
                  value={reply}
                  onChange={(e) => {
                    setreply(e.target.value);
                  }}
                  placeholder="Type reply..."
                  className="flex-1 bg-white rounded-full box-border px-5 text-[0.8rem] focus:outline-none border-[2px] border-black/10 focus:border-blue-600/40"
                />
                <button
                  type="submit"
                  className="buttonanimation1 rounded-lg border bg-orange-600 p-2 text-white  transition hover:opacity-[0.7]"
                >
                  <SendHorizontal size={18} />
                </button>
              </form>
            )}
          </div>
        </div>
        {enquiry.status==="responded" && <div>
          <p className="mb-1 mx-1 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Reply
          </p>

          <div className="rounded-[4px] bg-gray-100 p-3">
            <p
              className={clsx(
                "mx-1 text-[0.7rem] leading-tight text-gray-600",
                replymode ? "" : "line-clamp-2",
              )}
            >
              {enquiry.reply}
            </p>
          </div>
        </div>}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-4">
        {enquiry.status==="responded"?<p className=" flex items-center gap-2 text-[0.7rem] text-gray-500">Replied at {new Date(enquiry.replyDate).toLocaleString()}</p>:<button
          type="button"
          onClick={handlereply}
          className={clsx(
            "flex items-center gap-2 rounded-lg  px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700",
            replymode
              ? "bg-red-600  hover:bg-red-700"
              : "bg-blue-600  hover:bg-blue-700",
          )}
        >
          {replymode ? (
            <SquareX className="translate-y-0.5" size={16} />
          ) : (
            <Reply size={16} />
          )}
          {replymode ? "Cancel" : "Reply"}
        </button>}

        <div className="flex gap-2">
          <button
            type="button"
            onClick={deleteenquiry}
            className="buttonanimation1 rounded-lg border border-red-200 bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default enquirycard;
