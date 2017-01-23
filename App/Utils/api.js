export default {
  getBio(username) {
    username = username.toLowerCase().trim();
    const url = `https://api.github.com/users/${username}`;
    return fetch(url).then((res) => {
      console.log('res:', res);

      return res.json();
    });
  },

  getRepos(username) {
    username = username.toLowerCase().trim();
    const url = `https://api.github.com/users/${username}/repos`;
    return fetch(url).then((res) => res.json());
  },

  getNotes(username) {
    username = username.toLowerCase().trim();
    const url = `https://native-gh-notetaker.firebaseio.com/${username}.json`;
    return fetch(url).then((res) => {
      console.log(res);
      return res.json()
    })
  },

  addNote(username, note) {
    username = username.toLowerCase().trim();
    const url = `https://native-gh-notetaker.firebaseio.com/${username}.json`;
    return fetch(url, {
      method: 'post',
      body: JSON.stringify(note)
    }).then((res) => res.json());
  },

  // removeNote(username) {
  //   const url = `https://native-gh-notetaker-19a9f.firebaseio.com/${username}.json`;
  //   return fetch(url, {
  //     method: 'delete',
  //   }).then((res) => {
  //     console.log(res);
  //     return res.json()
  //   });
  // }
}
