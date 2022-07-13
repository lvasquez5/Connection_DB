const express = require('express');
const bcryptjs = require('bcryptjs');
const router = express.Router();
const userSchema = require('../models/users');
const { request, response } = require('express');

/* Create-Read-Update-Delete */
// Create
router.post('/users', async (request, response) => {
  try {
    const hash = await bcryptjs.hash(request.body.password, 8);
  //response.send('crear usuario...');
  //console.log(request.body);
    const newUser = userSchema({...request.body, password: hash});
  /*
  Promesa:
  1. Pendiente
  2. Si cumplió => then
  3. No cumplió => catch
  */
  newUser
    .save()
    .then((data) => {
      response.json({ success: data });
    })
    .catch((error) => {
      response.json({ failured: error });
    });
  } catch (error) {
    response.json({failured: error})
  }
});
// Read
router.get('/users', (request, response) => {
  //response.send('Leer todos los usuarios...');
  userSchema
    .find()
    .then((data) => {
      response.json({ success: data });
    })
    .catch((error) => {
      response.json({ failured: error });
    });
});
router.get('/users/:id', (request, response) => {
  //response.send('Leer un usuario específico.');
  const { id } = request.params;
  userSchema
    .findById(id)
    .then((data) => {
      response.json({ success: data });
    })
    .catch((error) => {
      response.json({ failured: error });
    });
});
// Update
router.put('/users/:id', async (request, response) => {
  //response.send('Actualizar un usuario específico.');
  const { id } = request.params;
  console.log('id:', id);
  const hash = await bcryptjs.hash(request.body.password, 10);
  const user = {...request.body, password: hash};
  console.log('user:', user);
  userSchema
    .updateOne({ _id: id }, { $set: user })
    .then((data) => {
      response.json({ success: data });
    })
    .catch((error) => {
      response.json({ failured: error });
    });
});
// Delete
router.delete('/users/:id', (request, response) => {
  //response.send('Eliminar un usuario específico.');
  const { id } = request.params;
  userSchema
    .deleteOne({ _id: id })
    .then((data) => {
      response.json({ success: data });
    })
    .catch((error) => {
      response.json({ failured: error });
    });
});
// Login
router.post('/login'.(request, response)=>{
  try {
    console.log(request.body);
    const user = userSchema.findOne({
      email: request.body.email
    })
  } catch (error) {
    response.json({failured: error});
  }
})

module.exports = router;

