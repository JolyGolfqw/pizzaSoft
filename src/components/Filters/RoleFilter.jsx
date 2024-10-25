// RoleFilter.js

import React from 'react';

const RoleFilter = ({ roleFilter, setRoleFilter }) => (
  <select aria-label="Должность" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
    <option value="">Все должности</option>
    <option value="cook">Повар</option>
    <option value="waiter">Официант</option>
    <option value="driver">Водитель</option>
  </select>
);

export default RoleFilter;
