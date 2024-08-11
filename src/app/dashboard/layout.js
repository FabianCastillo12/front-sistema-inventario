import NavbarTop from '@/components/navbarComponents/navbarTop';
import Navbar from '../../components/dashboardComponents/navbar';
import '../../styles/dashboard.css';

export default function DashboardLayout({ children }) {
  return (
    <div id="dashboard-container">
      <div id="navbar-container">
        <Navbar />
      </div>
      
      <div id="main-content">
        <main>
        <div className=' w-full bg-[#171821]  p-2
        
        '>
        <NavbarTop/>
      </div>
          <div className='p-4 bg-[#171821] '>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
