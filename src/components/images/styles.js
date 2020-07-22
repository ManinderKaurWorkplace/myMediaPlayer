export const styles = theme => ({
  inputCard: {
    width: 300,
    padding: 10,
    marginBottom: 10
  },
  imageCard: {
    width: 500,
    height: 400
  },
  gridView: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    height: 450
  },
  loader: {
    color: "#ff7915",
    fontSize: "90px",
    textIndent: "-9999em",
    overflow: "hidden",
    width: "1em",
    height: "1em",
    borderRadius: "50%",
    margin: "72px auto",
    position: "relative",
    // "-webkitTransform": "translateZ(0)",
    // "-msTransform": "translateZ(0)",
    transform: "translateZ(0)",
    // "-webkitAnimation": "load6 1.7s infinite ease, round 1.7s infinite ease",
    animation: "load6 1.7s infinite ease, round 1.7s infinite ease"
  }
});
