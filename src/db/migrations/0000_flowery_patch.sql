CREATE TABLE "pattern_tools" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pattern_id" uuid NOT NULL,
	"tool_id" uuid NOT NULL,
	"note" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "pattern_yarns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"pattern_id" uuid NOT NULL,
	"yarn_id" uuid NOT NULL,
	"note" varchar(100),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "patterns" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"pattern_name" varchar(255) NOT NULL,
	"file_url" varchar(500),
	"difficulty" varchar(255),
	"status" varchar(255),
	"source_url" varchar(500),
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"revoked_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "tools" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"tool_type" varchar(255) NOT NULL,
	"size_mm" numeric(4, 2),
	"material" varchar(100),
	"photo_url" varchar(500),
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(255),
	"email" varchar(255) NOT NULL,
	"display_name" varchar(255),
	"avatar_url" varchar(255),
	"password_hash" varchar(255),
	"google_id" varchar(255),
	"email_verified" boolean DEFAULT false NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_google_id_unique" UNIQUE("google_id")
);
--> statement-breakpoint
CREATE TABLE "yarn" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"yarn_name" varchar(255) NOT NULL,
	"brand" varchar(255),
	"material" varchar(100),
	"color" varchar(100),
	"gauge" varchar(100),
	"weight" varchar(20),
	"needle_size_mm" numeric(4, 2),
	"yardage" integer,
	"grams" integer,
	"skein_count" integer,
	"photo_url" varchar(500),
	"care_instructions" text,
	"comments" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "pattern_tools" ADD CONSTRAINT "pattern_tools_pattern_id_patterns_id_fk" FOREIGN KEY ("pattern_id") REFERENCES "public"."patterns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pattern_tools" ADD CONSTRAINT "pattern_tools_tool_id_tools_id_fk" FOREIGN KEY ("tool_id") REFERENCES "public"."tools"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pattern_yarns" ADD CONSTRAINT "pattern_yarns_pattern_id_patterns_id_fk" FOREIGN KEY ("pattern_id") REFERENCES "public"."patterns"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "pattern_yarns" ADD CONSTRAINT "pattern_yarns_yarn_id_yarn_id_fk" FOREIGN KEY ("yarn_id") REFERENCES "public"."yarn"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "patterns" ADD CONSTRAINT "patterns_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tools" ADD CONSTRAINT "tools_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "yarn" ADD CONSTRAINT "yarn_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;