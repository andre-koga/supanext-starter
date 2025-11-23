"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, PlayCircle, Activity, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
    label: string;
    href: string;
    icon: React.ElementType;
}

const navItems: NavItem[] = [
    { label: "Home", href: "/", icon: Home },
    { label: "Explore", href: "/explore", icon: Search },
    { label: "Routines", href: "/routines", icon: PlayCircle },
    { label: "Activity", href: "/activity", icon: Activity },
    { label: "Settings", href: "/settings", icon: Settings },
];

export function AppShell({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    return (
        <div className="flex min-h-screen flex-col bg-background text-foreground md:flex-row">
            {/* Desktop Sidebar */}
            <aside className="hidden w-64 flex-col border-r bg-card md:flex">
                <div className="flex h-16 items-center justify-center border-b px-6">
                    <h1 className="text-xl font-bold tracking-tight text-primary">Stretch & Flex</h1>
                </div>
                <nav className="flex-1 space-y-1 p-4">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary/10 text-primary"
                                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto pb-16 md:pb-0">
                <div className="container mx-auto max-w-2xl px-4 py-6 md:px-8 md:py-10">
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-background/80 backdrop-blur-lg md:hidden">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 p-2 text-xs font-medium transition-colors",
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <item.icon className={cn("h-6 w-6", isActive && "fill-current/20")} />
                            <span className="sr-only">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
}
