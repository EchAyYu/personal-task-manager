import '../styles/Statistics.css';

const Statistics = ({ stats }) => {
  return (
    <div className="statistics">
      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-content">
          <p className="stat-label">Tổng công việc</p>
          <p className="stat-value">{stats.total}</p>
        </div>
      </div>

      <div className="stat-card success">
        <div className="stat-icon">✅</div>
        <div className="stat-content">
          <p className="stat-label">Hoàn thành</p>
          <p className="stat-value">{stats.completed}</p>
          {stats.total > 0 && (
            <p className="stat-percentage">
              {Math.round((stats.completed / stats.total) * 100)}%
            </p>
          )}
        </div>
      </div>

      <div className="stat-card pending">
        <div className="stat-icon">⏳</div>
        <div className="stat-content">
          <p className="stat-label">Đang làm</p>
          <p className="stat-value">{stats.inProgress}</p>
        </div>
      </div>

      <div className="stat-card todo">
        <div className="stat-icon">📝</div>
        <div className="stat-content">
          <p className="stat-label">Chưa bắt đầu</p>
          <p className="stat-value">{stats.todo}</p>
        </div>
      </div>

      <div className={`stat-card ${stats.overdue > 0 ? 'danger' : ''}`}>
        <div className="stat-icon">⚠️</div>
        <div className="stat-content">
          <p className="stat-label">Quá hạn</p>
          <p className="stat-value">{stats.overdue}</p>
          {stats.overdue > 0 && (
            <p className="stat-warning">Cần xử lý</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
