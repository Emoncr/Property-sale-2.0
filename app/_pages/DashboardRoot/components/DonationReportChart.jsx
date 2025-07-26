"use client";

import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
  LabelList,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "An interactive donation chart";

const CHART_CONFIG = {
  amount: {
    label: "Donation Amount",
    color: "#008a8a",
  },
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const FILTER_OPTIONS = [
  { key: "7days", label: "7 Days" },
  { key: "30days", label: "30 Days" },
  { key: "6months", label: "6 Months" },
  { key: "12months", label: "12 Months" },
];

const sampleData = MONTHS.map((_, index) => ({
  createdAt: `2024-${String(index + 1).padStart(2, "0")}-01`,
  amount: Math.floor(Math.random() * 2500) + 500,
}));

const CustomLabel = ({ x, y, width, value }) => {
  if (value === 0) return null;

  return (
    <g>
      <rect
        x={x + width / 2 - 25}
        y={y - 40}
        width={50}
        height={25}
        fill="#008a8a"
        rx={4}
      />
      <text
        x={x + width / 2}
        y={y - 23}
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
      >
        ${value}
      </text>
      <circle
        cx={x + width / 2}
        cy={y - 10}
        r="5"
        fill="#008a8a"
        stroke="white"
        strokeWidth="2"
      />
    </g>
  );
};

export function DonationReportChart({ donationReportData = sampleData }) {
  const [activeChart, setActiveChart] = React.useState("12months");

  const transformedData = React.useMemo(
    () =>
      donationReportData.map(({ createdAt, amount }) => ({
        date: createdAt,
        amount,
      })),
    [donationReportData]
  );

  const getFilteredData = React.useMemo(() => {
    const now = new Date();
    const filterDays = {
      "7days": 7,
      "30days": 30,
      "6months": 180,
      "12months": 365,
    };

    const days = filterDays[activeChart];
    const cutoffDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

    if (activeChart === "7days" || activeChart === "30days") {
      return getDailyData(days, now, cutoffDate, transformedData);
    }

    return getMonthlyData(activeChart, cutoffDate, transformedData);
  }, [activeChart, transformedData]);

  const totalAmount = React.useMemo(
    () => getFilteredData.reduce((sum, { amount }) => sum + amount, 0),
    [getFilteredData]
  );

  const formatXAxisTick = (value) => value;

  const formatTooltipLabel = (value) =>
    ["7days", "30days"].includes(activeChart) ? value : `${value} 2024`;

  return (
    <Card className="w-full font-primary">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-8">
        <div className="flex flex-col space-y-4">
          <CardTitle className="text-2xl font-semibold text-gray-900">
            Donations Report
          </CardTitle>
          <div>
            <CardDescription className="text-sm text-gray-500 font-medium">
              Total Donations
            </CardDescription>
            <div className="text-4xl font-bold text-primary font-primary mt-1">
              ${totalAmount.toLocaleString()}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          {FILTER_OPTIONS.map((option) => (
            <FilterButton
              key={option.key}
              option={option}
              activeChart={activeChart}
              onClick={() => setActiveChart(option.key)}
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <ChartContainer
          config={CHART_CONFIG}
          className="aspect-auto h-[400px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={getFilteredData}
            margin={{ left: 12, right: 12, top: 50, bottom: 20 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#e5e7eb"
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12, fill: "#008a8a" }}
              tickFormatter={formatXAxisTick}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              domain={[0, 2500]}
              ticks={[0, 100, 500, 1000, 1500, 2000, 2500]}
              tickFormatter={(value) => `${value}`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px] bg-white border border-gray-200 shadow-lg"
                  nameKey="amount"
                  labelFormatter={formatTooltipLabel}
                  formatter={(value) => [`${Number(value).toLocaleString()}`]}
                />
              }
            />
            <Bar
              dataKey="amount"
              fill="#008a8a"
              radius={[8, 8, 8, 8]}
              className="hover:opacity-80 transition-opacity"
            >
              <LabelList content={CustomLabel} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

// Helper components and functions
const FilterButton = ({ option, activeChart, onClick }) => (
  <Button
    variant={activeChart === option.key ? "default" : "outline"}
    size="sm"
    className={`px-4 py-2 text-sm font-medium ${
      activeChart === option.key
        ? "bg-primary text-white hover:bg-primary/90"
        : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
    }`}
    onClick={onClick}
  >
    {option.label}
  </Button>
);

function getDailyData(days, now, cutoffDate, data) {
  const dailyData = {};

  for (let i = 0; i < days; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateKey = date.toISOString().split("T")[0];
    const displayDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    dailyData[dateKey] = { date: displayDate, amount: 0, sortDate: date };
  }

  data.forEach(({ date, amount }) => {
    const itemDate = new Date(date);
    if (itemDate >= cutoffDate) {
      const dateKey = itemDate.toISOString().split("T")[0];
      if (dailyData[dateKey]) {
        dailyData[dateKey].amount += amount;
      }
    }
  });

  return Object.values(dailyData)
    .sort((a, b) => a.sortDate - b.sortDate)
    .map(({ date, amount }) => ({ date, amount }));
}

function getMonthlyData(activeChart, cutoffDate, data) {
  const monthlyData = MONTHS.reduce(
    (acc, month, index) => ({
      ...acc,
      [month]: { date: month, amount: 0, monthIndex: index },
    }),
    {}
  );

  data.forEach(({ date, amount }) => {
    const itemDate = new Date(date);
    if (itemDate >= cutoffDate) {
      const monthName = itemDate.toLocaleDateString("en-US", {
        month: "short",
      });
      if (monthlyData[monthName]) {
        monthlyData[monthName].amount += amount;
      }
    }
  });

  let result = Object.values(monthlyData);

  if (activeChart === "6months") {
    const currentMonth = new Date().getMonth();
    result = result.filter(
      ({ monthIndex }) => (currentMonth - monthIndex + 12) % 12 < 6
    );
  }

  return result.sort((a, b) => a.monthIndex - b.monthIndex);
}
