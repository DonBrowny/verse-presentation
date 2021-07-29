const ROUTES = [
  {
    path: '/verse',
    name: 'Verse',
  },
  {
    path: '/lyrics',
    name: 'Lyrics',
  },
  {
    path: '/layout',
    name: 'Layout',
  },
  {
    path: '/settings',
    name: 'Settings',
  },
];

const BOOKS = [
  'CHAPTERS.GENESIS',
  'CHAPTERS.EXODUS',
  'CHAPTERS.LEVITICUS',
  'CHAPTERS.NUMBERS',
  'CHAPTERS.DEUTERONOMY',
  'CHAPTERS.JOSHUA',
  'CHAPTERS.JUDGES',
  'CHAPTERS.RUTH',
  'CHAPTERS.1SAMUEL',
  'CHAPTERS.2SAMUEL',
  'CHAPTERS.1KINGS',
  'CHAPTERS.2KINGS',
  'CHAPTERS.1CHRONICLES',
  'CHAPTERS.2CHRONICLES',
  'CHAPTERS.EZRA',
  'CHAPTERS.NEHEMIAH',
  'CHAPTERS.ESTHER',
  'CHAPTERS.JOB',
  'CHAPTERS.PSALMS',
  'CHAPTERS.PROVERBS',
  'CHAPTERS.ECCLESIASTES',
  'CHAPTERS.SONG OF SOLOMON',
  'CHAPTERS.ISAIAH',
  'CHAPTERS.JEREMIAH',
  'CHAPTERS.LAMENTATIONS',
  'CHAPTERS.EZEKIEL',
  'CHAPTERS.DANIEL',
  'CHAPTERS.HOSEA',
  'CHAPTERS.JOEL',
  'CHAPTERS.AMOS',
  'CHAPTERS.OBADIAH',
  'CHAPTERS.JONAH',
  'CHAPTERS.MICAH',
  'CHAPTERS.NAHUM',
  'CHAPTERS.HABAKKUK',
  'CHAPTERS.ZEPHANIAH',
  'CHAPTERS.HAGGAI',
  'CHAPTERS.ZECHARIAH',
  'CHAPTERS.MALACHI',
  'CHAPTERS.MATTHEW',
  'CHAPTERS.MARK',
  'CHAPTERS.LUKE',
  'CHAPTERS.JOHN',
  'CHAPTERS.ACTS',
  'CHAPTERS.ROMANS',
  'CHAPTERS.1CORINTHIANS',
  'CHAPTERS.2CORINTHIANS',
  'CHAPTERS.GALATIANS',
  'CHAPTERS.EPHESIANS',
  'CHAPTERS.PHILIPPIANS',
  'CHAPTERS.COLOSSIANS',
  'CHAPTERS.1THESSALONIANS',
  'CHAPTERS.2THESSALONIANS',
  'CHAPTERS.1TIMOTHY',
  'CHAPTERS.2TIMOTHY',
  'CHAPTERS.TITUS',
  'CHAPTERS.PHILEMON',
  'CHAPTERS.HEBREWS',
  'CHAPTERS.JAMES',
  'CHAPTERS.1PETER',
  'CHAPTERS.2PETER',
  'CHAPTERS.1JOHN',
  'CHAPTERS.2JOHN',
  'CHAPTERS.3JOHN',
  'CHAPTERS.JUDE',
  'CHAPTERS.REVELATION',
];

const VISIBLE_ROUTES = ['verse', 'lyrics'];
const DEFAULT_LANG = 'en';
const PLAY_ICON = '/icons/play-circle.svg';
const PAUSE_ICON = '/icons/pause-circle.svg';
const STATUS = { OPEN: 'open', CLOSE: 'close', PAUSE: 'pause' };
const DISPLAY_TYPE = { VERSE: 'verse', LYRICS: 'lyrics' };

export {
  ROUTES,
  BOOKS,
  VISIBLE_ROUTES,
  DEFAULT_LANG,
  PLAY_ICON,
  PAUSE_ICON,
  STATUS,
  DISPLAY_TYPE,
};
