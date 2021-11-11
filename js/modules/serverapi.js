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

const announcementSender = (onSuccess, onFail, body) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {announcementsLoader, announcementSender};
