"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface Show {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  shows: Show[];
}

interface CategoryList {
  data: Category[];
}

interface AllShows {
  data: Show[];
}

const CategoryMenu = ({
  categorylist,
  allshows,
}: {
  categorylist: CategoryList;
  allshows: AllShows;
}) => {
  console.log(categorylist, "categorylist");
  console.log("allshows", allshows);

  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);
  const [hoveredShowId, setHoveredShowId] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setOpenCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

  return (
    <nav className="p-4">
      <ul className="flex flex-wrap gap-6">
        {categorylist.data.map((category: Category) => (
          <li key={category.id}>
            <button
              onClick={() => toggleCategory(category.id)}
              className="text-white hover:text-blue-300 transition-colors duration-200"
            >
              {category.name}
            </button>

            {category.shows &&
              category.shows.length > 0 &&
              openCategoryId === category.id && (
                <ul className="absolute left-0 top-16 w-full h-screen overflow-scroll bg-[rgba(0,0,0,0.9)]">
                  {category.shows.map((show) => (
                    <li
                      key={show.id}
                      className="show-name py-2 hover:bg-gray-500 relative  mx-auto flex rounded-lg w-full items-center justify-between px-4 xl:max-w-[1280px] "
                      onMouseEnter={() => setHoveredShowId(show.id)}
                      onMouseLeave={() => setHoveredShowId(null)}
                    >
                      <Link href="#" className="text-white block w-full ">
                        {show.name}
                      </Link>
                      {hoveredShowId === show.id && (
                        <div className="show-banner-image flex gap-2 mt-2 absolute right-0 top-0">
                          {allshows.data.map(
                            (allshow) =>
                              allshow.id === show.id && (
                                <div
                                  key={allshow.id}
                                  className="rounded-xl overflow-hidden"
                                >
                                  <Image
                                    src={allshow.poster.src}
                                    alt={allshow.name}
                                    width={184}
                                    height={275}
                                  />
                                </div>
                              )
                          )}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryMenu;
