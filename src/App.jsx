import { useState, useCallback, useRef } from "react";

// ─── ASSET PATHS ────────────────────────────────────────────
const ASSETS = {
  food: {
    back: "/assets/food/back.jpg",
    chicken_fries: "/assets/food/chicken_fries.jpg",
    burger: "/assets/food/burger.jpg",
    pizza: "/assets/food/pizza.jpg",
    omelet: "/assets/food/omelet.jpg",
    pancakes: "/assets/food/pancakes.jpg",
    pbj: "/assets/food/pbj.jpg",
    grilled_chicken: "/assets/food/grilled_chicken.jpg",
    salad: "/assets/food/salad.jpg",
    bacon_egg_cheese: "/assets/food/bacon_egg_cheese.jpg",
    pretzel: "/assets/food/pretzel.jpg",
    banana_nut_muffin: "/assets/food/banana_nut_muffin.jpg",
    apple: "/assets/food/apple.jpg",
    greek_yogurt: "/assets/food/greek_yogurt.jpg",
    potato_chips: "/assets/food/potato_chips.jpg",
    peanuts: "/assets/food/peanuts.jpg",
    water: "/assets/food/water.jpg",
    apple_juice: "/assets/food/apple_juice.jpg",
    soda: "/assets/food/soda.jpg",
  },
  activity: {
    back: "/assets/activity/back.jpg",
    writing: "/assets/activity/writing.jpg",
    reading: "/assets/activity/reading.jpg",
    painting: "/assets/activity/painting.jpg",
    baking: "/assets/activity/baking.jpg",
    gaming: "/assets/activity/gaming.jpg",
    exercising: "/assets/activity/exercising.jpg",
    soccer: "/assets/activity/soccer.jpg",
    watching_tv: "/assets/activity/watching_tv.jpg",
    music: "/assets/activity/music.jpg",
    card_game: "/assets/activity/card_game.jpg",
    running: "/assets/activity/running.jpg",
    dog_walk: "/assets/activity/dog_walk.jpg",
  },
  insulin: {
    back: "/assets/insulin/back.jpg",
    1: "/assets/insulin/insulin_1.jpg",
    2: "/assets/insulin/insulin_2.jpg",
    3: "/assets/insulin/insulin_3.jpg",
    4: "/assets/insulin/insulin_4.jpg",
    5: "/assets/insulin/insulin_5.jpg",
    6: "/assets/insulin/insulin_6.jpg",
  },
  effect: {
    low_back: "/assets/effect/low_back.jpg",
    high_back: "/assets/effect/high_back.jpg",
  },
  profiles: { back: "/assets/profiles/back.jpg" },
  spinner: "/assets/misc/spinner.png",
  gameboard: "/assets/misc/gameboard.jpg",
};

for (let i = 1; i <= 20; i++) ASSETS.effect[i] = `/assets/effect/effect_${i}.jpg`;
for (let i = 1; i <= 12; i++) ASSETS.profiles[i] = `/assets/profiles/profile_${i}.jpg`;

// ─── GAME DATA ──────────────────────────────────────────────
const FOOD_CARDS = [
  { id: "f1", name: "Chicken & Fries", value: 3, type: "food", img: "chicken_fries", copies: 2 },
  { id: "f2", name: "Burger", value: 4, type: "food", img: "burger", copies: 2 },
  { id: "f3", name: "Pizza", value: 3, type: "food", img: "pizza", copies: 2 },
  { id: "f4", name: "Omelet", value: 0, type: "food", img: "omelet", copies: 2 },
  { id: "f5", name: "Pancakes", value: 4, type: "food", img: "pancakes", copies: 2 },
  { id: "f6", name: "PB&J", value: 2, type: "food", img: "pbj", copies: 2 },
  { id: "f7", name: "Grilled Chicken", value: 0, type: "food", img: "grilled_chicken", copies: 2 },
  { id: "f8", name: "Salad", value: 2, type: "food", img: "salad", copies: 2 },
  { id: "f9", name: "Bacon Egg & Cheese", value: 4, type: "food", img: "bacon_egg_cheese", copies: 2 },
  { id: "f10", name: "Pretzel", value: 3, type: "food", img: "pretzel", copies: 2 },
  { id: "f11", name: "Banana Nut Muffin", value: 3, type: "food", img: "banana_nut_muffin", copies: 2 },
  { id: "f12", name: "Apple", value: 1, type: "food", img: "apple", copies: 2 },
  { id: "f13", name: "Greek Yogurt", value: 1, type: "food", img: "greek_yogurt", copies: 2 },
  { id: "f14", name: "Potato Chips", value: 3, type: "food", img: "potato_chips", copies: 2 },
  { id: "f15", name: "Peanuts", value: 2, type: "food", img: "peanuts", copies: 2 },
  { id: "f16", name: "Water", value: 0, type: "food", img: "water", copies: 2 },
  { id: "f17", name: "Apple Juice", value: 3, type: "food", img: "apple_juice", copies: 2 },
  { id: "f18", name: "Soda", value: 4, type: "food", img: "soda", copies: 2 },
];

const ACTIVITY_CARDS = [
  { id: "a1", name: "Writing", value: 2, type: "activity", img: "writing", copies: 2 },
  { id: "a2", name: "Reading", value: 3, type: "activity", img: "reading", copies: 2 },
  { id: "a3", name: "Painting", value: 2, type: "activity", img: "painting", copies: 2 },
  { id: "a4", name: "Baking", value: 3, type: "activity", img: "baking", copies: 2 },
  { id: "a5", name: "Gaming", value: 1, type: "activity", img: "gaming", copies: 2 },
  { id: "a6", name: "Exercising", value: 4, type: "activity", img: "exercising", copies: 2 },
  { id: "a7", name: "Soccer", value: 4, type: "activity", img: "soccer", copies: 2 },
  { id: "a8", name: "Watching TV", value: 1, type: "activity", img: "watching_tv", copies: 2 },
  { id: "a9", name: "Music", value: 2, type: "activity", img: "music", copies: 2 },
  { id: "a10", name: "Card Game", value: 3, type: "activity", img: "card_game", copies: 2 },
  { id: "a11", name: "Running", value: 3, type: "activity", img: "running", copies: 2 },
  { id: "a12", name: "Dog Walk", value: 4, type: "activity", img: "dog_walk", copies: 2 },
];

const INSULIN_CARDS = [];
const insulinDist = { 1: 6, 2: 8, 3: 8, 4: 6, 5: 4, 6: 4 };
let iIdx = 0;
Object.entries(insulinDist).forEach(([val, count]) => {
  for (let c = 0; c < count; c++) {
    INSULIN_CARDS.push({ id: `i${++iIdx}`, name: "Insulin", value: parseInt(val), type: "insulin", img: val });
  }
});

const LOW_CARDS = [
  { id: "low1", effectImg: 1, label: "SLIGHT LOW!", text: "Play at least 3 food points this turn.", severity: "slight", type: "low", rule: "minFood3" },
  { id: "low2", effectImg: 2, label: "SLIGHT LOW!", text: "You may play a max of one action card this turn.", severity: "slight", type: "low", rule: "maxAction1" },
  { id: "low3", effectImg: 3, label: "SLIGHT LOW!", text: "Discard the two highest value action cards in your hand.", severity: "slight", type: "low", rule: "discardTop2Activity" },
  { id: "low4", effectImg: 4, label: "SLIGHT LOW!", text: "Discard the highest value action card in your hand.", severity: "slight", type: "low", rule: "discardTopActivity" },
  { id: "low5", effectImg: 5, label: "SLIGHT LOW!", text: "You must play more food than action cards this turn.", severity: "slight", type: "low", rule: "moreFoodThanAction" },
  { id: "low6", effectImg: 6, label: "URGENT LOW!", text: "Draw one more card from the food/activity deck.", severity: "urgent", type: "low", rule: "drawExtraFA" },
  { id: "low7", effectImg: 7, label: "URGENT LOW!", text: "You cannot play an action card this turn.", severity: "urgent", type: "low", rule: "noAction" },
  { id: "low8", effectImg: 8, label: "URGENT LOW!", text: "You cannot play an action card above 2 points.", severity: "urgent", type: "low", rule: "actionMax2" },
  { id: "low9", effectImg: 9, label: "URGENT LOW!", text: "Play at least 6 food points this turn.", severity: "urgent", type: "low", rule: "minFood6" },
  { id: "low10", effectImg: 10, label: "URGENT LOW!", text: "Play the highest value food card in your hand.", severity: "urgent", type: "low", rule: "playHighestFood" },
];

