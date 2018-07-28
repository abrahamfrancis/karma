const express = require('express');

const router = express.Router();
const methods = require('data/methods');

router.get('/', (req, res) => {
  methods.media.mediaMethods.getAllMedia()
    .then((classes) => {
      res.json({
        status: 'success',
        classes,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'error',
        error: err.message,
      });
    });
});

router.post('/', (req, res) => {
  const info = {};

  info.media_id = req.body.mediaId;
  info.role_id = req.body.roleId;
  info.people_id = req.body.peopleId;


  methods.media.mediaMethods
    .addMedia(info)
    .then((model) => {
      res.json(model);
    })
    .catch((err) => {
      res.json({
        status: 'error',
        error: err,
      });
    });
});

router.put('/:id', (req, res) => {
  const info = {};
  const data = {};

  info.id = req.params.id; // key values for finding row

  if (Object.prototype.hasOwnProperty.call(req.body, 'mediaId') && Object
    .prototype.hasOwnProperty.call(req.body, 'peopleId') && Object.prototype
    .hasOwnProperty.call(req.body, 'roleId')) {
    data.media_id = req.body.mediaId;
    data.people_id = req.body.peopleId;
    data.role_id = req.body.roleId;
  }

  methods.media.mediaMethods.updateMedia(info, data)
    .then((model) => {
      res.status(200).json({
        status: 'updated',
        state: model[0],
      });
    })
    .catch((err) => {
      res.send({
        status: 'Not able to update.Row maynot exist',
        state: err,
      });
    });
});


router.delete('/', (req, res) => {
  const info = {};
  info.id = req.body.id;

  methods.media.mediaMethods.deleteMedia(info)
    .then((model) => {
      res.status(200).json({
        status: 'Time table deleted',
        state: model,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: 'Not able to delete.The row may not exist.',
        state: err,
      });
    });
});


module.exports = router;
