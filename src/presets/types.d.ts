import { type Tag } from '../tags';

interface Preset {
  name: string
  description: string
  messageIntro: string
  tags: Tag[]
}

export type { Preset };
