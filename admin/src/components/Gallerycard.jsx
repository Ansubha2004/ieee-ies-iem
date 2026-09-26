import React, { useState } from "react";
import { Images, Plus, Pencil, Trash2, CalendarDays } from "lucide-react";

function Gallerycard() {
  const [gallery, setGallery] = useState([
    {
      id: 1,
      title: "AARAMBH 1.0",
      date: "16 July 2025",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678",
    }
  ]);

  const handleDelete = (id) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="w-full rounded-xl border border-slate-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Images size={19} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Gallery Management
            </h2>

            <p className="text-xs text-slate-500">
              For showcasing the moments from the journey of IEEE IES Chapter
            </p>
          </div>
        </div>
        <label>
          <input name="image" type="file" accept="image/*" className="hidden" />
          <div
            className="
            flex items-center gap-1.5
            rounded-md
            bg-orange-500
            px-3.5 py-2
            text-sm font-medium text-white
            hover:bg-orange-600
          "
          >
            <Plus size={16} />
            Add Photos
          </div>
        </label>
      </div>

      {/* Gallery */}
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-600">
            Gallery Items
          </span>

          <span className="text-xs text-slate-500">{gallery.length} items</span>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {gallery.map((item) => (
            <div
              key={item.id}
              className="
                overflow-hidden
                rounded-lg
                border border-slate-200
                bg-white
              "
            >
              {/* Image */}
              <div className="relative h-32 bg-slate-100">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover"
                />

                {/* Actions */}
                <div className="absolute right-2 top-2 flex gap-1">
                  <button
                    className="
                      flex h-7 w-7 items-center justify-center
                      rounded-md bg-white/95
                      text-slate-600
                      shadow-sm
                      hover:text-blue-600
                    "
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="
                      flex h-7 w-7 items-center justify-center
                      rounded-md bg-white/95
                      text-slate-600
                      shadow-sm
                      hover:text-red-600
                    "
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Gallerycard;
