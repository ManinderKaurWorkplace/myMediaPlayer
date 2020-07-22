import { withStyles } from "@material-ui/core/styles";
import React from "react";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { styles } from "./styles";

export const MenuBar = props => {
  const { onChange, tabIndex, classes } = props;
  return (
    <div className={classes.root}>
      <Tabs value={tabIndex} onChange={onChange}>
        <Tab label="Images" className={classes.tabStyle} />
        <Tab label="Audios" className={classes.tabStyle} />
        <Tab label="Videos" className={classes.tabStyle} />
        <Tab label="Feedback" className={classes.tabStyle} />
      </Tabs>
    </div>
  );
};

export default withStyles(styles)(MenuBar);
