function miliseconds(hrs, min, sec) {
  return (hrs * 60 * 60 + min * 60 + sec) * 1000;
}

const myObject = {
  JWT_SECRET: "codedmoded",
  JWT_EXPIRATION_MS: miliseconds(2, 0, 0),
};

module.exports = myObject;
