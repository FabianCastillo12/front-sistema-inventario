import "../../../styles/dashboard.css";

export default function StockLayout({ children }) {
  return (
    <div id="dashboard-container">
      <div id="main-content">
        <main className=" bg-[#21222D]     h-full">
          <div className="container mx-auto px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
