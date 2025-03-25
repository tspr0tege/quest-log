export const muiTheme = {
  fill: {
    backgroundColor: 'primary'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          color: '#eee',
          borderColor: '#eeeeee88',
          '&:hover': {
            borderColor: '#eeeeeedd',
            backgroundColor: '#ffffff22',
          },
        },
      },
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#5f3f1e',
      light: '#825b33',
      dark: '#41280e'
    }
  }
};

// #424549;
// #36393e;
// #282b30;
// #1e2124;
// #0e1113;



