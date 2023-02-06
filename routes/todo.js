const express = require('express');
const todoRouter = express.Router();
const {readFile, writeFile} = require('fs').promises;

// the function below is used to resolve a problem with deleted todo.json file
(async () => {
  try {
    const todoJSON = await readFile('./todo.json', 'utf-8');
  } catch (err) {
    await writeFile('./todo.json', '[{"task": "First task", "completed": false}]', 'utf-8');
  }

})();

todoRouter
  .get('/', async (req, res) => {
    const data = await readFile('./todo.json', 'utf-8');
    const dataArr = JSON.parse(data);
    const dataPendingLength = `(${dataArr.filter((obj => obj.completed === false)).length})`;
    const dataCompletedLength = `(${dataArr.filter((obj => obj.completed === true)).length})`;

    res
      .render('todo', {
        dataArr: dataArr,
        dataArrLength: dataArr.length,
        dataPendingLength: dataPendingLength,
        dataCompletedLength: dataCompletedLength,
      })
  })
  .get('/completed', async (req, res) => {
    const data = await readFile('./todo.json', 'utf-8');
    const dataArr = JSON.parse(data);
    const dataCompleted = dataArr.filter((obj => obj.completed === true));
    res.render('')
  })
  .get('/todo.json', async (req, res) => {
    const data = await readFile('./todo.json', 'utf-8');
    res.json(data);
  })
  .post('/save', async (req, res) => {
    writeFile('./todo.json', JSON.stringify(req.body));
    res.end();
  })
  .delete('/', async (req, res) => {
    const data = await readFile('./todo.json', 'utf-8');
    const dataArr = JSON.parse(data);
    const {id} = req.body;
    dataArr.splice(id, 1)
    await writeFile('./todo.json', JSON.stringify(dataArr));
    res.end();
  })
  .delete('/delete-all', async (req, res) => {
    const data = await readFile('./todo.json', 'utf-8');
    const dataArr = JSON.parse(data);
    await writeFile('./todo.json', '[{"task": "First task", "completed": false}]', 'utf-8');
    res.end();
  });


module.exports = {
  todoRouter,
};

