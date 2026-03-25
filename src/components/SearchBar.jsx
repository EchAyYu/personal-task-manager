import '../styles/SearchBar.css';

const SearchBar = ({ searchTerm, onSearchChange, statusFilter, onStatusFilterChange, taskCount }) => {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="🔍 Tìm kiếm công việc..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button
            className="clear-search"
            onClick={() => onSearchChange('')}
            title="Xóa"
          >
            ✕
          </button>
        )}
      </div>

      <div className="filter-wrapper">
        <select
          value={statusFilter}
          onChange={(e) => onStatusFilterChange(e.target.value)}
          className="status-filter"
        >
          <option value="All">Tất cả ({taskCount})</option>
          <option value="TODO">Chưa bắt đầu</option>
          <option value="In Progress">Đang làm</option>
          <option value="Done">Hoàn thành</option>
        </select>
      </div>
    </div>
  );
};

export default SearchBar;
