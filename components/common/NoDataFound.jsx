import { ReactNode } from "react";
import { Button, ButtonProps } from "@/components/ui/button"; // Adjust import based on your UI library
import { Plus } from "lucide-react"; // Or any other icon library you use

export function NoDataFound({
  title = "No data found",
  description = "There's nothing to display here yet. Get started by adding new items.",
  actionText = "Add New",
  onAction,
  actionVariant = "default",
  icon,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-6 rounded-lg bg-primary/10 ${className} `}
    >
      <div className="text-center max-w-md mx-auto">
        <h3 className="text-lg font-medium text-foreground mb-2 font-primary">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-6 font-primary">
          {description}
        </p>
      </div>
    </div>
  );
}
