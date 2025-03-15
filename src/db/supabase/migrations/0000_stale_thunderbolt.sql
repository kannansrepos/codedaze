CREATE TABLE "postSections_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"content" text,
	"code" text,
	"image" text,
	"imageAlt" text,
	"video_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "posts_table" (
	"id" serial PRIMARY KEY NOT NULL,
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
CREATE TABLE "video_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "postSections_table" ADD CONSTRAINT "postSections_table_video_id_video_table_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."video_table"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts_table" ADD CONSTRAINT "posts_table_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;