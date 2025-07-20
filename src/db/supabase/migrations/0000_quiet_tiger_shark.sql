CREATE TABLE "postIndex_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"userId" uuid,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "postIndex_table" ADD CONSTRAINT "postIndex_table_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;