import { ModeToggle } from "./ui/mode-toggle";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-3xl p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Todo App</h1>
          <ModeToggle />
        </div>
        {children}
      </div>
    </div>
  );
}
