import React, { useState } from "react";

const SortBy: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState<string>("manual");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortType = event.target.value;
    setSelectedSort(sortType);
    console.log(`Sorting by: ${sortType}`);
    // Add any additional logic here to handle sorting based on the sortType
  };

  return (
    <div className="rounded ">
      <label htmlFor="sort-by-select" className="sr-only">
        Sort By
      </label>
      <select
        id="sort-by-select"
        value={selectedSort}
        onChange={handleChange}
        className="p-2 bg-[#f7f7f7] rounded py-3"
      >
        <option value="stock-descending">Availability</option>
        <option value="best-selling">Best Selling</option>
        <option value="title-ascending">Alphabetically, A-Z</option>
        <option value="title-descending">Alphabetically, Z-A</option>
        <option value="price-ascending">Price, low to high</option>
        <option value="price-descending">Price, high to low</option>
        <option value="created-descending">Date, new to old</option>
        <option value="created-ascending">Date, old to new</option>
        <option value="sale-descending">% Sale off</option>
        <option value="manual">Featured</option>
      </select>
    </div>
  );
};

export default SortBy;
