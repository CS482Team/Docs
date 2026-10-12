## Table `user`

- S6, S7, S8, S9, S10, S18, S19, S20, S23, S27
- Permanent account record

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `username` | `text` |  Unique |
| `balance` | `int4` |  |
| `role` | `int4` |  |
| `created_at` | `timestamptz` |  |
| `last_daily_reward_at` | `timestamptz` |  Nullable |
| `is_top_player` | `bool` |  |
| `avatar_url` | `text` |  Nullable |
| `settings` | `jsonb` |  |
| `current_streak` | `int4` |  |
| `is_guest` | `bool` |  |

## Table `friendship`

- S28
- Permanent relationship record

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `sender_id` | `uuid` |  |
| `receiver_id` | `uuid` |  |
| `status` | `int4` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `table`

- S1, S5, S12, S13, S14
- Holds the current state and settings of an open room

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `name` | `text` |  |
| `host_id` | `uuid` |  Nullable |
| `max_players` | `int4` |  |
| `buy_in` | `int4` |  |
| `status` | `int4` |  |
| `created_at` | `timestamptz` |  |
| `minimum_bet` | `int4` |  |
| `ante` | `int4` |  |
| `bot_count` | `int2` |  |
| `raise_every_matches` | `int2` |  Nullable |
| `raise_pct` | `int2` |  Nullable |
| `updated_at` | `timestamptz` |  |

## Table `table_players`

- S1, S2, S14
- Holds who is seated now and their current stack

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `table_id` | `uuid` | Primary |
| `user_id` | `uuid` | Primary |
| `seat_number` | `int4` |  |
| `stack` | `int4` |  |
| `joined_at` | `timestamptz` |  |

## Table `match`

- S1, S4, S11, S25
- Open while a hand is in progress, permanent history after

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `table_id` | `uuid` |  |
| `match_number` | `int4` |  |
| `pot` | `int4` |  |
| `winner_id` | `uuid` |  Nullable |
| `started_at` | `timestamptz` |  |
| `ended_at` | `timestamptz` |  Nullable |
| `dealer_seat` | `int4` |  Nullable |

## Table `match_log`

- S2, S3, S25
- Append-only action history

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `match_id` | `uuid` |  |
| `user_id` | `uuid` |  Nullable |
| `action_type` | `int4` |  |
| `amount` | `int4` |  |
| `cards_discarded` | `int4` |  Nullable |
| `created_at` | `timestamptz` |  |
| `seat_number` | `int4` |  Nullable |

## Table `advert`

- S17, S29
- Admin-managed ad content

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `created_by` | `uuid` |  Nullable |
| `title` | `text` |  |
| `image_url` | `text` |  Nullable |
| `link_url` | `text` |  Nullable |
| `active` | `bool` |  |
| `created_at` | `timestamptz` |  |
| `reward_amount` | `int4` |  |

## Table `shop_item`

- S21
- Catalog of purchasable items

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `name` | `text` |  |
| `cost` | `int4` |  |
| `asset_url` | `text` |  Nullable |
| `created_at` | `timestamptz` |  |
| `item_type` | `text` |  Nullable |

## Table `user_inventory`

- S21
- Permanent record of owned items

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `user_id` | `uuid` | Primary |
| `item_id` | `uuid` | Primary |
| `acquired_at` | `timestamptz` |  |
| `is_equipped` | `bool` |  |

## Table `match_players`

- S1, S4, S5, S11, S25
- Permanent per-hand results

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `match_id` | `uuid` | Primary |
| `seat_number` | `int4` | Primary |
| `user_id` | `uuid` |  Nullable |
| `bot_name` | `text` |  Nullable |
| `net_result` | `int4` |  |
| `hand_rank` | `text` |  Nullable |
| `hand_history` | `jsonb` |  Nullable |
| `created_at` | `timestamptz` |  |

## Table `event`

- S22
- Admin-managed promotion config

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `name` | `text` |  |
| `multiplier` | `numeric` |  |
| `expires_at` | `timestamptz` |  |
| `created_by` | `uuid` |  Nullable |
| `created_at` | `timestamptz` |  |

## Table `chat_message`

- S15
- Live chat feed for a table

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `table_id` | `uuid` |  |
| `user_id` | `uuid` |  Nullable |
| `body` | `text` |  |
| `created_at` | `timestamptz` |  |

## Table `support_ticket`

- S16
- Permanent record of player reports

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `user_id` | `uuid` |  Nullable |
| `body` | `text` |  |
| `status` | `text` |  |
| `created_at` | `timestamptz` |  |
| `updated_at` | `timestamptz` |  |

## Table `ad_claim`

- S17
- Audit log of ad reward claims

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `user_id` | `uuid` |  |
| `ad_id` | `uuid` |  |
| `claimed_at` | `timestamptz` |  |

## Table `balance_log`

- S26
- Audit log of balance changes

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `user_id` | `uuid` |  Nullable |
| `delta` | `int4` |  |
| `reason` | `text` |  |
| `admin_id` | `uuid` |  Nullable |
| `created_at` | `timestamptz` |  |

## Custom Types / Enums

### `game_action`

`bet` | `call` | `raise` | `fold` | `check` | `draw`

### `player_status`

`waiting` | `active` | `folded` | `timed_out` | `sitting_out` | `spectating`

### `match_phase`

`antes` | `bet-1` | `draw` | `bet-2` | `showdown`
