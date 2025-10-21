import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Student Dashboard - Being IITian",
  description: "Student dashboard for Being IITian platform",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
