/**
 * Represents an item in a playlist.
 */
export class PlayListItem {
  constructor(
    public readonly name: string,
    public readonly artist: string,
    public readonly audioURI: string,
    public readonly imageURI: string,
  ) {}
}

/**
 * Represents a playlist.
 */
export class PlayList {
  constructor(
    public readonly name: string,
    public readonly items: PlayListItem[],
  ) {}
}
/**
 * A demo playlist.
 */
export const DEMO_PLAYLIST: PlayList = new PlayList('Demo Playlist', [
  new PlayListItem(
    'Frosted Beats',
    'Luna Harmonix',
    '../assets/audio/track1.mp3',
    'https://res.cloudinary.com/djcq86lcz/image/upload/v1739055148/cover1_y0kmq4.webp',
  ),
  new PlayListItem(
    'Snow-Capped Reverie',
    'Vesper Cloud',
    '../assets/audio/track1.mp3',
    'https://res.cloudinary.com/djcq86lcz/image/upload/v1739055148/cover2_x4pfrh.webp',
  ),
  new PlayListItem(
    'Midnight Ember Chill',
    'Koji Glacier',
    '../assets/audio/track1.mp3',
    'https://res.cloudinary.com/djcq86lcz/image/upload/v1739055148/cover3_pxmllh.webp',
  ),
  new PlayListItem(
    'Hushed Winter Echoes',
    'Neon Polaris',
    '../assets/audio/track1.mp3',
    'https://res.cloudinary.com/djcq86lcz/image/upload/v1739055148/cover4_eomoho.webp',
  ),
  new PlayListItem(
    'Starfall Drizzle',
    'Mellow Pine',
    '../assets/audio/track1.mp3',
    'https://res.cloudinary.com/djcq86lcz/image/upload/v1739055148/cover5_uiawor.webp',
  ),
]);
