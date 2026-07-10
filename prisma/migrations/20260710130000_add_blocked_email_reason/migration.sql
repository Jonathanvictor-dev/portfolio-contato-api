ALTER TABLE "BlockedEmail" ADD COLUMN "reason" TEXT;

UPDATE "BlockedEmail"
SET "reason" = 'Motivo não informado (registro anterior)'
WHERE "reason" IS NULL;

ALTER TABLE "BlockedEmail" ALTER COLUMN "reason" SET NOT NULL;
