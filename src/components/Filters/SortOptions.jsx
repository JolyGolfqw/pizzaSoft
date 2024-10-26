import React from "react";

const SortOptions = ({
  sortOrder,
  setSortOrder,
  sortDirection,
  setSortDirection,
}) => (
  <>
    <select
      aria-label="Порядок сортировки"
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
    >
      <option value="default">По умолчанию</option>
      <option value="name">Сортировать по имени</option>
      <option value="age">Сортировать по возрасту</option>
    </select>

    <select
      aria-label="Направление сортировки"
      value={sortDirection}
      onChange={(e) => setSortDirection(e.target.value)}
      disabled={sortOrder === "default"}
    >
      <option value="asc">По возрастанию</option>
      <option value="desc">По убыванию</option>
    </select>
  </>
);

export default SortOptions;
