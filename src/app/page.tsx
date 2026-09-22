import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import DashBoardCards from './components/layout/DashBoardCards';
import SalesChart from './components/layout/SalesChart';
import RecentSales from './components/layout/RecentSales';
import './globals.css';

export default function home() {

  return (

    <div>
      <Sidebar />
      <main className="main-content">
        <Header />
        <div className="dashboard-content">
          <DashBoardCards />
          <div className="dashboard-row">
            <SalesChart />
            <RecentSales />
          </div>
        </div>
      </main>
    </div>

  )

}