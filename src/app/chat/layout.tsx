import Siderbar from "@/components/Siderbar";

export default function ChatLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex overflow-hidden">
        <Siderbar />
        {children}
      </body>
    </html>
  );
}
