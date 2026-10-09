import { useEffect, useState, type FormEvent } from "react"

type Screen = "auth" | "lobby" | "draw" | "showdown" | "table" | "leaderboard" | "admin" | "profile"
type Suit = "♠" | "♥" | "♦" | "♣"
type CardData = { rank: string; suit: Suit }
type TableMode = "table" | "draw" | "showdown"
type PokerTable = {
  id: string
  name: string
  variant: string
  stakes: string
  players: string
  pot: string
  ownedByUser: boolean
}
type Player = {
  id: number
  name: string
  handle: string
  balance: number
  status: "Active" | "Disabled"
  hands: number
  history: string[]
}
type Ad = { id: number; title: string; reward: number; status: "Active" | "Draft" }

const alexAvatar =
  "https://images.unsplash.com/photo-1522724709546-19901cb1818a?auto=format&fit=crop&crop=faces&w=192&h=192&q=85"

const formatChips = (amount: number) => `$${amount.toLocaleString("en-US")}`

// Fall back to the initials underneath if a photo fails to load
const hideBrokenImage = (event: React.SyntheticEvent<HTMLImageElement>) => {
  event.currentTarget.style.display = "none"
}

const myHand: CardData[] = [
  { rank: "A", suit: "♠" },
  { rank: "A", suit: "♥" },
  { rank: "8", suit: "♦" },
  { rank: "5", suit: "♣" },
  { rank: "2", suit: "♥" },
]

const seats = [
  {
    name: "Maya",
    initials: "MP",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&crop=faces&w=128&h=128&q=85",
    chips: "$1,840",
    position: "left-[9%] top-[51%]",
    draw: "Drew 2",
    hand: [
      { rank: "K", suit: "♥" },
      { rank: "K", suit: "♣" },
      { rank: "9", suit: "♠" },
      { rank: "K", suit: "♦" },
      { rank: "4", suit: "♣" },
    ] as CardData[],
    result: "Three kings",
  },
  {
    name: "Theo",
    initials: "TB",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&crop=faces&w=128&h=128&q=85",
    chips: "$2,120",
    position: "left-[30%] top-[7%]",
    draw: "Stood pat",
    hand: [
      { rank: "Q", suit: "♠" },
      { rank: "10", suit: "♠" },
      { rank: "8", suit: "♠" },
      { rank: "6", suit: "♥" },
      { rank: "3", suit: "♦" },
    ] as CardData[],
    result: "Queen high",
  },
  {
    name: "Lina",
    initials: "LC",
    avatar:
      "https://images.unsplash.com/photo-1662850886700-4ec19bd30d11?auto=format&fit=crop&crop=faces&w=128&h=128&q=85",
    chips: "$980",
    position: "left-[70%] top-[7%]",
    draw: "Drew 3",
    hand: [
      { rank: "J", suit: "♦" },
      { rank: "J", suit: "♣" },
      { rank: "7", suit: "♥" },
      { rank: "6", suit: "♠" },
      { rank: "3", suit: "♣" },
    ] as CardData[],
    result: "Pair of jacks",
  },
  {
    name: "Noah",
    initials: "NR",
    avatar:
      "https://images.unsplash.com/photo-1734233388742-e6857e8a1e8c?auto=format&fit=crop&crop=faces&w=128&h=128&q=85",
    chips: "$1,560",
    position: "left-[91%] top-[51%]",
    draw: "Drew 1",
    hand: [
      { rank: "9", suit: "♥" },
      { rank: "8", suit: "♣" },
      { rank: "7", suit: "♦" },
      { rank: "5", suit: "♠" },
      { rank: "2", suit: "♥" },
    ] as CardData[],
    result: "Nine high",
  },
]

const tableRows: PokerTable[] = [
  {
    id: "velvet-room",
    name: "Room 1",
    variant: "5 Card Draw",
    stakes: "$5 / $10",
    players: "4 / 6",
    pot: "$90",
    ownedByUser: false,
  },
  {
    id: "the-ruby",
    name: "Room 2",
    variant: "5 Card Draw",
    stakes: "$10 / $20",
    players: "5 / 6",
    pot: "$120",
    ownedByUser: true,
  },
  {
    id: "high-society",
    name: "Room 3",
    variant: "5 Card Draw",
    stakes: "$25 / $50",
    players: "3 / 5",
    pot: "$350",
    ownedByUser: false,
  },
  {
    id: "midnight-club",
    name: "Room 4",
    variant: "5 Card Draw",
    stakes: "$50 / $100",
    players: "5 / 5",
    pot: "$800",
    ownedByUser: false,
  },
]

const emptyTable: PokerTable = {
  id: "",
  name: "",
  variant: "5 Card Draw",
  stakes: "$5 / $10",
  players: "1 / 6",
  pot: "$0",
  ownedByUser: true,
}

