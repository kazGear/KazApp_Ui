export const COLORS = {
    BORDER_COLOR: "lightgray",

    BUTTON_COLOR: "#63dba1",
    BUTTON_DISABLED: 0.3,
    BUTTON_SHADOW: "darkgreen",

    MAIN_FONT_COLOR: "gray",
    LOSER_FONT_COLOR: "red",
    ALERT_MESSAGE_COLOR: "red",
    ACCENT_FONT_COLOR: "crimson",
    CAPTION_FONT_COLOR: "limegreen",

    THEME_COLOR: "#7fffd4",

    LINE_COLOR: "blue",

    DIALOG_FRAME: "lightgray",
    DIALOG_SHADOW: "gray"
} as const;

export const SIZE = {
    INPUT_HEIGHT: "25px"
} as const;

export const SESSION_STORAGE_KEYS = {
    USER_NAME: "userName",
} as const;

export const STATE_TYPE = {
    NORMAL: 0,
    POISON: 1,
    SLEEP: 2,
    CHARM: 3,
    SLOW: 4,
    POWER_UP: 5,
    DODGE_UP: 6,
    CRITICAL_UP: 7,
    AUTO_HEAL: 8
} as const;

export const STATE_NAME = {
    NORMAL: "正常",
    LOSER: "戦闘不能",
    POISON: "毒",
    SLEEP: "睡眠",
    CHARM: "魅了",
    SLOW: "スロー",
    POWER_UP: "攻撃力UP",
    DODGE_UP: "回避力UP",
    CRITICAL_UP: "クリティカルUP",
    AUTO_HEAL: "自動回復"
} as const;

export const DAMAGE_VIEW = {
    EFFECT_END: 1500,
    DAMAGE_END: 2500,
} as const;

// 環境でドメインが変化
export const DOMAIN = {
    LOCAL_HOST_API: `http://localhost:5000`,
    XSERVER_API: `https://try-the-work.net`,
}
// ドメインを決定
const ENVIRONMENT = DOMAIN.XSERVER_API;
export const URL = {
    INIT_MONSTERS: `${ENVIRONMENT}/api/battle/init`,
    BET_RATE: `${ENVIRONMENT}/api/battle/betRate`,
    BATTLE_NEXT_TURN: `${ENVIRONMENT}/api/battle/nextTurn`,
    RECORD_BATTLE_RESULT: `${ENVIRONMENT}/api/battle/recordResults`,
    INIT_BATTLE_REPORT: `${ENVIRONMENT}/api/battleReport/init`,
    MONSTER_REPORTS: `${ENVIRONMENT}/api/battleReport/monsterReport`,
    BATTLE_REPORTS: `${ENVIRONMENT}/api/battleReport/battleReport`,
} as const;