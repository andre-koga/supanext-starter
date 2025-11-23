import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowLeft, AlertCircle, CheckCircle2, ListOrdered } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function StretchDetailsPage({ params }: PageProps) {
    const { id } = await params;
    const supabase = await createClient();

    // Fetch stretch details
    const { data: stretch, error } = await supabase
        .from("stretches")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !stretch) {
        notFound();
    }

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="space-y-4">
                <Button variant="ghost" size="sm" asChild className="-ml-2 text-muted-foreground">
                    <Link href="/">
                        <ArrowLeft className="mr-1 h-4 w-4" />
                        Back
                    </Link>
                </Button>

                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="capitalize">
                            {stretch.difficulty}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{stretch.default_duration}s</span>
                        </Badge>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight">{stretch.name}</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Targets: {stretch.target_muscles.join(", ")}
                    </p>
                </div>
            </div>

            {/* Image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
                {stretch.image_url ? (
                    <Image
                        src={stretch.image_url}
                        alt={stretch.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-muted-foreground">
                        No Image Available
                    </div>
                )}
            </div>

            {/* Instructions */}
            <div className="space-y-4">
                <h2 className="flex items-center gap-2 text-xl font-semibold">
                    <ListOrdered className="h-5 w-5 text-primary" />
                    Instructions
                </h2>
                <ol className="ml-4 list-decimal space-y-2 text-muted-foreground">
                    {stretch.instructions.map((step: string, index: number) => (
                        <li key={index} className="pl-2">
                            {step}
                        </li>
                    ))}
                </ol>
            </div>

            {/* Benefits */}
            {stretch.benefits && (
                <div className="space-y-2 rounded-lg border bg-green-50/50 p-4 dark:bg-green-900/10">
                    <h3 className="flex items-center gap-2 font-medium text-green-700 dark:text-green-400">
                        <CheckCircle2 className="h-4 w-4" />
                        Benefits
                    </h3>
                    <p className="text-sm text-muted-foreground">{stretch.benefits}</p>
                </div>
            )}

            {/* Precautions */}
            {stretch.precautions && (
                <div className="space-y-2 rounded-lg border bg-orange-50/50 p-4 dark:bg-orange-900/10">
                    <h3 className="flex items-center gap-2 font-medium text-orange-700 dark:text-orange-400">
                        <AlertCircle className="h-4 w-4" />
                        Precautions
                    </h3>
                    <p className="text-sm text-muted-foreground">{stretch.precautions}</p>
                </div>
            )}
        </div>
    );
}