const HIGH_CARDS = [
  { id: "high1", effectImg: 11, label: "SLIGHT HIGH!", text: "Play at least 3 activity points this turn.", severity: "slight", type: "high", rule: "minActivity3" },
  { id: "high2", effectImg: 12, label: "SLIGHT HIGH!", text: "You can play a max of one food card this turn.", severity: "slight", type: "high", rule: "maxFood1" },
  { id: "high3", effectImg: 13, label: "SLIGHT HIGH!", text: "Discard the two highest value food cards in your hand.", severity: "slight", type: "high", rule: "discardTop2Food" },
  { id: "high4", effectImg: 14, label: "SLIGHT HIGH!", text: "Discard the highest value food card in your hand.", severity: "slight", type: "high", rule: "discardTopFood" },
  { id: "high5", effectImg: 15, label: "SLIGHT HIGH!", text: "You must play more activity than food cards this turn.", severity: "slight", type: "high", rule: "moreActivityThanFood" },
  { id: "high6", effectImg: 16, label: "SEVERE HIGH!", text: "You cannot play a food card higher than 2 points this turn.", severity: "severe", type: "high", rule: "foodMax2" },
  { id: "high7", effectImg: 17, label: "SEVERE HIGH!", text: "Play at least 4 activity points this turn.", severity: "severe", type: "high", rule: "minActivity4" },
  { id: "high8", effectImg: 18, label: "SEVERE HIGH!", text: "Play 2 more insulin points than food points this turn.", severity: "severe", type: "high", rule: "insulin2MoreThanFood" },
  { id: "high9", effectImg: 19, label: "SEVERE HIGH!", text: "Play the highest value activity card in your hand.", severity: "severe", type: "high", rule: "playHighestActivity" },
  { id: "high10", effectImg: 20, label: "SEVERE HIGH!", text: "Draw two more cards from the insulin deck.", severity: "severe", type: "high", rule: "drawExtraInsulin" },
];

const PROFILE_CARDS = [
  { id: "p1", idNum: 1, foodGoal: 16, activityGoal: 10, insulinGoal: 16, img: 1 },
  { id: "p2", idNum: 2, foodGoal: 16, activityGoal: 14, insulinGoal: 16, img: 2 },
  { id: "p3", idNum: 3, foodGoal: 16, activityGoal: 12, insulinGoal: 18, img: 3 },
  { id: "p4", idNum: 4, foodGoal: 17, activityGoal: 12, insulinGoal: 17, img: 4 },
  { id: "p5", idNum: 5, foodGoal: 17, activityGoal: 13, insulinGoal: 17, img: 5 },
  { id: "p6", idNum: 6, foodGoal: 17, activityGoal: 14, insulinGoal: 17, img: 6 },
  { id: "p7", idNum: 7, foodGoal: 18, activityGoal: 13, insulinGoal: 16, img: 7 },
  { id: "p8", idNum: 8, foodGoal: 18, activityGoal: 12, insulinGoal: 17, img: 8 },
  { id: "p9", idNum: 9, foodGoal: 18, activityGoal: 11, insulinGoal: 18, img: 9 },
  { id: "p10", idNum: 10, foodGoal: 18, activityGoal: 12, insulinGoal: 18, img: 10 },
  { id: "p11", idNum: 11, foodGoal: 15, activityGoal: 12, insulinGoal: 15, img: 11 },
  { id: "p12", idNum: 12, foodGoal: 14, activityGoal: 10, insulinGoal: 16, img: 12 },
];

const SECTIONS = ["Morning", "Afternoon", "Night"];

// ─── HELPERS ──────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function uid() { return Math.random().toString(36).slice(2, 10); }
function buildDeck(cards) {
  const deck = [];
  cards.forEach(c => {
    for (let i = 0; i < (c.copies || 1); i++) deck.push({ ...c, uid: uid() });
  });
  return shuffle(deck);
}
function getCardImage(card, faceDown) {
  if (faceDown) {
    if (card.type === "food") return ASSETS.food.back;
    if (card.type === "activity") return ASSETS.activity.back;
    return ASSETS.insulin.back;
  }
  if (card.type === "food") return ASSETS.food[card.img];
  if (card.type === "activity") return ASSETS.activity[card.img];
  if (card.type === "insulin") return ASSETS.insulin[card.value];
  return null;
}

// ─── SPINNER ──────────────────────────────────────────────
const SPINNER_SEGMENTS = ["green", "red", "orange", "green", "red", "orange"];
const SPINNER_RESULT_MAP = { green: "green", red: "low", orange: "high" };

function SpinnerWheel({ onResult, disabled, spinRef }) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const segAngle = 360 / SPINNER_SEGMENTS.length;

  const doSpin = () => {
    if (spinning || disabled) return;
    setSpinning(true);
    setResult(null);
    const segIdx = Math.floor(Math.random() * SPINNER_SEGMENTS.length);
    const target = 360 * 5 + (360 - segIdx * segAngle - segAngle / 2);
    setRotation(prev => prev + target);
    setTimeout(() => {
      const color = SPINNER_SEGMENTS[segIdx];
      setResult(SPINNER_RESULT_MAP[color]);
      setSpinning(false);
      onResult(SPINNER_RESULT_MAP[color]);
    }, 2800);
  };

  // Expose doSpin to parent via ref
  if (spinRef) spinRef.current = doSpin;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ position: "relative", width: 100, height: 100 }}>
        {/* Pointer triangle at top */}
        <div style={{
          position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)",
          width: 0, height: 0,
          borderLeft: "8px solid transparent", borderRight: "8px solid transparent",
          borderTop: "16px solid #fff", zIndex: 3,
          filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.5))",
        }} />
        {/* Spinner image — rotates */}
        <img
          src="/assets/misc/spinner.png"
          alt="Blood sugar wheel"
          style={{
            width: 100, height: 100,
            borderRadius: "50%",
            objectFit: "contain",
            transition: spinning ? "transform 2.8s cubic-bezier(0.2, 0.8, 0.3, 1)" : "none",
            transform: `rotate(${rotation}deg)`,
            display: "block",
          }}
        />
      </div>
      {result && !spinning && (
        <div style={{
          fontSize: 10, fontFamily: "'OstrichSans', sans-serif", letterSpacing: 1,
          color: result === "green" ? "#5CB85C" : result === "low" ? "#D9534F" : "#E8943A",
          textTransform: "uppercase",
        }}>
          {result === "green" ? "IN RANGE" : result === "low" ? "LOW!" : "HIGH!"}
        </div>
      )}
    </div>
  );
}

