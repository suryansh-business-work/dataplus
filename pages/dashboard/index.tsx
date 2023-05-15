// Core Module
import type { NextPage } from 'next'

// 3rd Party Module
import GridLayout from "react-grid-layout";

// Components
import HeadingWithBreadcrumb from '../common/components/heading-with-breadcrumb'
import Header from '../common/Header'

const Registry: NextPage = () => {
  const layout = [
    { i: "a", x: 0, y: 0, w: 4, h: 2 },
    { i: "b", x: 4, y: 4, w: 4, h: 2 },
    { i: "c", x: 0, y: 4, w: 4, h: 2 },
    { i: "d", x: 0, y: 4, w: 4, h: 2 },
    { i: "e", x: 8, y: 4, w: 4, h: 2 },
    { i: "f", x: 4, y: 4, w: 4, h: 2 },
    { i: "g", x: 8, y: 4, w: 4, h: 2 }
  ]

  return (
    <div className='root'>
      <Header />
      <HeadingWithBreadcrumb />
      <GridLayout
        className="layout"
        layout={layout}
        cols={12}
        rowHeight={100}
        width={1900}
      >
        <div key="a">a</div>
        <div key="b">b</div>
        <div key="c">c</div>
        <div key="d">a</div>
        <div key="e">b</div>
        <div key="f">c</div>
        <div key="g">c</div>
      </GridLayout>
    </div>
  )
}

export default Registry
