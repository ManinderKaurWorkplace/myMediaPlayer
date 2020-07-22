import { withStyles } from "@material-ui/core/styles";
import React, { Fragment } from "react";
import Card from "@material-ui/core/Card";

import { styles } from "./styles";

export const Video = props => {
  const { classes, src, onFileUpload } = props;
  return (
    <Fragment>
      <Card className={classes.inputCard}>
        <input
          type="file"
          id="video"
          onChange={e => onFileUpload(e, "videoFile")}
          accept=".wmv, .mp4, .avi .asf"
        />
      </Card>

      <Card className={classes.videoCard}>
        <video src={src} controls autoPlay className={classes.videoCard} />
      </Card>
    </Fragment>
  );
};

export default withStyles(styles)(Video);
