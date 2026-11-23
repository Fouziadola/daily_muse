CREATE TABLE `shared_papers` (
	`id` text PRIMARY KEY NOT NULL,
	`author_name` text NOT NULL,
	`author_handle` text NOT NULL,
	`text` text NOT NULL,
	`color` text,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `shared_papers_created_at_idx` ON `shared_papers` (`created_at`);