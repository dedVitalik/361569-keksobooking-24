const announcementsLoader = () => fetch(
  'https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`${response.status} ${response.statusText}`);
    }
  });
  // .then((announcements) => {
  //   onSuccess(announcements);
  // })
  // .catch((err) => {
  //   onError(err);
  // });

export {announcementsLoader};