const initialPlayers: Player[] = [
  {
    id: 1,
    name: "Maya Patel",
    handle: "@mayaplays",
    balance: 1840,
    status: "Active",
    hands: 428,
    history: [
      "Won $240 at The Ruby",
      "Joined Velvet Room",
      "Purchased 1,000 chips",
    ],
  },
  {
    id: 2,
    name: "Theo Brooks",
    handle: "@theofold",
    balance: 2120,
    status: "Active",
    hands: 315,
    history: [
      "Finished 2nd at High Society",
      "Changed password",
      "Won $180 at Midnight Club",
    ],
  },
  {
    id: 3,
    name: "Lina Chen",
    handle: "@linacards",
    balance: 980,
    status: "Disabled",
    hands: 206,
    history: [
      "Account disabled by admin",
      "Left The Ruby",
      "Lost $80 at Velvet Room",
    ],
  },
  {
    id: 4,
    name: "Noah Reed",
    handle: "@rivernoah",
    balance: 1560,
    status: "Active",
    hands: 271,
    history: [
      "Won $110 at Velvet Room",
      "Added Maya as a friend",
      "Claimed ad reward",
    ],
  },
]

const leaderboard = [
  { name: "RubyRose", wins: 128, rate: "62%", chips: 18450 },
  { name: "Maya Patel", wins: 104, rate: "58%", chips: 14280 },
  { name: "Theo Brooks", wins: 91, rate: "55%", chips: 11820 },
  { name: "Alex Stone", wins: 70, rate: "38%", chips: 2450 },
  { name: "Lina Chen", wins: 64, rate: "47%", chips: 6980 },
  { name: "Noah Reed", wins: 58, rate: "44%", chips: 5120 },
]

const isTableFull = (players: string) => {
  const [occupied, capacity] = players.split("/").map(Number)
  return (
    Number.isFinite(occupied) &&
    Number.isFinite(capacity) &&
    occupied >= capacity
  )
}

function Card({
  card,
  hidden = false,
  compact = false,
  selected = false,
  onClick,
}: {
  card?: CardData
  hidden?: boolean
  compact?: boolean
  selected?: boolean
  onClick?: () => void
}) {
  if (hidden) {
    return (
      <div
        className={`card-back ${compact ? "compact" : ""}`}
        aria-label="Hidden card"
      >
        <span />
      </div>
    )
  }

  if (!card) return null
  const red = card.suit === "♥" || card.suit === "♦"

  return (
    <button
      type="button"
      disabled={!onClick}
      onClick={onClick}
      aria-pressed={onClick ? selected : undefined}
      className={`playing-card ${compact ? "compact" : ""} ${
        selected ? "selected" : ""
      }`}
    >
      <span className={red ? "text-[#b3222b]" : "text-[#23191a]"}>
        <strong>{card.rank}</strong>
        <small>{card.suit}</small>
      </span>
      <span
        className={`card-suit ${red ? "text-[#b3222b]" : "text-[#23191a]"}`}
      >
        {card.suit}
      </span>
    </button>
  )
}

function OpponentSeat({
  player,
  mode,
  seat,
  dealer,
}: {
  player: typeof seats[number]
  mode: TableMode
  seat: number
  dealer?: boolean
}) {
  const showdown = mode === "showdown"

  return (
    <div
      className={`player-seat seat-${seat} absolute -translate-x-1/2 -translate-y-1/2 ${player.position}`}
    >
      <div className="seat-cards">
        {showdown
          ? player.hand.map((card, index) => (
              <Card key={index} card={card} compact />
            ))
          : [0, 1, 2, 3, 4].map((card) => <Card key={card} hidden compact />)}
      </div>
      <div
        className={`seat-portrait ${
          showdown && player.name === "Maya" ? "winner" : ""
        }`}
      >
        <span aria-hidden="true">{player.initials}</span>
        <img
              onError={hideBrokenImage}
          className="avatar-photo"
          src={player.avatar}
          alt={`${player.name}'s avatar`}
        />
        {dealer && <span className="dealer-chip">D</span>}
      </div>
      <div className="seat-label">
        <span>{player.name}</span>
        <small>{player.chips}</small>
      </div>
      {mode === "draw" && <div className="draw-badge">{player.draw}</div>}
      {showdown && (
        <div className={`hand-badge ${player.name === "Maya" ? "best" : ""}`}>
          {player.result}
        </div>
      )}
    </div>
  )
}

