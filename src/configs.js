// This is the main javascript configs file

const server = {
  URL: "http://127.0.0.1:5000",
  routes: {},
};

// routez for the server
server.routes = {
  thismonth: "/thismonth",
  contributors: "/contributors",
  checkUser: "/check/username",
  newContribution: "/new/contribution",
};

function joinURL(routePath) {
  return server.URL + routePath;
}

export { server, joinURL };
