import Sidebar from '../components/Sidebar';
import SalesChart from '../components/SalesChart';
import FavoriteProduct from '../components/FavoriteProduct';
import Notifications from '../components/Notifications';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <div className="dashboard-main">
          <div className="chart-section">
            <SalesChart />
          </div>
        </div>
        <div className="dashboard-sidebar">
          <FavoriteProduct />
          <Notifications />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
