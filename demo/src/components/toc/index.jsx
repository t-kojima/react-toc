import * as React from 'react'
import styles from './styles.module.css'
import { extractHeadingsFromMd, removeCodeBlockFromMd } from './utils'
import Heading, { newHeading } from './Heading'

const Toc = ({
  markdownText,
  titleLimit,
  highestHeadingLevel,
  lowestHeadingLevel,
  className,
  type,
  customMatchers,
}) => {
  if (!markdownText) return null
  // Set default values
  const limit = titleLimit ? titleLimit : 200
  const defaultClass = type === 'raw' ? '' : 'react-toc'
  const customClass = className || defaultClass
  const headingLevels = [
    highestHeadingLevel || 1,
    lowestHeadingLevel || 6,
  ]

  // Style settings
  const style = styles[customClass] || className

  // Mutate headings
  const matchedHeadings = extractHeadingsFromMd(
    removeCodeBlockFromMd(markdownText),
    headingLevels[0],
    headingLevels[1],
  )
  const headingObjects = matchedHeadings?.map((heading) =>
    newHeading(heading, limit, customMatchers),
  )
  // console.log(headingObjects)
  const nestedHeadingObjects = headingObjects?.reduce((acc, cur) => {
    if (cur.level === 1 || !acc.length) return [...acc, cur]
    const _prev = acc[acc.length - 1]
    const addChildToPrev = (prev) => {
      if (prev.level + 1 === cur.level) {
        prev.addChild(cur)
      } else {
        addChildToPrev(prev.children[prev.children.length - 1])  
      }
    }
    addChildToPrev(_prev)
    return acc
  }, [])
  // console.log("Nested", nestedHeadingObjects)
  const headingTags = nestedHeadingObjects?.map((heading) =>
    heading.generateList(),
  )

  if (!headingTags) return null

  return (
    <ul className={style}>
      {headingTags.map((heading, index) => (
        <React.Fragment key={index}>{heading}</React.Fragment>
      ))}
    </ul>
  )
}

export default Toc
