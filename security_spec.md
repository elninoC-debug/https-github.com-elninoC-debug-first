# Nutrition Tracking Security Specification

## 1. Data Invariants
- A log entry MUST have a valid `userId` matching the authenticated user.
- A log entry MUST have a `date`.
- Users can only read, write, and delete their own logs.
- User profiles have public parts (name, photo) and private parts (email).
- Private info is only accessible by the owner.

## 2. The Dirty Dozen (Attack Payloads)
1. **Identity Spoofing**: `create` a log with `userId = "attacker_uid"` while authenticated as `"victim_uid"`.
2. **Identity Poisoning**: `create` a log with a 1MB string as a document ID.
3. **Ghost Field**: `update` a user profile with `isAdmin: true`.
4. **PII Leak**: `get` `/users/victim_user/private/info` as `attacker_user`.
5. **State Shortcut**: `update` a log's `userId` field to a different value.
6. **Immutable Break**: `update` a log's `date` after it has been created.
7. **Resource Poisoning**: `update` `proteins` with a 1MB string.
8. **Negative Values**: `create` a log with `calories = -5000`. (Validating for positive numbers).
9. **Query Scraping**: `list` `/logs` without a `userId` filter (rules must enforce the filter).
10. **Shadow Profile**: `create` a profile for another user `uid`.
11. **Note Overflow**: `create` a log with a `notes` field larger than 1000 characters.
12. **Anonymous Write**: Attempt to `create` a log while not signed in.

## 3. Test Runner (Draft)
I will implement `firestore.rules.test.ts` after setting up the testing environment if supported, otherwise I will perform a manual review.
