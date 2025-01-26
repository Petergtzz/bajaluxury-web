import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SidebarInset } from "@/components/ui/sidebar";
import { BarComponent } from "@/components/bar-chart";

export default function DashboardPage() {
  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-6 px-8 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex-1 space-y-4 pt-6">
          <div className="flex items-center justify-between space-x-6">
            <h2 className="text-3xl font-bold tracking-tight p2-1 px-0">
              Hi, Welcome back
            </h2>
            <div className="flex items-center space-x-6">
              <CalendarDateRangePicker />
              <Button>Download</Button>
            </div>
          </div>
        </div>
      </header>
      <Tabs defaultValue="expenses" className="space-y-4 p-6 px-8">
        <TabsList>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="incomes">Incomes</TabsTrigger>
        </TabsList>
        <TabsContent value="expenses" className="space-y-4">
          <div className="max-w-[600px]">
            <div className="fixed right-8">
              <Card className="mb-4">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-2xl font-medium tracking-tight">
                    Account Balance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                </CardContent>
              </Card>
              <Card>
                <BarComponent />
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="incomes" className="space-y-4">
          <div className="max-w-[500px] absolute right-8">
            <Card className="mb-4">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-medium tracking-tight">
                  Account Balance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$45,231.89</div>
              </CardContent>
            </Card>
            <Card>
              <BarComponent />
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </SidebarInset>
  );
}
