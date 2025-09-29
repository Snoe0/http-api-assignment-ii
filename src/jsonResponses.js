const users = {};

const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required',
  };

  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(responseJSON));
    response.end();
    return;
  }

  let responseCode = 201;

  if (users[body.name]) {
    responseCode = 204;
  } else {
    users[body.name] = {};
  }

  users[body.name].name = body.name;
  users[body.name].age = body.age;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    response.writeHead(responseCode, { 'Content-Type': 'application/json' });
    response.write(JSON.stringify(responseJSON));
    response.end();
  } else {
    response.writeHead(responseCode);
    response.end();
  }
};

const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(responseJSON));
  response.end();
};

const getNotFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(responseJSON));
  response.end();
};

module.exports.getUsers = getUsers;
module.exports.addUser = addUser;
module.exports.getNotFound = getNotFound;
