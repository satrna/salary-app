"use client";
import EmployeeChart from "./employeeChart";
import SalaryChart from "./salaryChart";
import AttendanceChart from "./attendanceChart";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="w-1/3">
          <EmployeeChart />
        </div>
        <div className="w-1/3">
          <SalaryChart />
        </div>
        <div className="w-1/3">
          <AttendanceChart />
        </div>
      </div>
    </div>
  );
}
