// This is the main javascript configs file

const server = {
  URL: "http://127.0.0.1:5000",
  routes: {},
};

// routez for the server
server.routes = {
  thismonth: server.URL + "/thismonth",
  contributors: server.URL + "/contributors",
  checkUser: server.URL + "/check/username",
};

export { server };
