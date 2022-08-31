import * as React from 'react'
import { replaceAll, createLink, createTitle } from './utils'

export default class Heading {
  title: string
  level: number
  titleLimit: number
  customMatchers: CustomMatchers
  children: Heading[]

  constructor(
    title: string,
    level: number,
    titleLimit: number,
    customMatchers?: CustomMatchers,
  ) {
    this.title = title
    this.level = level
    this.titleLimit = titleLimit
    this.customMatchers = customMatchers ? customMatchers : {}
    this.children = []
  }

  addChild(child: Heading) {
    this.children.push(child);
  }

  generateList(): JSX.Element {
    return <>{createListItem(this)}</>
  }
}

const createListItem = (heading: Heading): JSX.Element => {
  const link = createLink(heading.title);
  return (
    <li>
      <a href={`#${replaceAll(link, heading.customMatchers)}`}>{createTitle(heading.title, heading.titleLimit)}</a>
      {heading.children.length !== 0 && <ul>{heading.children.map(child => createListItem(child))}</ul>}
    </li>
  );
};

/*
 Create a new heading object from the given string
*/
const newHeading = (
  headingText: string,
  titleLimit: number,
  customMatchers?: CustomMatchers,
): Heading | null => {
  const matchedHashes = headingText.match(/^#+/)
  if (!matchedHashes) return null
  const headingLevel: number = matchedHashes[0].split('').length
  const matchers = customMatchers ? customMatchers : {}

  return new Heading(headingText, headingLevel, titleLimit, matchers)
}

export { newHeading }
