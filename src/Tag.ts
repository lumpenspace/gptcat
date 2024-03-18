interface TagMeta {
  tag: string
  displayName: string
  description: string
  example: string
}

interface Tag<Props> extends TagMeta {
  (props: Props): JSX.Element
}

interface Preset {
  name: string
  description: string
  messageIntro: string
  tags: TagMeta[]
}

export type { Preset };

export { type Tag, type TagMeta };
