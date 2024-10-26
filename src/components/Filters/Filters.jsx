import React from "react";
import RoleFilter from "./RoleFilter";
import ArchiveFilter from "./ArchiveFilter";
import SortOptions from "./SortOptions";
import styles from "./Filters.module.scss";

const Filters = ({
  roleFilter,
  setRoleFilter,
  isArchiveFilter,
  setIsArchiveFilter,
  sortOrder,
  setSortOrder,
  sortDirection,
  setSortDirection,
}) => {
  return (
    <div className={styles.filters}>
      <ArchiveFilter
        isArchiveFilter={isArchiveFilter}
        setIsArchiveFilter={setIsArchiveFilter}
      />
      <RoleFilter roleFilter={roleFilter} setRoleFilter={setRoleFilter} />
      <SortOptions
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />
    </div>
  );
};

export default Filters;
