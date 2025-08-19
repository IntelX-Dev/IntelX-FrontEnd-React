
import React from 'react';
import { DefaultLayout } from '@/src/layouts/DefaultLayout';
import { Typography } from '@/src/genericComponents/Typography/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/src/components';
import { KPICard } from '@/components/ui/kpi-card';

export function DashboardPage() {
  return (
    <DefaultLayout>
      <div className="space-y-6">
        <div>
          <Typography variant="h1" className="text-3xl font-bold">
            Welcome back to Bid-Alare!
          </Typography>
          <Typography variant="body2" className="text-muted-foreground mt-2">
            Here's what's happening with your RFPs today.
          </Typography>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard
            title="Total RFPs"
            value="0"
            trend={{ value: 0, isPositive: true }}
          />
          <KPICard
            title="RFPs Won"
            value="0"
            trend={{ value: 0, isPositive: true }}
          />
          <KPICard
            title="Pending Review"
            value="0"
            trend={{ value: 0, isPositive: true }}
          />
          <KPICard
            title="Win Rate"
            value="0%"
            trend={{ value: 0, isPositive: true }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>RFPs intake vs. submitted vs. won</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                No data available
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-[200px] text-muted-foreground">
                No data available
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DefaultLayout>
  );
}
