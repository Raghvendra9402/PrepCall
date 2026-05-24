import { InterviewForm } from "@/components/shared/interview-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const DashboardPage = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Interview Form</CardTitle>
        </CardHeader>
        <CardContent>
          <InterviewForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
