import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../components/ecommerce/StatisticsChart";
import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Dashboard"
        description="Dashboard"
      />
     
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        {/* Row 1: Left - MonthlyTarget, Right - Metrics & SalesChart */}
        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>
        
        <div className="col-span-12 xl:col-span-7 space-y-6">
          <EcommerceMetrics />
          <MonthlySalesChart />
        </div>

        {/* Row 2: Full width StatisticsChart */}
        <div className="col-span-12">
          <StatisticsChart />
        </div>

        {/* Row 3: Bottom two cards - each takes full width */}
        <div className="col-span-12">
          <DemographicCard />
        </div>
        
        <div className="col-span-12">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}