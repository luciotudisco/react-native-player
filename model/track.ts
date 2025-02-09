/**
 * Represents an item in a playlist.
 */
export class PlayListItem {
  constructor(
    public readonly id: string,
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
    'd71bebd2-9d38-4ae6-8c92-5f5af55cc872',
    'Frosted Beats',
    'Luna Harmonix',
    'https://res.cloudinary.com/djcq86lcz/video/upload/v1739055848/track1_kflqao.mp3',
    'https://res.cloudinary.com/djcq86lcz/image/upload/v1739055148/cover1_y0kmq4.webp',
  ),
  new PlayListItem(
    '3cfee527-acae-4bf7-bd98-efab8000bdd6',
    'Snow-Capped Reverie',
    'Vesper Cloud',
    'https://res.cloudinary.com/djcq86lcz/video/upload/v1739055851/track2_cyjcvj.mp3',
    'https://res.cloudinary.com/djcq86lcz/image/upload/v1739055148/cover2_x4pfrh.webp',
  ),
  new PlayListItem(
    '63120303-ba1c-41b5-8b40-4f1562db3a37',
    'Midnight Ember Chill',
    'Koji Glacier',
    'https://res.cloudinary.com/djcq86lcz/video/upload/v1739055848/track3_ylaziu.mp3',
    'https://res.cloudinary.com/djcq86lcz/image/upload/v1739055148/cover3_pxmllh.webp',
  ),
  new PlayListItem(
    'f1b1b3b4-1b3b-4b3b-8b3b-3b3b3b3b3b3b',
    'Hushed Winter Echoes',
    'Neon Polaris',
    'https://res.cloudinary.com/djcq86lcz/video/upload/v1739055849/track4_i3xviu.mp3',
    'https://res.cloudinary.com/djcq86lcz/image/upload/v1739055148/cover4_eomoho.webp',
  ),
  new PlayListItem(
    '9343dfde-53ab-42cd-9137-49219289973a',
    'Starfall Drizzle',
    'Mellow Pine',
    'https://res.cloudinary.com/djcq86lcz/video/upload/v1739055848/track5_gdvhth.mp3',
    'https://res.cloudinary.com/djcq86lcz/image/upload/v1739055148/cover5_uiawor.webp',
  ),
  new PlayListItem(
    '116e87cc-4140-41c8-a7f7-8e5d4e99e204',
    'Aurora Nightfall',
    'Glacial Soul',
    'https://res.cloudinary.com/djcq86lcz/video/upload/v1739116697/track6_mqha1p.mp3',
    'https://res.cloudinary.com/djcq86lcz/image/upload/v1739116280/cover6_pw6d2g.webp',
  ),
  new PlayListItem(
    'ea8f6426-6cc0-4408-bd46-57a88acb8b15',
    'Caspian Moon',
    'Frosty Tides',
    'https://res.cloudinary.com/djcq86lcz/video/upload/v1739116698/track7_aua8yk.mp3',
    'https://res.cloudinary.com/djcq86lcz/image/upload/v1739116280/cover7_ryjeip.webp',
  ),
  new PlayListItem(
    'a629e08a-eb12-43a3-ac0b-793589fc187b',
    'Cloud-Kissed Silence',
    'Dreamy Glaze',
    'https://res.cloudinary.com/djcq86lcz/video/upload/v1739116699/track8_eask5u.mp3',
    'https://res.cloudinary.com/djcq86lcz/image/upload/v1739116280/cover8_ttopha.webp',
  ),
  new PlayListItem(
    'a28d8911-a214-4690-b232-3e1469119487',
    'Sleepless in Frost',
    'Polar Echo',
    'https://res.cloudinary.com/djcq86lcz/video/upload/v1739116699/track9_vn4f8b.mp3',
    'https://res.cloudinary.com/djcq86lcz/image/upload/v1739116280/cover9_n5wif7.webp',
  ),
  new PlayListItem(
    '2ec03650-deb8-4f0b-abc8-9e61d365f46f',
    'Moonlit Winter Vibes',
    'Drifted Sounds',
    'https://res.cloudinary.com/djcq86lcz/video/upload/v1739116698/track10_x9jp5t.mp3',
    'https://res.cloudinary.com/djcq86lcz/image/upload/v1739116280/cover10_l2kste.webp',
  ),
]);
