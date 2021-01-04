-- -------------------------------------------------------------
-- 
-- Brandon Nutter 
--
-- Indiebuilder.co
-- Create the shop table
-- 
-- -------------------------------------------------------------


DROP TABLE IF EXISTS "public"."shop";

CREATE SEQUENCE IF NOT EXISTS shop_id_seq;

CREATE TABLE "public"."shop" (
    "id" int4 NOT NULL DEFAULT nextval('shop_id_seq'::regclass),	
    "shop" varchar(254) NOT NULL,
    "access_token" varchar(254) NOT NULL,
    "date_joined" timestamptz NOT NULL,
    "user_scope" varchar(254) NOT NULL,
    "user_first_name" varchar(254) NOT NULL,
    "user_last_name" varchar(254) NOT NULL,
    "user_email" varchar(254) NOT NULL,
    "locale" varchar(4) NOT NULL,
    "is_owner" bool NOT NULL,
    "is_collaborator" bool NOT NULL,
    "is_email_verified" bool NOT NULL,
    "is_active" bool NOT NULL,
    PRIMARY KEY ("id")
);
