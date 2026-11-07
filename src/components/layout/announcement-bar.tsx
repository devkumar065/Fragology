import React from "react";
import Link from "next/link";
import { ANNOUNCEMENT_CONFIG } from "@/data/navigation";

export interface AnnouncementBarProps {
  message?: string;
  link?: string;
}

export function AnnouncementBar({
  message = ANNOUNCEMENT_CONFIG.message,
  link = ANNOUNCEMENT_CONFIG.link,
}: AnnouncementBarProps) {
  if (!ANNOUNCEMENT_CONFIG.enabled) return null;

  const content = (
    <div className="flex items-center justify-center space-x-2 py-2 px-4 text-center">
      <span className="h-1 w-1 rounded-full bg-gold-primary" aria-hidden="true" />
      <span className="text-[10px] sm:text-[11px] font-sans font-light uppercase tracking-[0.25em] text-neutral-ivory hover:text-gold-champagne transition-colors">
        {message}
      </span>
      <span className="h-1 w-1 rounded-full bg-gold-primary" aria-hidden="true" />
    </div>
  );

  return (
    <aside
      aria-label="Announcement"
      className="w-full bg-brand-espresso border-b border-border-subtle/50 relative z-50"
    >
      {link ? (
        <Link href={link} className="block hover:bg-brand-chocolate/40 transition-colors">
          {content}
        </Link>
      ) : (
        content
      )}
    </aside>
  );
}

export default AnnouncementBar;
