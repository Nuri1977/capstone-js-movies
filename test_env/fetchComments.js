const fetchComments = (id) => {
  if (id === 23051) {
    return [{
      comment: 'Ocean Warriors movie is the best',
      creation_date: '2022-02-01',
      username: 'Angel',
    },
    {
      comment: 'This is a great movie',
      creation_date: '2022-02-02',
      username: 'Nuri',
    }];
  } if (id === 19558) {
    return undefined;
  } if (id === 13263) {
    return [{
      comment: 'Ocean Warriors movie is the best',
      creation_date: '2022-02-01',
      username: 'Angel',
    },
    {
      comment: 'This is a great movie',
      creation_date: '2022-02-02',
      username: 'Nuri',
    },
    {
      comment: 'Im going to watch it again',
      creation_date: '2022-02-02',
      username: 'Carlos',
    }];
  }
  return true;
};

export default fetchComments;