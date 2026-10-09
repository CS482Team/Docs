## Table `user`

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `username` | `text` |  Unique |
| `chip_balance` | `int4` |  |
| `role` | `int4` |  |
| `created_at` | `timestamptz` |  |
| `last_daily_reward_at` | `timestamptz` |  Nullable |
| `is_top_player` | `bool` |  |
| `avatar_url` | `text` |  Nullable |
| `settings` | `jsonb` |  |
| `current_streak` | `int4` |  |
| `is_guest` | `bool` |  |

## Table `friendship`

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

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `uuid` | Primary |
| `name` | `text` |  |
| `host_id` | `uuid` |  Nullable |
| `variant` | `text` |  |
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

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `table_id` | `uuid` | Primary |
| `user_id` | `uuid` | Primary |
| `seat_number` | `int4` |  |
| `stack` | `int4` |  |
| `joined_at` | `timestamptz` |  |

## Table `match`

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

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `user_id` | `uuid` | Primary |
| `item_id` | `uuid` | Primary |
| `acquired_at` | `timestamptz` |  |
| `is_equipped` | `bool` |  |

## Table `match_players`

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

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `table_id` | `uuid` |  |
| `user_id` | `uuid` |  Nullable |
| `body` | `text` |  |
| `created_at` | `timestamptz` |  |

## Table `support_ticket`

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

### Columns

| Name | Type | Constraints |
|------|------|-------------|
| `id` | `int8` | Primary Identity |
| `user_id` | `uuid` |  |
| `ad_id` | `uuid` |  |
| `claimed_at` | `timestamptz` |  |

## Table `balance_log`

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

