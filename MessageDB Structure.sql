CREATE TABLE "converstion" (
  "id" SERIAL PRIMARY KEY,
  "full_name" varchar,
  "user_id" int,
  "created_at" timestamp,
  "status" boolean,
  "close_at" timestamp,
  "duration" varchar
);

CREATE TABLE "message" (
  "user_id" int,
  "conversation_id" int PRIMARY KEY,
  "name" varchar,
  "time_sent" timestamp,
  "message_body" varchar,
  "recipient_id" int
);

CREATE TABLE "agent" (
  "id" int,
  "conversation_id" int PRIMARY KEY,
  "name" varchar,
  "time_sent" timestamp,
  "message_body" varchar,
  "recipient_id" int
);

ALTER TABLE "converstion" ADD FOREIGN KEY ("id") REFERENCES "message" ("conversation_id");

ALTER TABLE "message" ADD FOREIGN KEY ("conversation_id") REFERENCES "agent" ("conversation_id");

ALTER TABLE "agent" ADD FOREIGN KEY ("id") REFERENCES "message" ("recipient_id");

ALTER TABLE "message" ADD FOREIGN KEY ("user_id") REFERENCES "converstion" ("user_id");

ALTER TABLE "message" ADD FOREIGN KEY ("user_id") REFERENCES "agent" ("recipient_id");
