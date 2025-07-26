"use client"

import { useState, useMemo } from "react"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ChartContainer, ChartTooltip } from "@/components/ui/chart"

// Custom date utilities to replace date-fns
const dateUtils = {
  parseISO: (dateString) => new Date(dateString),

  format: (date, formatStr) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ]

    const monthAbbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    switch (formatStr) {
      case "yyyy-MM-dd":
        return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
      case "yyyy-MM":
        return `${year}-${String(month + 1).padStart(2, "0")}`
      case "yyyy":
        return String(year)
      case "MMM":
        return monthAbbr[month]
      case "MMMM":
        return monthNames[month]
      default:
        return date.toISOString()
    }
  },

  getDay: (date) => date.getDay(),

  getYear: (date) => date.getFullYear(),

  getWeek: (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1)
    const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)
  },

  subWeeks: (date, weeks) => {
    const result = new Date(date)
    result.setDate(result.getDate() - weeks * 7)
    return result
  },

  subMonths: (date, months) => {
    const result = new Date(date)
    result.setMonth(result.getMonth() - months)
    return result
  },

  subYears: (date, years) => {
    const result = new Date(date)
    result.setFullYear(result.getFullYear() - years)
    return result
  },
}

// Optimized data processor
function processDonationData(rawData) {
  if (!rawData?.length) return { Day: [], Week: [], Month: [], Year: [] } // No data

  const dailyAggregates = new Map() // { "2023-01-01": 100, "2023-01-02": 200, ... }
  let latestDate = null // Date

  rawData.forEach((item) => {
    const date = dateUtils.parseISO(item.createdAt)
    const dateKey = dateUtils.format(date, "yyyy-MM-dd")
    dailyAggregates.set(dateKey, (dailyAggregates.get(dateKey) || 0) + item.amount)

    if (!latestDate || date > latestDate) latestDate = date
  }) // formate the date base on the data received {"2023-01-01": 100, "2023-01-02": 200, ... } and store it in date and date key variable

  if (!latestDate) return { Day: [], Week: [], Month: [], Year: [] }

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const dayFullNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  const dayAggregates = new Array(7).fill(0) // [0, 0, 0, 0, 0, 0, 0]

  dailyAggregates.forEach((amount, dateKey) => {
    const dayIndex = dateUtils.getDay(dateUtils.parseISO(dateKey))
    dayAggregates[dayIndex] += amount
  }) // [100, 200, 300, 400, 500, 600, 700]

  const dayData = Array.from({ length: 7 }, (_, i) => {
    const currentDayIndex = (i + 1) % 7
    return {
      period: dayLabels[currentDayIndex],
      donations: dayAggregates[currentDayIndex],
      fullPeriod: dayFullNames[currentDayIndex],
    }
  }) // [{"period": "Sun", "donations": 100, "fullPeriod": "Sunday"}, {"period": "Mon", "donations": 200, "fullPeriod": "Monday"}, ...]

  const weeklyAggregates = new Map()
  dailyAggregates.forEach((amount, dateKey) => {
    const date = dateUtils.parseISO(dateKey)
    const year = dateUtils.getYear(date)
    const week = dateUtils.getWeek(date)
    const weekKey = `${year}-${String(week).padStart(2, "0")}`
    weeklyAggregates.set(weekKey, (weeklyAggregates.get(weekKey) || 0) + amount)
  }) // { "2023-01": 100, "2023-02": 200, ... } 

  const weekData = Array.from({ length: 4 }, (_, i) => {
    const weekDate = dateUtils.subWeeks(latestDate, i)
    const year = dateUtils.getYear(weekDate)
    const weekNum = dateUtils.getWeek(weekDate)
    const weekKey = `${year}-${String(weekNum).padStart(2, "0")}`

    return {
      period: `W${weekNum}`,
      donations: weeklyAggregates.get(weekKey) || 0,
      fullPeriod: `Week ${weekNum}, ${year}`,
    }
  }).reverse()

  const monthlyAggregates = new Map()
  dailyAggregates.forEach((amount, dateKey) => {
    const date = dateUtils.parseISO(dateKey)
    const monthKey = dateUtils.format(date, "yyyy-MM")
    monthlyAggregates.set(monthKey, (monthlyAggregates.get(monthKey) || 0) + amount)
  })

  const monthData = Array.from({ length: 12 }, (_, i) => {
    const monthDate = dateUtils.subMonths(latestDate, i)
    const monthKey = dateUtils.format(monthDate, "yyyy-MM")
    const monthAbbr = dateUtils.format(monthDate, "MMM")
    const fullMonthName = dateUtils.format(monthDate, "MMMM")
    const year = dateUtils.getYear(monthDate)

    return {
      period: monthAbbr,
      donations: monthlyAggregates.get(monthKey) || 0,
      fullPeriod: `${fullMonthName} ${year}`,
    }
  }).reverse()

  const yearlyAggregates = new Map()
  dailyAggregates.forEach((amount, dateKey) => {
    const date = dateUtils.parseISO(dateKey)
    const yearKey = dateUtils.format(date, "yyyy")
    yearlyAggregates.set(yearKey, (yearlyAggregates.get(yearKey) || 0) + amount)
  })

  const yearData = Array.from({ length: 5 }, (_, i) => {
    const yearDate = dateUtils.subYears(latestDate, i)
    const yearKey = dateUtils.format(yearDate, "yyyy")

    return {
      period: yearKey,
      donations: yearlyAggregates.get(yearKey) || 0,
      fullPeriod: yearKey,
    }
  }).reverse()

  return {
    Day: dayData,
    Week: weekData,
    Month: monthData,
    Year: yearData,
  } // { "Day": [{"period": "Sun", "donations": 100, "fullPeriod": "Sunday"}, {"period": "Mon", "donations": 200, "fullPeriod": "Monday"}, ...] }
}

