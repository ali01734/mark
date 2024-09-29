import React, { useState } from "react";

type ShowProps = {};

const Show: React.FC<ShowProps> = () => {
  const [limit, setLimit] = useState(24);

  return (
    <div className="sort-by limit-by hidden-xs bg-[#f7f7f7] px-3 py-1 rounded">
      <label htmlFor="setLimit" className="flex items-center space-x-2">
        <span className="bg-[#f7f7f7]  rounded">Show</span>
        <select
          id="setLimit"
          className="p-2 bg-[#f7f7f7]  rounded"
          onChange={(e) => setLimit(parseInt(e.target.value))}
          value={limit}
        >
          <option value="24">24</option>
          <option value="48">48</option>
          <option value="64">64</option>
        </select>
      </label>
    </div>
  );
};

export default Show;
