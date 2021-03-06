const baseURL = "https://bamboo-u-backend.herokuapp.com";
const versionURL = `${baseURL}/api/v1`;
const usersURL = `${versionURL}/users`;
const wbgURL = `${versionURL}/wb_goals`;
const wmgURL = `${versionURL}/wm_goals`;
const userWBGURL = `${versionURL}/user_wb_goals`;
const userWMGURL = `${versionURL}/user_wm_goals`;
const userDBGURL = `${versionURL}/user_db_goals`;
const userDMGURL = `${versionURL}/user_dm_goals`;

const fetchUser = () => {
  return fetch(usersURL).then(resp => resp.json());
};

const postUser = user => {
  return fetch(usersURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  }).then(resp => resp.json());
};

const fetchAllWBGs = () => {
  return fetch(wbgURL).then(resp => resp.json());
};
const fetchAllWMGs = () => {
  return fetch(wmgURL).then(resp => resp.json());
};

const postUserWMG = goal => {
  return fetch(userWMGURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal)
  }).then(resp => resp.json());
};

const fetchUserWMG = id => {
  return fetch(`${userWMGURL}/${id}`).then(resp => resp.json());
};

const updateUserWMG = goal => {
  const newGoal = { complete: true };
  return fetch(`${userWMGURL}/${goal.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newGoal)
  }).then(resp => resp.json());
};

const postUserWBG = goal => {
  return fetch(userWBGURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal)
  }).then(resp => resp.json());
};

const fetchUserWBG = id => {
  return fetch(`${userWBGURL}/${id}`).then(resp => resp.json());
};

const updateUserWBG = goal => {
  const newGoal = { complete: true };
  return fetch(`${userWBGURL}/${goal.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newGoal)
  }).then(resp => resp.json());
};

const postUserDMG = goal => {
  return fetch(userDMGURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal)
  }).then(resp => resp.json());
};

const postUserDBG = goal => {
  return fetch(userDBGURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(goal)
  }).then(resp => resp.json());
};

const updateUserDMG = goal => {
  const newGoal = { complete: true };
  return fetch(`${userDMGURL}/${goal.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newGoal)
  }).then(resp => resp.json());
};

const updateUserDBG = (goal, time) => {
  const newGoal = { complete: true, time: time };
  return fetch(`${userDBGURL}/${goal.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newGoal)
  }).then(resp => resp.json(newGoal));
};

const deleteUserWBG = goal => {
  return fetch(`${userWBGURL}/${goal.id}`, {
    method: "DELETE"
  });
};

const deleteUserWMG = goal => {
  return fetch(`${userWMGURL}/${goal.id}`, {
    method: "DELETE"
  });
};

const deleteUserDBG = goal => {
  return fetch(`${userDBGURL}/${goal.id}`, { method: "DELETE" });
};

const deleteUserDMG = goal => {
  return fetch(`${userDMGURL}/${goal.id}`, { method: "DELETE" });
};

export default {
  fetchUser,

  postUser,

  fetchAllWBGs,
  fetchAllWMGs,

  postUserWMG,
  fetchUserWMG,
  updateUserWMG,
  deleteUserWMG,

  postUserWBG,
  fetchUserWBG,
  updateUserWBG,
  deleteUserWBG,

  postUserDMG,
  postUserDBG,

  updateUserDMG,
  updateUserDBG,

  deleteUserDMG,
  deleteUserDBG
};
