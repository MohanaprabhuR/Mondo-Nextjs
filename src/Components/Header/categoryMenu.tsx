import React from "react";
import Link from "next/link";
interface Category {
  id: string;
  name: string;
}

interface CategoryList {
  data: Category[];
}
const categoryMenu = ({ categorylist }: { categorylist: CategoryList }) => {
  return (
    <div>
      <ul className="flex space-x-3">
        {categorylist.data.map((category: Category) => (
          <li key={category.id} className="text-white">
            <Link href="#" className="nav-menu">
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default categoryMenu;
