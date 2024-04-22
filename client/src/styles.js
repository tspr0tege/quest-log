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

export const Dashboard = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  paper: {
    bgcolor: '#191919',
    width: '50%',
    padding: '20px',
    pb: 0,
    flexGrow: 1
  },
  paperGrid: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: '20px'
  },
  controlsBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: '10px'
  },
  iconButton: {
    bgcolor:'primary.main'
  },
  rewardsGrid: {
    display: 'flex',
    gap: '25px'
  },
  rewardsBox: {
    height: '50px',
    bgcolor: '#333',
    width: '33%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionsMenuBox: {
    minWidth: '100px'
  }
};

export const NavBar = {
  toolbar: {
    justifyContent: 'flex-end'
  },
  toolbarBox: {
    display: 'flex', 
    flexGrow: 1
  },
  menuItem: { 
    py: '6px', 
    px: '12px' 
  },
};

export const ImageUpload = {
  ContainerBox: {
    width: '100%',
    minHeight: '200px',
    border: '2px dashed #090',
    borderRadius: '15px',
    bgcolor: '#00dd0021',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '5px',
    padding: '20px'
  },
  UploadButton: {
    width: '80%', 
    color: '#fff', 
    bgcolor: '#293'
  },
};

export const CreateProfile = {
  GridContainer: {
    height: '100vh', 
    pt: '48px',
  },
  InnerGrid: {
    margin: 'auto',
    padding: '40px',
  },
  ProfileForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
};

export const LandingPage = {
  Herobg: {
    background: 'radial-gradient(transparent, #212121 70%), url(https://i.ibb.co/VgHTkTg/bg-dark-torch.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor: (t) => t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  WelcomeGrid: {
    background: 'linear-gradient(to left, #000, #212121)'
  },
  WelcomeGridBox: {
    my: 8,
    mx: 4,
    width: '75%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50%',
    transform: 'translateY(-50%)',
    gap: '2em'
  }
};
