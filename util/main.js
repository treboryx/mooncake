// const config = require('../config.json')

exports.bannedWords = ["kys", "hitler", "nazi", "kill your self", "kill yourself", "nigger", "nagger", "nigglet", "faggot", "benis", "fag", "anus", "anal", "blowjob", "blow job", "dyke", "dildo", "cock", "boner", "homo", "jizz", "nigga", "queer", "pussy", "scrotum", "slut", "aetheryx", "jews", "cummy", "niqquers", "penis", "gay", "nibba", "succ", "fucc", "ni🅱🅱a", "niqqa"];


exports.colors = {
  lightblue: "12054271",
  purple: "7869695",
  red: "16711680",
  green: "65280",
  blue: "255",
  black: "0",
  slate: "2500908",
  white: "16777215",
  yellow: "16250241",
  pink: "13849583"
};

exports.randomInArray = array => {
  return array[Math.floor(Math.random() * array.length)];
};