function GameTable({ balance }: { balance: number }) {
  const [mode, setMode] = useState<TableMode>("table")
  const [selected, setSelected] = useState<number[]>([])
  const [raise, setRaise] = useState(60)
  const [notice, setNotice] = useState("Your turn to act")

  const changeMode = (nextMode: TableMode) => {
    setMode(nextMode)
    setSelected(nextMode === "draw" ? [2, 4] : [])
    setNotice(
      nextMode === "draw"
        ? "Select cards to discard"
        : nextMode === "showdown"
          ? ""
          : "Your turn to act",
    )
  }

  const toggleCard = (index: number) => {
    if (mode !== "draw") return
    setSelected((items) =>
      items.includes(index)
        ? items.filter((item) => item !== index)
        : [...items, index],
    )
    setNotice("Select cards to discard")
  }

  const act = (label: string) => setNotice(label)

  return (
    <section className="page-shell">
      <div className="page-header">
        <h1 className="page-title">Room 1</h1>
        <div className="flex flex-wrap items-center justify-end gap-4">
          <div
            className="dev-toggle"
            role="group"
            aria-label="Developer game phase"
          >
            <span>Dev</span>
            {(["table", "draw", "showdown"] as TableMode[]).map((phase) => (
              <button
                key={phase}
                type="button"
                onClick={() => changeMode(phase)}
                className={mode === phase ? "active" : ""}
              >
                {phase}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-[#d9bdbc]">
            <span className="size-1.5 rounded-full bg-[#f26a71] shadow-[0_0_10px_#f26a71]" />
            $10 / $20
          </div>
        </div>
      </div>

      <div className="game-room-layout">
        <LobbyChat />
        <div className="game-stage">
          <div className="relative min-h-[660px] sm:min-h-[690px]">
            <div className="poker-table absolute inset-x-[1%] top-[14px] h-[427px] rounded-[44%/50%] sm:h-[436px] sm:inset-x-[5%]">
              <div className="table-line absolute inset-[14px] rounded-[44%/50%] sm:inset-[26px]" />
              <div className="table-mark">H&amp;D</div>
              {mode === "showdown" ? (
                <div className="winner-callout">
                  <strong>Maya wins $240</strong>
                </div>
              ) : (
                <div className="pot">
                  <span className="pot-chip" aria-hidden="true" />
                  <small>Pot</small>
                  <strong>$120</strong>
                </div>
              )}

              {seats.map((player, index) => (
                <OpponentSeat
                  key={player.name}
                  player={player}
                  mode={mode}
                  seat={index}
                  dealer={index === 1}
                />
              ))}

              <div className="local-player-seat absolute left-1/2 -translate-x-1/2 text-center">
                <div className="your-seat">
                  <span aria-hidden="true">AS</span>
                  <img
              onError={hideBrokenImage}
                    className="avatar-photo"
                    src={alexAvatar}
                    alt="Alex Stone's avatar"
                  />
                </div>
                <div className="seat-label you">
                  <span>Alex</span>
                  <small>{formatChips(balance)}</small>
                </div>
                {mode === "showdown" && (
                  <div className="hand-badge">Pair of aces</div>
                )}
              </div>
            </div>

            <div className="absolute bottom-0 left-1/2 w-full max-w-4xl -translate-x-1/2 px-1">
              <div className="hand-row">
                {myHand.map((card, index) => (
                  <Card
                    key={`${card.rank}-${card.suit}`}
                    card={card}
                    selected={selected.includes(index)}
                    onClick={
                      mode === "draw" ? () => toggleCard(index) : undefined
                    }
                  />
                ))}
              </div>

              {mode === "table" && (
                <div className="action-bar">
                  <button
                    type="button"
                    className="secondary-action danger"
                    onClick={() => act("You folded")}
                  >
                    Fold
                  </button>
                  <button
                    type="button"
                    className="secondary-action"
                    onClick={() => act("Called $20")}
                  >
                    Call $20
                  </button>
                  <div className="hidden items-center sm:flex">
                    <input
                      aria-label="Raise amount"
                      type="range"
                      min="40"
                      max="200"
                      step="20"
                      value={raise}
                      onChange={(event) => setRaise(Number(event.target.value))}
                    />
                  </div>
                  <button
                    type="button"
                    className="primary-action"
                    onClick={() => act(`Raised to $${raise}`)}
                  >
                    Raise to ${raise}
                  </button>
                </div>
              )}

              {mode === "draw" && (
                <div className="action-bar">
                  <button
                    type="button"
                    className="secondary-action"
                    onClick={() => {
                      setSelected([])
                      act("Standing pat")
                    }}
                  >
                    Stand pat
                  </button>
                  <button
                    type="button"
                    className="primary-action min-w-52"
                    onClick={() => {
                      act(
                        selected.length
                          ? `Discarded ${selected.length} card${
                              selected.length > 1 ? "s" : ""
                            }`
                          : "Choose a card first",
                      )
                      setSelected([])
                    }}
                  >
                    Confirm discard{" "}
                    {selected.length ? `(${selected.length})` : ""}
                  </button>
                </div>
              )}

              {mode === "showdown" && (
                <div className="action-bar">
                  <button
                    type="button"
                    className="primary-action"
                    onClick={() => act("Ready for the next hand")}
                  >
                    Next hand
                  </button>
                </div>
              )}

              <p className="table-notice" aria-live="polite">
                {notice}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Lobby({ joinTable }: { joinTable: () => void }) {
  const [tables, setTables] = useState<PokerTable[]>(() => {
    try {
      const savedTables = window.localStorage.getItem(
        "hearts-and-diamonds-tables",
      )
      if (!savedTables) return tableRows

      return (JSON.parse(savedTables) as PokerTable[]).map((table) => ({
        ...table,
        variant: "5 Card Draw",
        ownedByUser:
          table.ownedByUser ??
          (table.id === "the-ruby" || table.id.startsWith("table-")),
      }))
    } catch {
      return tableRows
    }
  })
  const [editor, setEditor] = useState<PokerTable | null>(null)
  const [pendingDelete, setPendingDelete] = useState<PokerTable | null>(null)

  useEffect(() => {
    window.localStorage.setItem(
      "hearts-and-diamonds-tables",
      JSON.stringify(tables),
    )
  }, [tables])

  const saveTable = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!editor) return

    if (editor.id) {
      setTables((current) =>
        current.map((table) => (table.id === editor.id ? editor : table)),
      )
    } else {
      setTables((current) => [
        ...current,
        { ...editor, id: `table-${Date.now()}` },
      ])
    }
    setEditor(null)
  }

  const deleteTable = () => {
    if (!pendingDelete?.ownedByUser) return
    setTables((current) =>
      current.filter((table) => table.id !== pendingDelete.id),
    )
    setPendingDelete(null)
  }

  return (
    <section className="page-shell">
      <div className="page-header">
        <h1 className="page-title">
          Rooms <small>{tables.length} tables</small>
        </h1>
        <button
          type="button"
          onClick={() => setEditor({ ...emptyTable })}
          className="primary-action"
        >
          New table
        </button>
      </div>

      <div className="panel overflow-hidden">
        <div className="hidden grid-cols-[1.5fr_1fr_.8fr_.7fr_.6fr_220px] gap-4 border-b border-black/60 bg-gradient-to-b from-[#3a3535] to-[#211d1d] px-[22px] py-[15px] text-sm leading-[19px] text-[#b5a9a9] md:grid">
          <span>Table</span>
          <span>Variant</span>
          <span>Blinds</span>
          <span>Seats</span>
          <span>Pot</span>
          <span className="text-right">Actions</span>
        </div>
        {tables.map((table) => {
          const full = isTableFull(table.players)
          return (
            <div
              key={table.id}
              className="room-row grid gap-3 border-b border-white/10 px-[22px] py-3.5 last:border-0 md:grid-cols-[1.5fr_1fr_.8fr_.7fr_.6fr_220px] md:items-center md:gap-4"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`size-2 rounded-full ${
                      full ? "bg-[#6b6262]" : "bg-[#6fd099]"
                    }`}
                  />
                  <strong className="text-base">{table.name}</strong>
                  {table.ownedByUser && (
                    <span className="owner-badge">Your table</span>
                  )}
                </div>
                <span className="mt-1 block text-sm text-[#b5a9a9] md:hidden">
                  {table.variant} · {table.stakes} · {table.players} players
                </span>
              </div>
              <span className="hidden text-sm text-[#b5a9a9] md:block">
                {table.variant}
              </span>
              <span className="hidden text-sm md:block">{table.stakes}</span>
              <span className="hidden text-sm text-[#b5a9a9] md:block">
                {table.players} players
              </span>
              <span className="hidden text-sm md:block">{table.pot}</span>
              <div className="flex flex-wrap items-center gap-2 md:flex-row-reverse md:justify-start">
                <button
                  type="button"
                  disabled={full}
                  onClick={joinTable}
                  className="secondary-action small min-w-16 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {full ? "Full" : "Join"}
                </button>
                {table.ownedByUser && (
                  <>
                    <button
                      type="button"
                      onClick={() => setEditor({ ...table })}
                      className="secondary-action small"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setPendingDelete(table)}
                      className="secondary-action danger small"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          )
        })}
        {tables.length === 0 && (
          <div className="px-6 py-14 text-center">
            <p className="text-sm text-[#a99898]">No tables yet.</p>
          </div>
        )}
      </div>

      {editor && (
        <div
          className="crud-modal-backdrop"
          role="dialog"
          aria-modal="true"
          aria-labelledby="table-editor-title"
        >
          <form onSubmit={saveTable} className="crud-modal">
            <div>
              <h2 id="table-editor-title" className="font-display text-xl">
                {editor.id ? "Edit table" : "New table"}
              </h2>
              <button
                type="button"
                onClick={() => setEditor(null)}
                className="modal-close"
                aria-label="Close table editor"
              >
                ×
              </button>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="crud-field sm:col-span-2">
                <span>Table name</span>
                <input
                  required
                  value={editor.name}
                  onChange={(event) =>
                    setEditor({ ...editor, name: event.target.value })
                  }
                  placeholder="Room 5"
                />
              </label>
              <label className="crud-field">
                <span>Game variant</span>
                <input value="5 Card Draw" readOnly />
              </label>
              <label className="crud-field">
                <span>Blinds</span>
                <input
                  required
                  value={editor.stakes}
                  onChange={(event) =>
                    setEditor({ ...editor, stakes: event.target.value })
                  }
                  placeholder="$5 / $10"
                />
              </label>
              <label className="crud-field">
                <span>Seats</span>
                <input
                  required
                  value={editor.players}
                  onChange={(event) =>
                    setEditor({ ...editor, players: event.target.value })
                  }
                  placeholder="1 / 6"
                />
              </label>
              <label className="crud-field">
                <span>Starting pot</span>
                <input
                  required
                  value={editor.pot}
                  onChange={(event) =>
                    setEditor({ ...editor, pot: event.target.value })
                  }
                  placeholder="$0"
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditor(null)}
                className="secondary-action"
              >
                Cancel
              </button>
              <button type="submit" className="primary-action">
                {editor.id ? "Save" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}

      {pendingDelete && (
        <div
          className="crud-modal-backdrop"
          role="alertdialog"
          aria-modal="true"
          aria-labelledby="delete-table-title"
        >
          <div className="crud-modal max-w-md">
            <h2 id="delete-table-title" className="font-display text-xl">
              Delete {pendingDelete.name}?
            </h2>
            <p className="text-[15px] text-[#d8cfcf]">This can't be undone.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setPendingDelete(null)}
                className="secondary-action"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={deleteTable}
                className="secondary-action danger"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

const gameHistory = [
  { when: "Today, 10:31", room: "Room 1", hand: "Pair of aces", result: -20 },
  { when: "Today, 10:18", room: "Room 1", hand: "Two pair", result: 180 },
  { when: "Yesterday", room: "Room 3", hand: "Flush", result: 420 },
  { when: "Yesterday", room: "Room 3", hand: "Queen high", result: -50 },
  { when: "Oct 6", room: "Room 2", hand: "Three of a kind", result: 240 },
]

function GameHistory() {
  return (
    <div className="panel mt-5 overflow-hidden">
      <h2 className="panel-head flush">Game history</h2>
      <div className="history-table">
        <div className="history-line header">
          <span>When</span>
          <span>Room</span>
          <span>Hand</span>
          <span className="num">Result</span>
        </div>
        {gameHistory.map((game, index) => (
          <div key={index} className="history-line">
            <span className="text-[#b5a9a9]">{game.when}</span>
            <span>{game.room}</span>
            <span>{game.hand}</span>
            <span
              className={`num font-semibold ${
                game.result > 0 ? "text-[#7ee36a]" : "text-[#ff6b6b]"
              }`}
            >
              {game.result > 0 ? "+" : "−"}
              {formatChips(Math.abs(game.result))}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Profile({ balance }: { balance: number }) {
  return (
    <section className="page-shell">
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-[.8fr_1.2fr]">
        <div className="panel padded flex flex-col text-center">
          <h2 className="panel-head text-left">Player</h2>
          <div className="flex flex-1 flex-col justify-center py-2">
          <div className="profile-portrait">
            <span aria-hidden="true">AS</span>
            <img
              onError={hideBrokenImage}
              className="avatar-photo"
              src={alexAvatar}
              alt="Alex Stone's avatar"
            />
          </div>
          <h3 className="mt-4 font-display text-2xl">Alex Stone</h3>
          <p className="mt-1 text-sm text-[#9e9393]">
            @alexdraws · Joined May 2025
          </p>
          </div>
          <div className="mt-4 mb-4 grid grid-cols-3 gap-2">
            <div className="stat-box">
              <strong className="block text-lg">184</strong>
              <small>Hands</small>
            </div>
            <div className="stat-box">
              <strong className="block text-lg">38%</strong>
              <small>Win rate</small>
            </div>
            <div className="stat-box">
              <strong className="block text-lg">{formatChips(balance)}</strong>
              <small>Balance</small>
            </div>
          </div>
          <button type="button" className="secondary-action w-full">
            Edit profile
          </button>
        </div>

        <div className="space-y-5">
          <div className="panel padded">
            <h2 className="panel-head">Account</h2>
            <div className="divide-y divide-white/10">
              <label className="setting-row">
                <span>
                  <strong>Email</strong>
                  <small>alex@example.com</small>
                </span>
                <button type="button">Change</button>
              </label>
              <label className="setting-row">
                <span>
                  <strong>Password</strong>
                  <small>Changed 2 months ago</small>
                </span>
                <button type="button">Change</button>
              </label>
            </div>
          </div>
          <div className="panel padded">
            <h2 className="panel-head">Preferences</h2>
            <div className="divide-y divide-white/10">
              <label className="setting-row">
                <strong>Music</strong>
                <input type="checkbox" defaultChecked aria-label="Music" />
              </label>
              <label className="setting-row">
                <strong>Sound effects</strong>
                <input
                  type="checkbox"
                  defaultChecked
                  aria-label="Sound effects"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
      <FriendsPanel />
      <GameHistory />
    </section>
  )
}

function Auth({ onEnter }: { onEnter: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login")
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onEnter()
  }

  return (
    <section className="auth-shell">
      <div className="auth-card">
        <h1 className="text-center font-display text-3xl">
          Hearts &amp; Diamonds
        </h1>
        <div className="auth-switch" role="tablist" aria-label="Account">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={mode === "login" ? "active" : ""}
          >
            Log in
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={mode === "signup" ? "active" : ""}
          >
            Sign up
          </button>
        </div>
        <form onSubmit={submit} className="mt-6 grid gap-4">
          {mode === "signup" && (
            <label className="crud-field">
              <span>Display name</span>
              <input required placeholder="Alex Stone" />
            </label>
          )}
          <label className="crud-field">
            <span>Email</span>
            <input required type="email" placeholder="alex@example.com" />
          </label>
          <label className="crud-field">
            <span>Password</span>
            <input
              required
              type="password"
              minLength={6}
              placeholder="At least 6 characters"
            />
          </label>
          {mode === "signup" && (
            <label className="crud-field">
              <span>Confirm password</span>
              <input
                required
                type="password"
                minLength={6}
                placeholder="Repeat password"
              />
            </label>
          )}
          <button type="submit" className="primary-action mt-2 w-full">
            {mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>
        <button
          type="button"
          className="mt-5 w-full text-center text-sm text-[#b99b99] hover:text-white"
        >
          Forgot password?
        </button>
      </div>
    </section>
  )
}

function FriendsPanel() {
  const [friends, setFriends] = useState([
    "Maya Patel",
    "Theo Brooks",
    "Noah Reed",
  ])
  const [requests, setRequests] = useState(["Lina Chen"])
  const [search, setSearch] = useState("")

  const requestFriend = () => {
    const name = search.trim()
    if (!name) return
    setRequests((current) =>
      current.includes(name) ? current : [...current, name],
    )
    setSearch("")
  }

  return (
    <div className="panel padded mt-5">
      <div className="panel-head friends-head flex flex-col justify-between gap-3 sm:flex-row">
        <h2>Friends</h2>
        <div className="flex w-full gap-2 sm:max-w-sm">
          <input
            className="simple-input"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Player name"
          />
          <button
            type="button"
            onClick={requestFriend}
            className="secondary-action small"
          >
            Add
          </button>
        </div>
      </div>
      <div className="grid gap-2.5 lg:grid-cols-2 xl:grid-cols-3">
        {requests.map((name) => (
          <div key={name} className="friend-row">
            <span className="avatar-initial">{name.slice(0, 1)}</span>
            <span className="min-w-0 flex-1">
              <strong>{name}</strong>
              <small>Wants to be friends</small>
            </span>
            <button
              type="button"
              onClick={() => {
                setFriends((current) => [...current, name])
                setRequests((current) =>
                  current.filter((item) => item !== name),
                )
              }}
              className="good"
            >
              Accept
            </button>
            <button
              type="button"
              className="bad"
              onClick={() =>
                setRequests((current) =>
                  current.filter((item) => item !== name),
                )
              }
            >
              Decline
            </button>
          </div>
        ))}
        {friends.map((name, index) => (
          <div key={name} className="friend-row">
            <span className="avatar-initial">{name.slice(0, 1)}</span>
            <span className="min-w-0 flex-1">
              <strong>{name}</strong>
              <small>{index === 1 ? "In Room 2" : "Online"}</small>
            </span>
            <button
              type="button"
              className="bad"
              onClick={() =>
                setFriends((current) => current.filter((item) => item !== name))
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function LobbyChat() {
  const [messages, setMessages] = useState([
    { name: "Maya", text: "Hello", time: "10:24" },
    { name: "Theo", text: "Hi", time: "10:25" },
    { name: "Alex", text: "Yo", time: "10:26" },
  ])
  const [message, setMessage] = useState("")
  const [adminMode, setAdminMode] = useState(false)
  const [notice, setNotice] = useState("")

  const sendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!message.trim()) return
    if (adminMode) {
      setNotice("Sent to admin.")
      setAdminMode(false)
    } else {
      setMessages((current) => [
        ...current,
        { name: "Alex", text: message.trim(), time: "Now" },
      ])
    }
    setMessage("")
  }

  return (
    <aside className="panel table-chat overflow-hidden">
      <div className="panel-head flush chat-head">
        <h2 className="flex items-center gap-2">
          Chat
          <span
            className="size-2 rounded-full bg-[#6fd099]"
            title="Connected"
          />
        </h2>
        <button
          type="button"
          onClick={() => {
            setAdminMode((current) => !current)
            setNotice("")
          }}
          className="secondary-action small"
        >
          {adminMode ? "Back to chat" : "Contact admin"}
        </button>
      </div>
      {adminMode && (
        <div className="border-b border-white/10 px-4 py-3 text-sm text-[#e4c3c1]">
          Messaging admin
        </div>
      )}
      <div className="table-chat-messages">
        {messages.slice(-6).map((item, index) => (
          <div key={`${item.time}-${index}`} className="chat-line">
            <span className="avatar-initial">{item.name.slice(0, 1)}</span>
            <div>
              <p>
                <strong>{item.name}</strong>
                <small>{item.time}</small>
              </p>
              <span>{item.text}</span>
            </div>
          </div>
        ))}
        {notice && <div className="admin-notice">{notice}</div>}
      </div>
      <form
        onSubmit={sendMessage}
        className="chat-form"
      >
        <input
          className="simple-input"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder={
            adminMode ? "Message admin" : "Message the table"
          }
        />
        <button type="submit" className="primary-action">
          Send
        </button>
      </form>
    </aside>
  )
}

function Leaderboard({ balance }: { balance: number }) {
  const rows = leaderboard.map((player) =>
    player.name === "Alex Stone" ? { ...player, chips: balance } : player,
  )
  return (
    <section className="page-shell">
      <div className="page-header">
        <h1 className="page-title">Leaderboard</h1>
      </div>
      <div className="panel overflow-x-auto">
        <div className="leader-row header">
          <span>Rank</span>
          <span>Player</span>
          <span className="num col-wins">Wins</span>
          <span className="num col-rate">Win rate</span>
          <span className="num col-chips">Chips</span>
        </div>
        {rows.map((player, index) => (
          <div
            key={player.name}
            className={`leader-row ${
              player.name === "Alex Stone" ? "current" : ""
            }`}
          >
            <span className={`rank-mark rank-${index + 1}`}>{index + 1}</span>
            <span>
              <strong>{player.name}</strong>
              {player.name === "Alex Stone" && <small>You</small>}
            </span>
            <span className="num col-wins">{player.wins}</span>
            <span className="num col-rate">{player.rate}</span>
            <span className="num col-chips">{formatChips(player.chips)}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function Admin({
  players,
  setPlayers,
  ads,
  setAds,
}: {
  players: Player[]
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>
  ads: Ad[]
  setAds: React.Dispatch<React.SetStateAction<Ad[]>>
}) {
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState(1)
  const [adjustment, setAdjustment] = useState("500")
  const [adTitle, setAdTitle] = useState("")
  const [adReward, setAdReward] = useState("500")
  const [notice, setNotice] = useState("")
  const filtered = players.filter((player) =>
    `${player.name} ${player.handle} ${player.history.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  )
  const selected =
    players.find((player) => player.id === selectedId) ?? players[0]

  const updateSelected = (changes: Partial<Player>) => {
    setPlayers((current) =>
      current.map((player) =>
        player.id === selected.id ? { ...player, ...changes } : player,
      ),
    )
  }

  const createAd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAds((current) => [
      ...current,
      {
        id: Date.now(),
        title: adTitle,
        reward: Number(adReward) || 0,
        status: "Draft",
      },
    ])
    setAdTitle("")
  }

  return (
    <section className="page-shell">
      <div className="page-header">
        <h1 className="page-title">Admin</h1>
      </div>
      <div className="grid gap-5 xl:grid-cols-[.9fr_1.1fr]">
        <div className="panel overflow-hidden">
          <h2 className="panel-head flush">Players</h2>
          <div className="border-b border-white/10 px-[22px] py-4">
            <input
              className="simple-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search"
            />
          </div>
          <div className="max-h-[480px] overflow-y-auto">
            {filtered.map((player) => (
              <button
                key={player.id}
                type="button"
                onClick={() => setSelectedId(player.id)}
                className={`admin-player ${
                  selected.id === player.id ? "selected" : ""
                }`}
              >
                <span className="avatar-initial">
                  {player.name.slice(0, 1)}
                </span>
                <span className="flex-1 text-left">
                  <strong>{player.name}</strong>
                  <small>
                    {player.handle} · {player.hands} hands
                  </small>
                </span>
                <span
                  className={
                    player.status === "Active"
                      ? "text-[#75c493]"
                      : "text-[#d6787d]"
                  }
                >
                  {player.status}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="panel padded">
          <div className="panel-head flex items-center justify-between gap-4">
            <h2>
              {selected.name}{" "}
              <small className="ml-1 font-normal">{selected.handle}</small>
            </h2>
            <button
              type="button"
              onClick={() =>
                updateSelected({
                  status: selected.status === "Active" ? "Disabled" : "Active",
                })
              }
              className="secondary-action danger small"
            >
              {selected.status === "Active"
                ? "Disable"
                : "Enable"}
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="stat-box">
              <small>Balance</small>
              <strong>{formatChips(selected.balance)}</strong>
            </div>
            <div className="stat-box">
              <small>Hands played</small>
              <strong>{selected.hands}</strong>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <input
              className="simple-input"
              type="number"
              value={adjustment}
              onChange={(event) => setAdjustment(event.target.value)}
              aria-label="Balance adjustment"
            />
            <button
              type="button"
              className="primary-action"
              onClick={() => {
                updateSelected({
                  balance: Math.max(0, selected.balance + Number(adjustment)),
                })
                setNotice("Balance updated.")
              }}
            >
              Adjust balance
            </button>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">History</h3>
              <button
                type="button"
                className="secondary-action danger small"
                onClick={() => setNotice("Reset link sent.")}
              >
                Reset password
              </button>
            </div>
            <div className="mt-3 divide-y divide-white/10">
              {selected.history.map((item, index) => (
                <div key={item} className="history-row">
                  <span>{item}</span>
                  <small>
                    {index === 0 ? "Today" : `${index + 1} days ago`}
                  </small>
                </div>
              ))}
            </div>
            {notice && <p className="mt-4 text-xs text-[#e3bd7c]">{notice}</p>}
          </div>
        </div>
      </div>
      <div className="panel padded mt-5">
        <h2 className="panel-head">Ads</h2>
        <form onSubmit={createAd} className="ad-form">
          <label className="crud-field">
            <span>Title</span>
            <input
              required
              value={adTitle}
              onChange={(event) => setAdTitle(event.target.value)}
              placeholder="Weekend chip bonus"
            />
          </label>
          <label className="crud-field">
            <span>Reward (chips)</span>
            <input
              required
              type="number"
              min="0"
              value={adReward}
              onChange={(event) => setAdReward(event.target.value)}
            />
          </label>
          <button type="submit" className="primary-action">
            Save draft
          </button>
        </form>
        <div className="mt-4 border-t border-white/10">
          {ads.map((ad) => (
            <div key={ad.id} className="ad-row">
              <strong>{ad.title}</strong>
              <span className="text-sm text-[#b5a9a9]">
                {formatChips(ad.reward)}
              </span>
              <span
                className={`text-sm ${
                  ad.status === "Active" ? "text-[#75c493]" : "text-[#b5a9a9]"
                }`}
              >
                {ad.status}
              </span>
              <button
                type="button"
                className={ad.status === "Active" ? "" : "good"}
                onClick={() =>
                  setAds((current) =>
                    current.map((item) =>
                      item.id === ad.id
                        ? {
                            ...item,
                            status:
                              item.status === "Active" ? "Draft" : "Active",
                          }
                        : item,
                    ),
                  )
                }
              >
                {ad.status === "Active" ? "Pause" : "Activate"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AdBanner({ type }: { type: "internal" | "external" }) {
  return (
    <aside className="ad-banner" aria-label={`${type} advertisement`}>
      <span>Advertisement</span>
      <strong>
        {type === "internal"
          ? "THIS IS AN INTERNAL AD"
          : "THIS IS AN EXTERNAL AD"}
      </strong>
    </aside>
  )
}

function App() {
  const [screen, setScreen] = useState<Screen>("table")
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [balance] = useState(2450)
  const [players, setPlayers] = useState(initialPlayers)
  const [ads, setAds] = useState<Ad[]>([
    { id: 1, title: "Weekend chip bonus", reward: 500, status: "Active" },
  ])
  const tabs: { id: Screen; label: string }[] = [
    { id: "lobby", label: "Lobby" },
    { id: "table", label: "Table" },
  ]

  if (screen === "auth") {
    return (
      <main className="app-shell flex min-h-screen flex-col text-[#f5f2ef]">
        <AdBanner type="internal" />
        <Auth onEnter={() => setScreen("lobby")} />
      </main>
    )
  }

  return (
    <main className="app-shell min-h-screen overflow-x-hidden text-[#f5f2ef]">
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between site-header px-4 sm:px-8 lg:px-12">
        <button
          type="button"
          onClick={() => setScreen("lobby")}
          className="flex shrink-0 items-center gap-3"
        >
          <span className="text-sm font-semibold sm:hidden">H&amp;D</span>
          <span className="hidden text-lg font-semibold sm:block">
            Hearts &amp; Diamonds
          </span>
        </button>
        <nav
          className="flex items-center gap-2 overflow-x-auto"
          aria-label="Primary navigation"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setScreen(tab.id)}
              className={`nav-tab ${screen === tab.id ? "active" : ""}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="ml-2 flex shrink-0 items-center gap-3">
          <div className="hidden text-right lg:block">
            <p className="text-sm font-semibold">{formatChips(balance)}</p>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileMenuOpen((open) => !open)}
              className="relative grid size-10 place-items-center rounded-full border-2 border-white/20 bg-[#8e252d] text-[10px] font-bold shadow-md"
              aria-label="Open profile menu"
              aria-expanded={profileMenuOpen}
              aria-haspopup="menu"
            >
              <span aria-hidden="true">AS</span>
              <img className="avatar-photo" src={alexAvatar} alt="" onError={hideBrokenImage} />
            </button>
            {profileMenuOpen && (
              <div className="profile-menu" role="menu">
                <div className="border-b border-white/10 px-2.5 pb-2.5 pt-2">
                  <strong>Alex Stone</strong>
                  <small>{formatChips(balance)}</small>
                </div>
                {[
                  { id: "profile" as Screen, label: "Profile" },
                  { id: "leaderboard" as Screen, label: "Leaderboard" },
                  { id: "admin" as Screen, label: "Admin" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      setScreen(item.id)
                      setProfileMenuOpen(false)
                    }}
                  >
                    {item.label}
                  </button>
                ))}
                <button
                  type="button"
                  role="menuitem"
                  className="sign-out"
                  onClick={() => {
                    setScreen("auth")
                    setProfileMenuOpen(false)
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <AdBanner
        type={
          screen === "table" ||
          screen === "draw" ||
          screen === "showdown" ||
          screen === "lobby"
            ? "external"
            : "internal"
        }
      />

      {(screen === "table" || screen === "draw" || screen === "showdown") && (
        <GameTable balance={balance} />
      )}
      {screen === "lobby" && <Lobby joinTable={() => setScreen("table")} />}
      {screen === "profile" && <Profile balance={balance} />}
      {screen === "leaderboard" && <Leaderboard balance={balance} />}
      {screen === "admin" && (
        <Admin
          players={players}
          setPlayers={setPlayers}
          ads={ads}
          setAds={setAds}
        />
      )}
    </main>
  )
}

export default App