// ─── EFFECT CARD POPUP ────────────────────────────────────
function EffectCardPopup({ card, onDismiss }) {
  const imgSrc = ASSETS.effect[card.effectImg];
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100 }}>
      <div style={{
        background: "#1a2744", borderRadius: 16, padding: 24, maxWidth: 320,
        textAlign: "center", border: "2px solid rgba(255,255,255,0.15)",
        boxShadow: "0 30px 80px rgba(0,0,0,0.7)", animation: "popIn 0.25s ease-out",
      }}>
        <img src={imgSrc} alt={card.label} style={{ width: "100%", maxWidth: 220, borderRadius: 10, marginBottom: 16, display: "block", margin: "0 auto 16px" }} />
        <button onClick={onDismiss} style={{
          background: card.type === "low" ? "#D9534F" : "#E8943A",
          color: "#fff", border: "none", borderRadius: 8, padding: "10px 32px",
          fontSize: 14, fontWeight: 700, cursor: "pointer",
          fontFamily: "'OstrichSans', sans-serif", letterSpacing: 1, textTransform: "uppercase",
        }}>Got it!</button>
      </div>
    </div>
  );
}

// ─── BOARD CARD SLOT ──────────────────────────────────────
function BoardSlot({ card, isActive, isPlacing, onDragBack, dragOver }) {
  const handleDragStart = (e) => {
    if (!isPlacing || !isActive || !card) { e.preventDefault(); return; }
    e.dataTransfer.setData("board-card", card.uid);
    e.dataTransfer.effectAllowed = "move";
    e.currentTarget.style.opacity = "0.35";
  };
  const handleDragEnd = (e) => { e.currentTarget.style.opacity = "1"; };

  if (card) {
    const imgSrc = getCardImage(card, false);
    return (
      <div
        draggable={!!(isPlacing && isActive)}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{
          position: "relative", width: "100%", aspectRatio: "5/7",
          cursor: isPlacing && isActive ? "grab" : "default",
        }}
      >
        <img src={imgSrc} alt={card.name} style={{
          width: "100%", height: "100%", objectFit: "cover",
          borderRadius: 8, display: "block",
          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
          transition: "box-shadow 0.15s",
        }} />
        {isPlacing && isActive && (
          <div style={{
            position: "absolute", inset: 0, borderRadius: 8,
            border: "2px dashed rgba(255,255,255,0.3)",
            pointerEvents: "none",
          }} />
        )}
      </div>
    );
  }

  return (
    <div style={{
      width: "100%", aspectRatio: "5/7",
      background: dragOver ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.92)",
      borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
      transition: "background 0.15s",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    }}>
      <div style={{
        width: "44%", aspectRatio: "1",
        borderRadius: "50%", background: "#1a2744",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ color: "#fff", fontSize: "clamp(12px, 2vw, 22px)", fontWeight: 700 }}>?</span>
      </div>
    </div>
  );
}

