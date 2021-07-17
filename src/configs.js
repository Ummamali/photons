// This is the main javascript configs file

const server = {
  // URL: "http://127.0.0.1:5000",
  URL: "http://192.168.10.15:5000",
  routes: {},
};

// routez for the server
const routes = {
  recents: "/recents",
  thismonth: "/thismonth",
  contributors: "/contributors",
  checkUser: "/check/username",
  newContribution: "/new/contribution",
  newContributor: "/new/contributor",
};
server.routes = routes;

function joinURL(routePath) {
  return server.URL + routePath;
}

export { server, joinURL, routes };
