ALTER TABLE "pattern_tools" DROP CONSTRAINT "pattern_tools_tool_id_tools_id_fk";
--> statement-breakpoint
ALTER TABLE "pattern_tools" ADD COLUMN "tool_type" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "pattern_tools" ADD COLUMN "size_mm" numeric(4, 2);--> statement-breakpoint
ALTER TABLE "pattern_tools" ADD COLUMN "needle_length_cm" numeric(5, 2);--> statement-breakpoint
ALTER TABLE "pattern_yarns" ADD COLUMN "recommended_needle_mm" numeric(4, 2);--> statement-breakpoint
ALTER TABLE "pattern_yarns" ADD COLUMN "material" varchar(100);--> statement-breakpoint
ALTER TABLE "pattern_yarns" ADD COLUMN "min_length_m" integer;--> statement-breakpoint
ALTER TABLE "tools" ADD COLUMN "needle_length_cm" numeric(5, 2);--> statement-breakpoint
ALTER TABLE "yarn" ADD COLUMN "length_m" integer;--> statement-breakpoint
ALTER TABLE "yarn" ADD COLUMN "recommended_needle_mm" numeric(4, 2);--> statement-breakpoint
ALTER TABLE "pattern_tools" DROP COLUMN "tool_id";--> statement-breakpoint
ALTER TABLE "yarn" DROP COLUMN "yardage";