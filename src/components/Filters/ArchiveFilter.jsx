import React from "react";

const ArchiveFilter = ({ isArchiveFilter, setIsArchiveFilter }) => (
  <label>
    В архиве
    <input
      type="checkbox"
      checked={!!isArchiveFilter}
      onChange={(e) => setIsArchiveFilter(e.target.checked ? true : null)}
    />
  </label>
);

export default ArchiveFilter;
