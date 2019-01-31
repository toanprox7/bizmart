export const checkAuthenticate = (authen) => {
  return {
    type: "CHECK_AUTHENTICATE",
    authen
  }
};

export const checkProcess = (process) => {
  return {
    type: "CHECK_PROCESS_BAR",
    process
  }
};

