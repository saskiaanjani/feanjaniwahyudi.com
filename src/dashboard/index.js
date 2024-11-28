import SidebarDashboard from "../components/SidebarDashboard";
import ChartArticlesPopular from "../components/ChartArticlesPopular";

const IndexDashboard = () => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '21%' }}>
          <SidebarDashboard />
        </div>
        <div style={{ width: '79%', marginTop: '60px', padding: '20px' }}>
          <ChartArticlesPopular />
        </div>
      </div>
    </div>
  );
};

export default IndexDashboard;
