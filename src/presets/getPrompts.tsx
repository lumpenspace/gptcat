import type { TagMeta } from '../tags';
import { tagsList } from '../tags';

const getTagPrompts = (includedTags: string[]): string => `\
  <special-tags>
    ${includedTags.map(tagName => {
        const tag = tagsList.find((t: TagMeta) => t.tag === tagName);
        return tag ? getTagPrompt(tag) : ''
      }
    ).join('\n')}
  </special-tags>`;

const getTagPrompt = (tag: TagMeta): string => `
  <special-tag>
    <tag-name>${tag.tag}</tag-name>
    <display-name>${tag.displayName}</display-name>
    <description>${tag.description}</description>
    <example>${tag.example}</example>
  </special-tag>`;

export { getTagPrompts };
