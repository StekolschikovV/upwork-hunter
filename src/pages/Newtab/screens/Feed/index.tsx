import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { useRootStore } from "../../../providers/RootStoreProvider";
import Btn from "../../components/Btn";
import ControlsContainer from "../../components/ControlsContainer";
import Job from "../../components/Job";
import LeftTime from "../../components/LeftTime";

const Feed = observer(() => {

  const store = useRootStore()

  return (<>
    <ControlsContainer>
      {/* <SVG type='sort' onClickHandler={() => console.log("123")} cursorPointer={true} /> */}
      <LeftTime />
      <Btn title="Refresh" onClick={e => store.feedStore.getJobs()} />
    </ControlsContainer>
    {store.feedStore.feed.map(e => <Job job={e} key={e.date + e.title} />)}
  </>);
})

export default Feed;