// ─── SINGLE SECTION BOARD VIEW ───────────────────────────
function SectionBoard({ section, sectionIndex, currentSection, cards, effectCard: sectionEffect, canDrop, onDrop, onRemoveCard, isPlacing }) {
  const [dragOver, setDragOver] = useState(false);
  const [handDragOver, setHandDragOver] = useState(false);
  const isActive = sectionIndex === currentSection;
  const dropAllowed = canDrop && isActive && cards.length < 5;

  const handleDragOver = (e) => {
    // Accept both hand cards and board-back cards
    if (dropAllowed) { e.preventDefault(); e.dataTransfer.dropEffect = "move"; setDragOver(true); }
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (!isPlacing || !isActive) return;
    const handCardUid = e.dataTransfer.getData("text/plain");
    const boardCardUid = e.dataTransfer.getData("board-card");
    if (handCardUid && dropAllowed) onDrop(handCardUid, section);
    // board-card drops on the board itself are ignored (they go to hand via hand drop zone)
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setDragOver(false); }}
      onDrop={handleDrop}
      style={{ display: "flex", flexDirection: "column", gap: 8, height: "100%" }}
    >
      {/* 5 main card slots in a row */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8,
        flex: 1, alignItems: "center",
      }}>
        {Array.from({ length: 5 }).map((_, si) => (
          <BoardSlot
            key={si}
            card={cards[si] || null}
            isActive={isActive}
            isPlacing={isPlacing}
            dragOver={dragOver && dropAllowed && !cards[si]}
          />
        ))}
      </div>

      {/* Effect card slot — landscape orientation, image only */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ height: "clamp(36px, 5vh, 56px)", aspectRatio: "7/5" }}>
          {sectionEffect ? (
            <div style={{ width: "100%", height: "100%", borderRadius: 6, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>
              <img src={ASSETS.effect[sectionEffect.effectImg]} alt={sectionEffect.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ) : (
            <div style={{
              width: "100%", height: "100%", borderRadius: 6,
              background: "rgba(255,255,255,0.08)",
              border: "1.5px dashed rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: 10, opacity: 0.3 }}>—</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── HAND CARD ────────────────────────────────────────────
function HandCard({ card, draggable: isDraggable, disabled, selected, onToggleSelect }) {
  const handleDragStart = (e) => {
    if (!isDraggable) { e.preventDefault(); return; }
    e.dataTransfer.setData("text/plain", card.uid);
    e.dataTransfer.effectAllowed = "move";
    e.currentTarget.style.opacity = "0.3";
  };
  const handleDragEnd = (e) => { e.currentTarget.style.opacity = "1"; };
  const imgSrc = getCardImage(card, false);

  return (
    <div
      draggable={!!isDraggable}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={() => { if (!disabled && onToggleSelect) onToggleSelect(card.uid); }}
      title={card.name}
      style={{
        width: "clamp(44px, 6vw, 72px)",
        aspectRatio: "5/7",
        borderRadius: 6,
        overflow: "visible",
        cursor: disabled ? "default" : isDraggable ? "grab" : "pointer",
        opacity: disabled ? 0.45 : 1,
        flexShrink: 0,
        position: "relative",
        alignSelf: "flex-end",
        transition: "width 0.15s",
        userSelect: "none",
        outline: selected ? "3px solid #fff" : "none",
        outlineOffset: "2px",
      }}
      onMouseEnter={e => {
        if (!isDraggable && disabled) return;
        e.currentTarget.style.width = "clamp(56px, 8vw, 90px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.width = "clamp(44px, 6vw, 72px)";
      }}
    >
      <div style={{
        width: "100%", height: "100%", borderRadius: 6, overflow: "hidden",
        boxShadow: selected
          ? "0 0 0 3px #fff, 0 6px 16px rgba(0,0,0,0.5)"
          : isDraggable
          ? "0 4px 12px rgba(0,0,0,0.5)"
          : "0 2px 6px rgba(0,0,0,0.3)",
      }}>
        <img src={imgSrc} alt={card.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      </div>
      {selected && (
        <div style={{
          position: "absolute", top: -4, right: -4,
          width: 14, height: 14, borderRadius: "50%",
          background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 9, color: "#1a2744", fontWeight: 900, lineHeight: 1,
          boxShadow: "0 1px 4px rgba(0,0,0,0.4)",
        }}>✓</div>
      )}
    </div>
  );
}

// ─── HAND BACK CARD (face down) ───────────────────────────
function HandBackCard({ type }) {
  const backSrc = type === "food" ? ASSETS.food.back : type === "activity" ? ASSETS.activity.back : ASSETS.insulin.back;
  return (
    <div style={{
      width: "clamp(44px, 6vw, 72px)", aspectRatio: "5/7",
      borderRadius: 6, overflow: "hidden", flexShrink: 0,
      boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
    }}>
      <img src={backSrc} alt="card" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
    </div>
  );
}

// ─── SCORE BARS ────────────────────────────────────────────
function ScoreBars({ board, profile }) {
  const totals = { food: 0, activity: 0, insulin: 0 };
  SECTIONS.forEach(s => (board[s] || []).forEach(c => { totals[c.type] = (totals[c.type] || 0) + c.value; }));
  const items = [
    { icon: "🍞", current: totals.food, goal: profile.foodGoal, color: "#C8884A", bg: "#7a4a20" },
    { icon: "📋", current: totals.activity, goal: profile.activityGoal, color: "#6B7E9A", bg: "#3a4a5a" },
    { icon: "💧", current: totals.insulin, goal: profile.insulinGoal, color: "#4A7EC8", bg: "#1a3a6a" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {items.map((it, idx) => {
        const pct = Math.min(100, (it.current / Math.max(it.goal, 1)) * 100);
        const diff = Math.abs(it.current - it.goal);
        return (
          <div key={idx} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: it.color, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 13, flexShrink: 0,
              boxShadow: "0 2px 6px rgba(0,0,0,0.4)",
            }}>{it.icon}</div>
            <div style={{ flex: 1, height: 18, background: "rgba(255,255,255,0.08)", borderRadius: 9, overflow: "hidden", position: "relative" }}>
              <div style={{
                height: "100%", width: `${pct}%`,
                background: diff <= 2 ? "#5CB85C" : it.color,
                borderRadius: 9, transition: "width 0.4s",
              }} />
            </div>
            <div style={{
              fontSize: 10, fontWeight: 700, color: diff <= 2 ? "#5CB85C" : "#aaa",
              fontFamily: "'OstrichSans', sans-serif", minWidth: 32, textAlign: "right",
            }}>{it.current}/{it.goal}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── ACTION BUTTON ────────────────────────────────────────
function ActionBtn({ label, onClick, disabled, highlight, danger }) {
  const baseBg = highlight ? "#fff" : danger ? "rgba(217,83,79,0.15)" : "#fff";
  const baseColor = highlight ? "#1a2744" : danger ? "#D9534F" : "#1a2744";
  const baseBorder = highlight ? "2px solid #fff" : danger ? "2px solid rgba(217,83,79,0.5)" : "2px solid rgba(255,255,255,0.7)";

  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        background: baseBg,
        color: baseColor,
        border: baseBorder,
        borderRadius: 6, padding: "8px 0",
        fontFamily: "'OstrichSans', sans-serif",
        fontSize: "clamp(11px, 1.4vw, 15px)",
        letterSpacing: "0.1em", textTransform: "uppercase",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.4 : 1,
        transition: "background 0.15s, color 0.15s",
        width: "100%",
      }}
      onMouseEnter={e => {
        if (disabled) return;
        e.currentTarget.style.background = "#1a2744";
        e.currentTarget.style.color = "#fff";
        e.currentTarget.style.borderColor = "#fff";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = baseBg;
        e.currentTarget.style.color = baseColor;
        e.currentTarget.style.borderColor = highlight ? "#fff" : danger ? "rgba(217,83,79,0.5)" : "rgba(255,255,255,0.7)";
      }}
    >
      {label}
    </button>
  );
}

// ─── PHASES ──────────────────────────────────────────────
const PHASES = { SETUP: "setup", DRAW: "draw", SPIN: "spin", PLACE: "place", ENDGAME: "endgame" };

// ─── SETUP SCREEN ─────────────────────────────────────────
function SetupScreen({ onStart }) {
  return (
    <div
      onClick={() => onStart()}
      style={{
        width: "100vw", height: "100vh", overflow: "hidden",
        background: "#1a2744",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'OstrichSans', sans-serif",
        cursor: "pointer",
      }}
    >
      <style>{`
        @font-face {
          font-family: 'OstrichSans';
          src: url('/assets/fonts/OstrichSans-Heavy.otf') format('opentype');
          font-weight: 900;
        }
        @font-face {
          font-family: 'GillSans';
          src: url('/assets/fonts/GillSans.ttc') format('truetype');
          font-weight: 400;
        }
        @font-face {
          font-family: 'GillSans';
          src: url('/assets/fonts/GillSans.ttc') format('truetype');
          font-weight: 600;
        }
        @keyframes popIn { from { transform: scale(0.88); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }
      `}</style>
      <div style={{
        textAlign: "center", color: "#fff", maxWidth: 480, padding: 32,
        animation: "popIn 0.3s ease-out",
      }}>
        <div style={{ fontSize: "clamp(36px, 6vw, 64px)", textTransform: "uppercase", letterSpacing: "0.05em", lineHeight: 1 }}>
          Pancreas:
        </div>
        <div style={{ fontSize: "clamp(28px, 5vw, 52px)", textTransform: "uppercase", letterSpacing: "0.05em", color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>
          Manual Mode
        </div>
        <div style={{
          fontSize: 13, opacity: 0.5, marginBottom: 32,
          fontFamily: "'GillSans', 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif",
          fontWeight: 400,
        }}>created by Marc Cortez</div>
        <p style={{
          fontSize: 15, opacity: 0.75, lineHeight: 1.6, marginBottom: 48,
          fontFamily: "'GillSans', 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif",
          fontWeight: 600,
        }}>
          Balance your food, activity, and insulin to match your profile goals. Spin the Blood Glucose Wheel each round — land on Low or High and you'll face challenges that change your strategy.
        </p>
        <div style={{
          fontSize: "clamp(13px, 1.8vw, 17px)", letterSpacing: "0.18em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.55)",
          animation: "pulse 2s ease-in-out infinite",
          fontFamily: "'OstrichSans', sans-serif",
        }}>
          Click anywhere to play
        </div>
      </div>
    </div>
  );
}

// ─── ENDGAME SCREEN ────────────────────────────────────────
function EndgameScreen({ profiles, boards, onReset }) {
  const calcScore = (pi) => {
    const t = { food: 0, activity: 0, insulin: 0 };
    SECTIONS.forEach(s => (boards[pi]?.[s] || []).forEach(c => { t[c.type] += c.value; }));
    const p = profiles[pi];
    return {
      ...t,
      foodDiff: Math.abs(t.food - p.foodGoal),
      actDiff: Math.abs(t.activity - p.activityGoal),
      insDiff: Math.abs(t.insulin - p.insulinGoal),
      totalDiff: Math.abs(t.food - p.foodGoal) + Math.abs(t.activity - p.activityGoal) + Math.abs(t.insulin - p.insulinGoal),
    };
  };
  const scores = profiles.map((_, i) => calcScore(i));
  const winner = scores[0].totalDiff <= 6 ? "You Win!" : "Try Again!";

  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "auto",
      background: "#1a2744",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'OstrichSans', sans-serif", color: "#fff",
    }}>
      <div style={{ textAlign: "center", maxWidth: 560, padding: 32 }}>
        <div style={{ fontSize: 48, textTransform: "uppercase", letterSpacing: "0.05em" }}>Game Over!</div>
        <div style={{ fontSize: 32, color: "rgba(255,255,255,0.6)", marginBottom: 32 }}>{winner}</div>
        {scores.map((s, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.07)", borderRadius: 14, padding: 20, marginBottom: 16,
            border: "1px solid rgba(255,255,255,0.1)", textAlign: "left",
          }}>
            <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
              <img src={ASSETS.profiles[profiles[i].img]} alt="" style={{ width: 70, borderRadius: 8, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, marginBottom: 10 }}>Profile #{profiles[i].idNum}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                  {[
                    { label: "Food", val: s.food, goal: profiles[i].foodGoal, diff: s.foodDiff },
                    { label: "Activity", val: s.activity, goal: profiles[i].activityGoal, diff: s.actDiff },
                    { label: "Insulin", val: s.insulin, goal: profiles[i].insulinGoal, diff: s.insDiff },
                  ].map(x => (
                    <div key={x.label} style={{ background: "rgba(255,255,255,0.05)", borderRadius: 8, padding: 10, textAlign: "center" }}>
                      <div style={{ fontSize: 11, opacity: 0.6, textTransform: "uppercase", letterSpacing: 1 }}>{x.label}</div>
                      <div style={{ fontSize: 28 }}>{x.val}</div>
                      <div style={{ fontSize: 10, opacity: 0.4, fontFamily: "'GillSans', 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif", fontWeight: 600 }}>Goal: {x.goal}</div>
                      <div style={{ fontSize: 12, color: x.diff <= 2 ? "#5CB85C" : x.diff <= 4 ? "#E8943A" : "#D9534F" }}>
                        {x.diff === 0 ? "Perfect!" : `±${x.diff}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        <button onClick={onReset} style={{
          background: "rgba(255,255,255,0.1)", color: "#fff",
          border: "2px solid rgba(255,255,255,0.4)", borderRadius: 10,
          padding: "12px 40px", fontSize: 18, fontWeight: 700,
          cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase",
          fontFamily: "'OstrichSans', sans-serif", marginTop: 8,
        }}>Play Again</button>
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────
export default function App() {
  const [gameState, setGameState] = useState(PHASES.SETUP);
  const [currentPlayer] = useState(0);
  const [profiles, setProfiles] = useState([]);
  const [currentSection, setCurrentSection] = useState(0);
  const [hand, setHand] = useState([]);
  const [boards, setBoards] = useState([]);
  const [effectCard, setEffectCard] = useState(null);
  const [activeConstraint, setActiveConstraint] = useState(null);
  const [foodDeck, setFoodDeck] = useState([]);
  const [activityDeck, setActivityDeck] = useState([]);
  const [insulinDeck, setInsulinDeck] = useState([]);
  const [lowDeck, setLowDeck] = useState([]);
  const [highDeck, setHighDeck] = useState([]);
  const [message, setMessage] = useState("");
  const [hasSpun, setHasSpun] = useState(false);
  const [placedThisTurn, setPlacedThisTurn] = useState(0);
  const [showRules, setShowRules] = useState(true);
  const [showFullRules, setShowFullRules] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [spinResult, setSpinResult] = useState(null);
  const [viewSection, setViewSection] = useState(0); // which tab the player is currently viewing
  const [sectionEffects, setSectionEffects] = useState([null, null, null]); // effect card per section
  const [selectedCards, setSelectedCards] = useState(new Set());
  const spinRef = useRef(null);

  const initDecks = useCallback(() => {
    setFoodDeck(buildDeck(FOOD_CARDS));
    setActivityDeck(buildDeck(ACTIVITY_CARDS));
    setInsulinDeck(shuffle(INSULIN_CARDS.map(c => ({ ...c, uid: uid() }))));
    setLowDeck(shuffle(LOW_CARDS.map(c => ({ ...c, uid: uid() }))));
    setHighDeck(shuffle(HIGH_CARDS.map(c => ({ ...c, uid: uid() }))));
  }, []);

  const startGame = () => {
    const shuffled = shuffle(PROFILE_CARDS);
    const profs = shuffled.slice(0, 1);
    setProfiles(profs);
    setBoards(profs.map(() => ({ Morning: [], Afternoon: [], Night: [] })));
    setCurrentSection(0);
    initDecks();
    setGameState(PHASES.DRAW);
    setSpinResult(null);
    setViewSection(0);
    setSectionEffects([null, null, null]);
    setMessage(`Draw your cards for ${SECTIONS[0]}!`);
  };

  const drawCards = () => {
    const drawnFood = [], drawnActivity = [], drawnInsulin = [];
    const nf = [...foodDeck], na = [...activityDeck], ni = [...insulinDeck];
    for (let i = 0; i < 3; i++) { if (nf.length) drawnFood.push(nf.pop()); if (na.length) drawnActivity.push(na.pop()); }
    for (let i = 0; i < 4; i++) { if (ni.length) drawnInsulin.push(ni.pop()); }
    setFoodDeck(nf); setActivityDeck(na); setInsulinDeck(ni);
    setHand([...drawnFood, ...drawnActivity, ...drawnInsulin]);
    setPlacedThisTurn(0);
    setSelectedCards(new Set());
    setGameState(PHASES.SPIN);
    setHasSpun(false);
    setSpinResult(null);
    setMessage("Spin the Blood Glucose Wheel!");
  };

  const handleSpinResult = (color) => {
    setHasSpun(true);
    setSpinResult(color);
    if (color === "green") {
      setActiveConstraint(null);
      setMessage("In Range! Place your cards on the board.");
      setTimeout(() => setGameState(PHASES.PLACE), 900);
    } else if (color === "low") {
      const nl = [...lowDeck];
      const card = nl.length ? nl.pop() : { ...LOW_CARDS[0], uid: uid() };
      setLowDeck(nl);
      setEffectCard(card);
      setActiveConstraint(card);
      setSectionEffects(prev => { const n = [...prev]; n[currentSection] = card; return n; });
    } else {
      const nh = [...highDeck];
      const card = nh.length ? nh.pop() : { ...HIGH_CARDS[0], uid: uid() };
      setHighDeck(nh);
      setEffectCard(card);
      setActiveConstraint(card);
      setSectionEffects(prev => { const n = [...prev]; n[currentSection] = card; return n; });
    }
  };

  const dismissEffect = () => {
    const c = effectCard;
    setEffectCard(null);
    let newHand = [...hand];
    switch (c.rule) {
      case "discardTopActivity": { const s = newHand.filter(h => h.type === "activity").sort((a, b) => b.value - a.value); if (s.length) newHand = newHand.filter(h => h.uid !== s[0].uid); break; }
      case "discardTop2Activity": { const s = newHand.filter(h => h.type === "activity").sort((a, b) => b.value - a.value); const rm = s.slice(0, 2).map(f => f.uid); newHand = newHand.filter(h => !rm.includes(h.uid)); break; }
      case "discardTopFood": { const s = newHand.filter(h => h.type === "food").sort((a, b) => b.value - a.value); if (s.length) newHand = newHand.filter(h => h.uid !== s[0].uid); break; }
      case "discardTop2Food": { const s = newHand.filter(h => h.type === "food").sort((a, b) => b.value - a.value); const rm = s.slice(0, 2).map(f => f.uid); newHand = newHand.filter(h => !rm.includes(h.uid)); break; }
      case "drawExtraFA": { const nf = [...foodDeck], na = [...activityDeck]; if (nf.length) { newHand.push(nf.pop()); setFoodDeck(nf); } else if (na.length) { newHand.push(na.pop()); setActivityDeck(na); } break; }
      case "drawExtraInsulin": { const ni = [...insulinDeck]; for (let i = 0; i < 2; i++) { if (ni.length) newHand.push(ni.pop()); } setInsulinDeck(ni); break; }
    }
    setHand(newHand);
    setMessage("Place your cards on the board, then click End.");
    setGameState(PHASES.PLACE);
  };

  const handleCardDrop = (cardUid, section) => {
    if (gameState !== PHASES.PLACE) return;
    const sName = SECTIONS[currentSection];
    if (section !== sName) return;
    const card = hand.find(c => c.uid === cardUid);
    if (!card) return;
    const cur = boards[currentPlayer]?.[sName] || [];
    if (cur.length >= 5) { setMessage("⚠️ Maximum 5 cards per section!"); return; }
    const constraint = activeConstraint?.rule;
    if (constraint === "actionMax2" && card.type === "activity" && card.value > 2) { setMessage("⚠️ Cannot play action cards above 2 points!"); return; }
    if (constraint === "noAction" && card.type === "activity") { setMessage("⚠️ Cannot play any action cards this turn!"); return; }
    if (constraint === "foodMax2" && card.type === "food" && card.value > 2) { setMessage("⚠️ Cannot play food cards above 2 points!"); return; }
    if (constraint === "maxAction1" && card.type === "activity") { const a = cur.filter(c => c.type === "activity").length; if (a >= 1) { setMessage("⚠️ Max 1 action card this turn!"); return; } }
    if (constraint === "maxFood1" && card.type === "food") { const f = cur.filter(c => c.type === "food").length; if (f >= 1) { setMessage("⚠️ Max 1 food card this turn!"); return; } }
    const nb = [...boards];
    const pb = { ...nb[currentPlayer] };
    pb[sName] = [...(pb[sName] || []), card];
    nb[currentPlayer] = pb;
    setBoards(nb);
    setHand(prev => prev.filter(c => c.uid !== cardUid));
    setPlacedThisTurn(prev => prev + 1);
    setMessage(`Card placed! ${5 - cur.length - 1} slots remaining.`);
  };

  const handleRemoveFromBoard = (cardUid, section) => {
    if (gameState !== PHASES.PLACE) return;
    const sName = SECTIONS[currentSection];
    if (section !== sName) return;
    const bCards = boards[currentPlayer]?.[sName] || [];
    const card = bCards.find(c => c.uid === cardUid);
    if (!card) return;
    const nb = [...boards];
    const pb = { ...nb[currentPlayer] };
    pb[sName] = bCards.filter(c => c.uid !== cardUid);
    nb[currentPlayer] = pb;
    setBoards(nb);
    setHand(prev => [...prev, card]);
    setPlacedThisTurn(prev => Math.max(0, prev - 1));
  };

  const toggleSelectCard = (cardUid) => {
    setSelectedCards(prev => {
      const next = new Set(prev);
      if (next.has(cardUid)) next.delete(cardUid);
      else next.add(cardUid);
      return next;
    });
  };

  const placeSelected = () => {
    if (gameState !== PHASES.PLACE) return;
    const sName = SECTIONS[currentSection];
    let cur = [...(boards[currentPlayer]?.[sName] || [])];
    let remaining = [...hand];
    const constraint = activeConstraint?.rule;
    let placed = 0;

    for (const cardUid of selectedCards) {
      if (cur.length >= 5) break;
      const card = remaining.find(c => c.uid === cardUid);
      if (!card) continue;
      // Constraint checks
      if (constraint === "actionMax2" && card.type === "activity" && card.value > 2) { setMessage("⚠️ Cannot play action cards above 2 points!"); continue; }
      if (constraint === "noAction" && card.type === "activity") { setMessage("⚠️ Cannot play any action cards this turn!"); continue; }
      if (constraint === "foodMax2" && card.type === "food" && card.value > 2) { setMessage("⚠️ Cannot play food cards above 2 points!"); continue; }
      if (constraint === "maxAction1" && card.type === "activity") { const a = cur.filter(c => c.type === "activity").length; if (a >= 1) { setMessage("⚠️ Max 1 action card this turn!"); continue; } }
      if (constraint === "maxFood1" && card.type === "food") { const f = cur.filter(c => c.type === "food").length; if (f >= 1) { setMessage("⚠️ Max 1 food card this turn!"); continue; } }
      cur.push(card);
      remaining = remaining.filter(c => c.uid !== cardUid);
      placed++;
    }

    if (placed > 0) {
      const nb = [...boards];
      const pb = { ...nb[currentPlayer] };
      pb[sName] = cur;
      nb[currentPlayer] = pb;
      setBoards(nb);
      setHand(remaining);
      setPlacedThisTurn(prev => prev + placed);
      setSelectedCards(new Set());
      setMessage(`${placed} card${placed !== 1 ? "s" : ""} placed!`);
    }
  };

  const discardSelected = () => {
    if (selectedCards.size === 0) return;
    setHand(prev => prev.filter(c => !selectedCards.has(c.uid)));
    setSelectedCards(new Set());
    setMessage(`${selectedCards.size} card${selectedCards.size !== 1 ? "s" : ""} discarded.`);
  };

  const finishPlacing = () => {
    const sCards = boards[currentPlayer]?.[SECTIONS[currentSection]] || [];
    const constraint = activeConstraint?.rule;
    if (constraint === "moreFoodThanAction") { const fc = sCards.filter(c => c.type === "food").length, ac = sCards.filter(c => c.type === "activity").length; if (fc <= ac && ac > 0) { setMessage("⚠️ Must play more food than action cards!"); return; } }
    if (constraint === "moreActivityThanFood") { const fc = sCards.filter(c => c.type === "food").length, ac = sCards.filter(c => c.type === "activity").length; if (ac <= fc && fc > 0) { setMessage("⚠️ Must play more activity than food cards!"); return; } }
    if (constraint === "minFood3") { const fp = sCards.filter(c => c.type === "food").reduce((s, c) => s + c.value, 0); if (fp < 3) { setMessage("⚠️ Must play at least 3 food points!"); return; } }
    if (constraint === "minFood6") { const fp = sCards.filter(c => c.type === "food").reduce((s, c) => s + c.value, 0); if (fp < 6) { setMessage("⚠️ Must play at least 6 food points!"); return; } }
    if (constraint === "minActivity3") { const ap = sCards.filter(c => c.type === "activity").reduce((s, c) => s + c.value, 0); if (ap < 3) { setMessage("⚠️ Must play at least 3 activity points!"); return; } }
    if (constraint === "minActivity4") { const ap = sCards.filter(c => c.type === "activity").reduce((s, c) => s + c.value, 0); if (ap < 4) { setMessage("⚠️ Must play at least 4 activity points!"); return; } }
    setHand([]); setActiveConstraint(null); setPlacedThisTurn(0); setSpinResult(null);
    const nextSection = currentSection + 1;
    if (nextSection < 3) {
      setCurrentSection(nextSection);
      setViewSection(nextSection);
      setGameState(PHASES.DRAW);
      setMessage(`${SECTIONS[nextSection]} begins! Draw your cards!`);
    } else {
      setGameState(PHASES.ENDGAME);
    }
  };

  const resetGame = () => {
    setGameState(PHASES.SETUP); setBoards([]); setProfiles([]); setHand([]);
    setCurrentSection(0); setActiveConstraint(null);
    setMessage(""); setPlacedThisTurn(0); setSpinResult(null);
    setViewSection(0); setSectionEffects([null, null, null]); setSelectedCards(new Set());
  };

  // ── SCREENS ──
  if (gameState === PHASES.SETUP) return <SetupScreen onStart={startGame} />;
  if (gameState === PHASES.ENDGAME) return <EndgameScreen profiles={profiles} boards={boards} onReset={resetGame} />;

  const currentProfile = profiles[currentPlayer];
  const sectionName = SECTIONS[currentSection];
  const isPlacing = gameState === PHASES.PLACE;
  const isSpinning = gameState === PHASES.SPIN;
  const isDraw = gameState === PHASES.DRAW;

  // Current action text for rules panel
  const currentAction = isDraw
    ? "Draw — Click DRAW to draw your cards for this section."
    : isSpinning
    ? `Spin — Spin the blood sugar wheel. If it lands on ${<span style={{color:"#D9534F"}}>Low</span>} or High, draw the corresponding card. Fulfill the prompt on the card this turn.`
    : isPlacing
    ? `Place — Drag cards from your hand onto the ${sectionName} section. Click END when done.`
    : "";

  // Hand display — group by type for visual grouping
  const foodHand = hand.filter(c => c.type === "food");
  const activityHand = hand.filter(c => c.type === "activity");
  const insulinHand = hand.filter(c => c.type === "insulin");

  return (
    <div style={{
      width: "100vw", height: "100vh", overflow: "hidden",
      background: "#1a2744",
      display: "flex", flexDirection: "column",
      fontFamily: "'OstrichSans', sans-serif",
      color: "#fff",
      userSelect: "none",
    }}>
      <style>{`
        @font-face {
          font-family: 'OstrichSans';
          src: url('/assets/fonts/OstrichSans-Heavy.otf') format('opentype');
          font-weight: 900;
          font-style: normal;
        }
        @font-face {
          font-family: 'GillSans';
          src: url('/assets/fonts/GillSans.ttc') format('truetype');
          font-weight: 400;
          font-style: normal;
        }
        @font-face {
          font-family: 'GillSans';
          src: url('/assets/fonts/GillSans.ttc') format('truetype');
          font-weight: 600;
          font-style: normal;
        }
        @keyframes popIn { from { transform: scale(0.88); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        * { box-sizing: border-box; }
      `}</style>

      {effectCard && <EffectCardPopup card={effectCard} onDismiss={dismissEffect} />}

      {/* ── HEADER ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "8px 16px", flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span
            onClick={resetGame}
            title="Return to home"
            style={{
              fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 900, textTransform: "uppercase",
              letterSpacing: "0.04em", cursor: "pointer",
            }}
          >
            Pancreas: Manual Mode
          </span>
          <span style={{
            fontSize: "clamp(9px, 1.1vw, 12px)", opacity: 0.5,
            fontFamily: "'OstrichSans', 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif",
            fontWeight: 400, fontStyle: "italic",
          }}>
            created by Marc Cortez
          </span>
        </div>
        {/* Hamburger menu */}
        <div style={{ position: "relative" }}>
          <button onClick={() => setShowMenu(m => !m)} style={{
            background: "none", border: "none", cursor: "pointer", padding: 6,
            display: "flex", flexDirection: "column", gap: 4, alignItems: "center",
          }}>
            {[0,1,2].map(i => <div key={i} style={{ width: 22, height: 2.5, background: "#fff", borderRadius: 2 }} />)}
          </button>
          {showMenu && (
            <div
              onClick={() => setShowMenu(false)}
              style={{
                position: "absolute", top: "calc(100% + 6px)", right: 0,
                background: "#1a2744", border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 10, padding: "8px 0", minWidth: 180,
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                zIndex: 300, animation: "popIn 0.15s ease-out",
              }}
            >
              {/* Placeholder items — replace with your nav links */}
              <div style={{
                padding: "10px 18px",
                fontSize: 13, fontFamily: "'OstrichSans', sans-serif",
                letterSpacing: "0.08em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)", pointerEvents: "none",
              }}>
                Menu
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MAIN CONTENT ROW ── */}
      <div style={{
        flex: 1, display: "flex", gap: 10, padding: "0 10px 8px",
        overflow: "hidden", minHeight: 0,
      }}>

        {/* ── BOARD PANEL ── */}
        <div style={{
          flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 8,
        }}>
          {/* Section tab headers */}
          <div style={{ display: "flex", gap: 0, flexShrink: 0 }}>
            {SECTIONS.map((section, si) => {
              const isActiveSection = si === currentSection;
              const isPast = si < currentSection;
              const isFuture = si > currentSection;
              const isViewing = si === viewSection;
              return (
                <button
                  key={section}
                  onClick={() => { if (!isFuture) setViewSection(si); }}
                  style={{
                    flex: 1,
                    padding: "8px 4px",
                    fontFamily: "'OstrichSans', sans-serif",
                    fontSize: "clamp(11px, 1.6vw, 17px)",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    border: "none",
                    borderBottom: isViewing ? "3px solid #fff" : "3px solid transparent",
                    background: "none",
                    color: isFuture ? "rgba(255,255,255,0.25)" : isViewing ? "#fff" : "rgba(255,255,255,0.5)",
                    cursor: isFuture ? "default" : "pointer",
                  }}
                >
                  {isPast && <span style={{ marginRight: 4, fontSize: "0.8em" }}>✓</span>}
                  Section {si + 1}: {section}
                  {isActiveSection && !isViewing && (
                    <span style={{ fontSize: 9, display: "block", opacity: 0.6, letterSpacing: 0.5, marginTop: 1 }}>ACTIVE</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Board area — shows the viewed section */}
          <div style={{
            flex: 1, minHeight: 0,
            background: "#2a3d6e",
            borderRadius: 12,
            padding: "14px 16px",
            display: "flex", flexDirection: "column",
            position: "relative",
          }}>
            {/* Readonly overlay when viewing a past section */}
            {viewSection !== currentSection && (
              <div style={{
                position: "absolute", inset: 0, borderRadius: 12,
                background: "rgba(0,0,0,0.18)",
                display: "flex", alignItems: "flex-end", justifyContent: "center",
                paddingBottom: 12, zIndex: 5, pointerEvents: "none",
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, letterSpacing: 1,
                  color: "rgba(255,255,255,0.5)", textTransform: "uppercase",
                  background: "rgba(0,0,0,0.4)", borderRadius: 6, padding: "4px 12px",
                }}>
                  {viewSection < currentSection ? `${SECTIONS[viewSection]} — Completed` : "Not yet played"}
                </div>
              </div>
            )}
            <SectionBoard
              section={SECTIONS[viewSection]}
              sectionIndex={viewSection}
              currentSection={currentSection}
              cards={boards[currentPlayer]?.[SECTIONS[viewSection]] || []}
              effectCard={sectionEffects[viewSection]}
              canDrop={isPlacing && viewSection === currentSection}
              onDrop={handleCardDrop}
              onRemoveCard={handleRemoveFromBoard}
              isPlacing={isPlacing && viewSection === currentSection}
            />
          </div>

          {/* ── BOTTOM ROW: hand | buttons | spinner ── */}
          <div style={{
            display: "flex", gap: 10, alignItems: "stretch",
            height: "clamp(130px, 22vh, 200px)", flexShrink: 0,
          }}>

            {/* Hand — also accepts drag-from-board to return cards */}
            <div
              onDragOver={(e) => { if (isPlacing) { e.preventDefault(); e.dataTransfer.dropEffect = "move"; } }}
              onDrop={(e) => {
                e.preventDefault();
                const boardCardUid = e.dataTransfer.getData("board-card");
                if (boardCardUid && isPlacing) handleRemoveFromBoard(boardCardUid, SECTIONS[currentSection]);
              }}
              style={{
                flex: 1, minWidth: 0,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 10,
                padding: "8px 10px",
                display: "flex", alignItems: "flex-end",
                gap: 4, overflowX: "auto",
              }}>
              {hand.length === 0 && (
                <div style={{ fontSize: 12, opacity: 0.35, fontStyle: "italic", margin: "auto", alignSelf: "center" }}>
                  {isDraw ? "Click DRAW to draw your hand" : "No cards in hand"}
                </div>
              )}
              {[...foodHand, ...activityHand, ...insulinHand].map(card => (
                <HandCard
                  key={card.uid}
                  card={card}
                  draggable={isPlacing}
                  disabled={!isPlacing}
                  selected={selectedCards.has(card.uid)}
                  onToggleSelect={isPlacing ? toggleSelectCard : null}
                />
              ))}
            </div>

            {/* Divider */}
            <div style={{ width: 2, background: "rgba(255,255,255)", borderRadius: 3, flexShrink: 0 }} />

            {/* Action buttons */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6,
              alignContent: "center", flexShrink: 0, width: "clamp(140px, 16vw, 200px)",
              padding: "4px 0",
            }}>
              <ActionBtn label="Spin" onClick={() => spinRef.current && spinRef.current()} disabled={!isSpinning || hasSpun} />
              <ActionBtn label="Draw" onClick={drawCards} disabled={!isDraw} />
              <ActionBtn label="Discard" onClick={discardSelected} disabled={!isPlacing || selectedCards.size === 0} />
              <ActionBtn label="Place" onClick={placeSelected} disabled={!isPlacing || selectedCards.size === 0} />
              <div style={{ gridColumn: "1 / -1" }}>
                <ActionBtn label="End" onClick={finishPlacing} highlight={isPlacing} disabled={!isPlacing} />
              </div>
            </div>

            {/* Divider */}
            <div style={{ width: 2, background: "rgba(255, 255, 255)", borderRadius: 3, flexShrink: 0 }} />

            {/* Spinner */}
            <div style={{
              flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
              padding: "0 8px",
            }}>
              <SpinnerWheel onResult={handleSpinResult} disabled={!isSpinning || hasSpun} spinRef={spinRef} />
            </div>

          </div>
        </div>

        {/* ── FULL RULES POPUP ── */}
        {showFullRules && (
          <div
            onClick={() => setShowFullRules(false)}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
              display: "flex", alignItems: "center", justifyContent: "center",
              zIndex: 200, animation: "fadeIn 0.2s ease-out",
            }}
          >
            <div
              onClick={e => e.stopPropagation()}
              style={{
                background: "#1a2744", borderRadius: 16, padding: "36px 40px",
                maxWidth: 640, width: "90vw", maxHeight: "80vh", overflowY: "auto",
                color: "#fff", animation: "popIn 0.25s ease-out",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.7)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                <span style={{ fontFamily: "'OstrichSans', sans-serif", fontSize: 36, letterSpacing: "0.06em", textTransform: "uppercase" }}>
                  Full Rules
                </span>
                <button onClick={() => setShowFullRules(false)} style={{
                  background: "none", border: "none", color: "rgba(255,255,255,0.5)",
                  fontSize: 28, cursor: "pointer", lineHeight: 1, padding: "0 0 0 16px",
                }}>✕</button>
              </div>

              {[
                { heading: "Objective", body: "End the third and final section with your point totals for each card type — Food, Activity, and Insulin — each within two points of the goals shown on your Profile ID card." },
                { heading: "Setup", body: "Each player draws a Profile ID card, which sets their Food, Activity, and Insulin goals for the full game. Shuffle the Food, Activity, Insulin, Low Effect, and High Effect decks separately. Place them face-down in the center." },
                { heading: "Turn Order", body: "Each section (Morning, Afternoon, Night) follows the same sequence: Draw → Spin → Place. Complete all three sections to finish the game." },
                { heading: "Draw", body: "Click DRAW to draw 3 Food cards, 3 Activity cards, and 4 Insulin cards into your hand." },
                { heading: "Spin", body: "Click SPIN to spin the Blood Glucose Wheel. If it lands on green (In Range), proceed normally to place cards. If it lands on red (Low) or orange (High), a status effect card is drawn and its constraint applies to your placement this turn." },
                { heading: "Place", body: "Drag cards from your hand onto the current section board. You may place up to 5 cards per section. When satisfied, click END to lock in your choices and advance to the next section. You can return cards to your hand by clicking the ✕ on a placed card before ending." },
                { heading: "Status Effects", body: "Low effect cards impose constraints like minimum Food points or restrictions on Activity cards. High effect cards impose constraints like minimum Activity points or maximum Food values. Some effects discard cards from your hand immediately when drawn. You must satisfy the constraint before clicking END." },
                { heading: "Reviewing Past Sections", body: "Click the section tab headers (Section 1: Morning, etc.) to review cards you placed in earlier sections. Completed sections are read-only. Click the current section tab to return to active play." },
                { heading: "Winning", body: "After Night ends, total your Food, Activity, and Insulin points across all three sections. If each total is within ±2 of your Profile goals, you win!" },
              ].map(({ heading, body }) => (
                <div key={heading} style={{ marginBottom: 20 }}>
                  <div style={{ fontFamily: "'OstrichSans', sans-serif", fontSize: 18, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6, color: "rgba(255,255,255,0.9)" }}>{heading}</div>
                  <div style={{ fontFamily: "'GillSans', 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif", fontSize: 14, fontWeight: 600, lineHeight: 1.65, color: "rgba(255,255,255,0.75)" }}>{body}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RULES PANEL ── */}
        {showRules && (
          <div style={{
            width: "clamp(180px, 18vw, 220px)", flexShrink: 0,
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            {/* Upper portion: rules text — sits in line with the blue board */}
            <div style={{
              flex: 1, minHeight: 0,
              display: "flex", flexDirection: "column", justifyContent: "space-between",
            }}>
              {/* Rules text at top */}
              <div style={{ overflow: "auto" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                  <span style={{ fontFamily: "'OstrichSans', sans-serif", fontSize: 18, letterSpacing: "0.08em", textTransform: "uppercase", color: "#fff" }}>
                    Rules
                  </span>
                  <button
                    onClick={() => setShowFullRules(true)}
                    title="View full rules"
                    style={{
                      background: "none", border: "none", cursor: "pointer",
                      fontFamily: "'OstrichSans', sans-serif",
                      fontSize: 22, color: "#fff",
                      lineHeight: 1, padding: "0 2px",
                    }}
                  >+</button>
                </div>

                <div style={{ fontFamily: "'OstrichSans', sans-serif", fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 4, color: "#fff" }}>
                  How to Win
                </div>
                <div style={{ fontSize: 11, lineHeight: 1.55, marginBottom: 14, fontFamily: "'GillSans', 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>
                  End the third and final section with your point totals for each card type being within two points of the totals displayed on your Profile ID card.
                </div>

                <div style={{ fontFamily: "'OstrichSans', sans-serif", fontSize: 13, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 4, color: "#fff" }}>
                  Current Action
                </div>
                <div style={{ fontSize: 11, lineHeight: 1.55, fontFamily: "'GillSans', 'Gill Sans', 'Gill Sans MT', Calibri, sans-serif", fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>
                  {isDraw && "Draw — Click DRAW to draw your cards for this section."}
                  {isSpinning && (<>Spin — Spin the blood sugar wheel. If it lands on <span style={{ color: "#D9534F" }}>Low</span> or <span style={{ color: "#E8943A" }}>High</span>, draw the corresponding card. Fulfill the prompt on the card this turn.</>)}
                  {isPlacing && `Place — Drag cards from your hand onto the ${sectionName} section. Click END when done.`}
                </div>
              </div>

              {/* Score bars pinned to bottom of the blue board area */}
              {currentProfile && (
                <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "10px 12px", flexShrink: 0 }}>
                  <ScoreBars board={boards[currentPlayer] || {}} profile={currentProfile} />
                </div>
              )}
            </div>

            {/* Lower portion: profile card — sits in line with the bottom row */}
            <div style={{
              height: "clamp(130px, 18vh, 200px)", flexShrink: 0,
              display: "flex", alignItems: "center",
            }}>
              {currentProfile && (
                <div style={{
                  borderRadius: 8, overflow: "hidden",
                  border: "2px solid rgba(255,255,255,0.2)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                  width: "100%",
                }}>
                  <img
                    src={ASSETS.profiles[currentProfile.img]}
                    alt={`Profile ${currentProfile.idNum}`}
                    style={{ width: "100%", display: "block" }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── STATUS MESSAGE ── */}
      {message && (
        <div style={{
          background: "rgba(0,0,0,0.3)", borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "5px 16px", fontSize: 11, textAlign: "center",
          color: "rgba(255,255,255,0.6)", letterSpacing: "0.04em", flexShrink: 0,
        }}>
          {message}
        </div>
      )}
    </div>
  );
}
