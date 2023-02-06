class SyncData {

  async send(data) {
    try {
      const response = await fetch('http://localhost:3000/todo/save', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch(err) {
      console.error(err);
    }
  };

  /*
  It was hard implementing it.
   */
  async get() {
    const response = await fetch('http://localhost:3000/todo/todo.json', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
   const data = await response.json;
   return data;
  };
}

export {SyncData};
/*
require and module exports doesn't work in browser, need to be import and export!!!
 */
//
// const response = await fetch('/todo.json');
// const data = await response.json();
// return data;