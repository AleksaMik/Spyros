const router = require ('express').Router();
const usersRoutes = require ('./userRoutes');
const thoughtsRoutes = require ('./thoughtsRoutes');

router.use ('/users', usersRoutes);
router.use ('/thoughts', thoughtsRoutes);

module.export = router;