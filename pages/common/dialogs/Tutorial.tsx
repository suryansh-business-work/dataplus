// Core Modules
import type { NextPage } from 'next'
import Head from 'next/head'
import { Image } from 'primereact/image';
import { TabView, TabPanel } from 'primereact/tabview';
import { useRouter } from 'next/router'
import { SecurePaths, pathNameFn } from '../../data/paths'
import { TutorialData } from '../../data/tutorialData'
import { useEffect, useState } from 'react';
import { Button } from 'primereact/button';

const Tutorial: NextPage = () => {
  const router = useRouter()
  const activeIndexURL = TutorialData.findIndex((value: any) => value.url == router.pathname)
  const [activeTutorial, setActiveTutorial] = useState(activeIndexURL);

  useEffect(() => {
    console.log(activeTutorial)
  }, [activeTutorial])

  return (
    <div className='tutorial-popup'>
      {activeTutorial == -1 ? <div className='no-tutorial-found'>
        <h3>No tutorial found for current URL</h3>
        <Button label="Move to all tutorial" onClick={() => setActiveTutorial(0)}/>
      </div> : <TabView activeIndex={activeTutorial} onTabChange={(e) => setActiveTutorial(e.index)}>
        {TutorialData.map((tutorial: any, index: any) => {
          return (
            <TabPanel key={index} header={tutorial.title}>
              <div className='tutorial-body-wrapper'>
                <Image src={tutorial.image} alt={tutorial.title} width="600" preview downloadable />
                <p>{tutorial.description}</p>
              </div>
            </TabPanel>
          )
        })}
      </TabView>}
    </div>
  )
}

export default Tutorial
