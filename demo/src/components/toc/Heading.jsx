import * as React from 'react';
import { replaceAll, createLink, createTitle } from './utils';

export default class Heading {
  title;
  level;
  titleLimit;
  customMatchers;
  children;

  constructor(title, level, titleLimit, customMatchers) {
    this.title = title;
    this.level = level;
    this.titleLimit = titleLimit;
    this.customMatchers = customMatchers ? customMatchers : {};
    this.children = [];
  }

  addChild(child) {
    this.children.push(child);
  }

  generateList() {
    // const link = createLink(this.title);
    // const listItem = (
    //   <li>
    //     <a href={`#${replaceAll(link, this.customMatchers)}`}>{createTitle(this.title, this.titleLimit)}</a>
    //     {this.children.length && <ul>{}</ul>}
    //   </li>
    // );

    // return <>{nestUl(this.level, listItem)}</>;
    return <>{createListItem(this)}</>
  }
}

const createListItem = (heading) => {
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
const newHeading = (headingText, titleLimit, customMatchers) => {
  const matchedHashes = headingText.match(/^#+/);
  if (!matchedHashes) return null;
  const headingLevel = matchedHashes[0].split('').length;
  const matchers = customMatchers ? customMatchers : {};

  return new Heading(headingText, headingLevel, titleLimit, matchers);
};

/* 
 Return a nested Unordered list based on the given heading level.
*/
const nestUl = (level, listItem) => {
  // switch (level) {
  //   case 1:
  //     return listItem
  //   case 2:
  //     return <ul>{listItem}</ul>
  //   case 3:
  //     return (
  //       <ul>
  //         <ul>{listItem}</ul>
  //       </ul>
  //     )
  //   case 4:
  //     return (
  //       <ul>
  //         <ul>
  //           <ul>{listItem}</ul>
  //         </ul>
  //       </ul>
  //     )
  //   case 5:
  //     return (
  //       <ul>
  //         <ul>
  //           <ul>
  //             <ul>{listItem}</ul>
  //           </ul>
  //         </ul>
  //       </ul>
  //     )
  //   case 6:
  //     return (
  //       <ul>
  //         <ul>
  //           <ul>
  //             <ul>
  //               <ul>{listItem}</ul>
  //             </ul>
  //           </ul>
  //         </ul>
  //       </ul>
  //     )
  //   default:
  //     return listItem
  // }
  return listItem;
};

export { newHeading };
