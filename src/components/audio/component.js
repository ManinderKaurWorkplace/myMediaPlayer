import { withStyles } from "@material-ui/core/styles";
import React, { Fragment } from "react";
import Card from "@material-ui/core/Card";

import { styles } from "./styles";

export const Audio = props => {
  const { classes, src, onFileUpload } = props;

  return (
    <Fragment>
      <Card className={classes.inputCard}>
        <input
          type="file"
          id="audio"
          onChange={e => onFileUpload(e, "audioFile")}
          accept=".wav, .mp3, .au .ogg"
        />
      </Card>
      <Card className={classes.audioCard}>
        <audio src={src} autoPlay controls />
      </Card>
    </Fragment>
  );
};

export default withStyles(styles)(Audio);
