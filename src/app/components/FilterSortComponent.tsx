import { useState } from "react";
import type { TEventType } from "../../types/event";

interface FilterSortComponentProps {
  onFilterChange: (filter: TEventType | null) => void;
  onSortChange: (sort: string | null) => void;
}

const FilterSortComponent: React.FC<FilterSortComponentProps> = ({
  onFilterChange,
  onSortChange,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<TEventType | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      {/* Filter Dropdown */}
      <select
        value={selectedFilter || ""}
        onChange={(e) => {
          const value = e.target.value;
          const filterValue = value === "" ? null : (value as TEventType);
          setSelectedFilter(filterValue);
          onFilterChange(filterValue);
        }}
        className="p-2 border rounded-lg bg-gray-900 text-white border-gray-600"
      >
        <option value="">All Event Types</option>
        <option value="workshop">Workshop</option>
        <option value="activity">Activity</option>
        <option value="tech_talk">Tech Talk</option>
      </select>

      {/* Sort Dropdown */}
      <select
        value={selectedSort || ""}
        onChange={(e) => {
          const value = e.target.value;
          setSelectedSort(value === "" ? null : value);
          onSortChange(value === "" ? null : value);
        }}
        className="p-2 border rounded-lg bg-gray-900 text-white border-gray-600"
      >
        <option value="">Sort By</option>
        <option value="date">Date</option>
        <option value="name">Name</option>
      </select>
    </div>
  );
};

export default FilterSortComponent;