const chartConfig = {
  donations: {
    label: "Donations",
    color: "hsl(var(--primary))",
  },
}

export default function TotalRaisedChart({ donationReportData = [] }) {
  const [selectedPeriod, setSelectedPeriod] = useState("Month")

  const chartDataSets = useMemo(() => processDonationData(donationReportData), [donationReportData])

  const currentData = chartDataSets[selectedPeriod]

  const { totalRaised, maxValue, yAxisMax } = useMemo(() => {
    const total = currentData.reduce((sum, item) => sum + item.donations, 0)
    const max = Math.max(...currentData.map((item) => item.donations))
    const yMax = max > 0 ? Math.ceil(max / 1000) * 1000 : 1000

    return {
      totalRaised: total,
      maxValue: max,
      yAxisMax: yMax,
    }
  }, [currentData])

  const formattedTotal = `$${totalRaised.toFixed(2)}`
  const periods = ["Day", "Week", "Month", "Year"]

  const formatYAxisTick = (value) => (value >= 1000 ? `${value / 1000}k` : value.toString())

  return (
    <Card className="w-full">
      <CardHeader className="space-y-1 flex flex-row items-start justify-between">
        <div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">Total Raised</p>
            <p className="text-2xl sm:text-3xl font-bold">{formattedTotal}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">Donations</span>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center md:space-x-2 justify-end md:justify-center">
          {periods.map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? "default" : "ghost"}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className={`text-xs sm:text-sm w-full ${selectedPeriod === period ? "bg-primary hover:bg-primary/90 text-primary-foreground" : ""
                }`}
            >
              {period}
            </Button>
          ))}
        </div>

      </CardHeader>

      <CardContent className="px-2 sm:px-6">
        <ChartContainer config={chartConfig} className="h-[250px] sm:h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={currentData} margin={{ top: 20, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="0" stroke="#f1f5f9" horizontal vertical={false} />
              <XAxis
                dataKey="period"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#6b7280" }}
                dy={10}
                interval={0}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: "#6b7280" }}
                tickFormatter={formatYAxisTick}
                domain={[0, yAxisMax]}
                width={40}
              />
              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="bg-slate-800 text-white p-2 sm:p-3 rounded-lg shadow-lg max-w-[200px]">
                        <p className="text-xs sm:text-sm">{data.fullPeriod}</p>
                        <p className="text-sm sm:text-base font-semibold">${payload[0].value?.toFixed(2)}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="donations"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, stroke: "white", r: 3 }}
                activeDot={{ r: 5, fill: "hsl(var(--primary))", stroke: "white", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
