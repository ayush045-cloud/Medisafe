import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  BellRing,
  FileText,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Menu,
  Pill,
  UserRound,
  X,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/medications", label: "Medications", icon: Pill },
  { to: "/health", label: "Health logs", icon: HeartPulse },
  { to: "/prescriptions", label: "Prescriptions", icon: FileText },
  { to: "/alerts", label: "Alerts", icon: BellRing },
  { to: "/profile", label: "Profile", icon: UserRound },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const { signOut, user } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background lg:flex">
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 border-r border-sidebar-border bg-sidebar p-4 transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2 font-display text-base font-semibold">
            <span className="grid size-8 place-items-center rounded-lg bg-hero-gradient text-primary-foreground">
              <Activity className="size-4" />
            </span>
            Medisafe
          </Link>
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(false)} aria-label="Close menu">
            <X className="size-4" />
          </Button>
        </div>

        <nav className="mt-6 space-y-1">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground transition-colors hover:bg-sidebar-accent",
                pathname === item.to && "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary",
              )}
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute inset-x-4 bottom-4 space-y-2 border-t border-sidebar-border pt-4">
          <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
          <Button variant="outline" size="sm" className="w-full" onClick={() => void signOut()}>
            <LogOut className="mr-2 size-4" /> Log out
          </Button>
        </div>
      </aside>

      {open && (
        <button
          aria-label="Close navigation overlay"
          className="fixed inset-0 z-30 bg-foreground/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex-1">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border/60 bg-background/85 px-4 py-3 backdrop-blur lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
          <span className="font-display font-semibold">Medisafe</span>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-6 lg:px-8 lg:py-10">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StateBlock({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/60 p-10 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}