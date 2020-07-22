export const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    height: "90vh",
    background: "#00bcff0d"
  },
  footerNote: {
    marginTop: 50,
    width: 200,
    height: 27,
    padding: 10,
    background: "orange",
    borderRadius: "19px",
    textAlign: "center"
  }
});
