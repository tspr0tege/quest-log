// import { useNavigate } from 'react-router-dom';
let navigate;

export const setNavigationService = (navObject) => {
  // console.log("Updating navigate object with: ", navObject )
  navigate = navObject
};

export const navigateTo = (path) => {
  if (navigate) {
    navigate(path);
  } else {
    console.warn('Navigation not initialized.');
  }
};