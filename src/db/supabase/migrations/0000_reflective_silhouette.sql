CREATE TABLE "postSections_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"code" text,
	"image" text,
	"imageAlt" text,
	"video_url" text,
	"video_title" text,
	"postId" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"metadata" text,
	"language" text NOT NULL,
	"shortTitle" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"category" text,
	"readMin" integer,
	"userId" uuid,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "postSections_table" ADD CONSTRAINT "postSections_table_postId_posts_table_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."posts_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_table" ADD CONSTRAINT "posts_table_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;