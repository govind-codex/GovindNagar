"use client";

import { ButtonLink } from "@/components/utils/link";
import { Mail } from "lucide-react";
import { appConfig } from "root/project.config";

export default function BookACallForm() {
    return (
        <div className="flex h-full min-h-[360px] flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-card p-8 text-center">
            <Mail className="size-8 text-muted-foreground" />
            <div className="space-y-2">
                <h2 className="text-2xl font-semibold">Contact Govind Nagar</h2>
                <p className="max-w-md text-sm text-muted-foreground">
                    Reach out by email or connect on LinkedIn.
                </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
                <ButtonLink href={`mailto:${appConfig.emails[0]}`}>Email</ButtonLink>
                <ButtonLink href={appConfig.social.linkedin} variant="secondary" target="_blank" rel="noopener">
                    LinkedIn
                </ButtonLink>
            </div>
        </div>
    );
}
