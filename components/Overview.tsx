'use client'

import { Bar, BarChart, ResponsiveContainer, XAxis } from 'recharts'

interface OverviewProps {
    data: any[]
}

export const Overview = ({ data }: OverviewProps) => {
    return (
        <ResponsiveContainer width={"100%"} height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey={"name"}
                    stroke='#888888'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <XAxis
                    stroke='#888888'
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}`}
                />
                <Bar dataKey={"total"} fill='#3498db' radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    )
}
