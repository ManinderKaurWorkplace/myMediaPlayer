import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import React, { Component } from "react";

import MenuBar from "../menu-bar/component";
import Audio from "../audio/component";
// import ImageView from "../images/component";
import Video from "../video/component";
import { styles } from "./styles";
import { Typography } from "@material-ui/core";

export class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null,
      audioFile: null,
      videoFile: null,
      tabIndex: 0
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleFileUpload = this.handleFileUpload.bind(this);
  }

  handleFileUpload(e, type) {
    const state = this.state;
    const fileUrl = state[type];
    if (!!fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }
    const newUrl = e.target.files[0];
    console.log(" your file is ", newUrl);
    this.setState({
      [type]: URL.createObjectURL(newUrl)
    });
  }

  handleOnChange(event, tabIndex) {
    this.setState({
      tabIndex
    });
  }

  renderLayout = () => {
    const { tabIndex, audioFile, videoFile } = this.state;
    let layout = null;
    switch (tabIndex) {
      case 0:
        // layout = <ImageView />;
        break;
      case 1:
        layout = <Audio onFileUpload={this.handleFileUpload} src={audioFile} />;
        break;
      case 2:
        layout = <Video onFileUpload={this.handleFileUpload} src={videoFile} />;
        break;
      default:
        layout = null;
    }
    return layout;
  };

  render() {
    const { tabIndex } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <MenuBar tabIndex={tabIndex} onChange={this.handleOnChange} />
        <Paper className={classes.root} elevation={1}>
          {this.renderLayout()}
          <Typography component="p" className={classes.footerNote}>
            {" "}
            Enjoy your day :){" "}
          </Typography>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(Layout);
