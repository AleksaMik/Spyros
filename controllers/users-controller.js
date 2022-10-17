const {Users} = require ('../models');
const usersController = {
    createUsers({body}, res) {
        Users.create(body)
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err=> res.status(400).json(err));
    },

    getAllUsers(req, res) {
        Users.find({})
        .populate({path: 'thoughts', select: '-__v'})
        .populate({path:'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => res.json(dbUsersData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    getUsersById({params},res) {
        Users.findONe({_id:params.id})
        populate ({path: 'friends', select: '-__v'})
        populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'This user is not found!'});
                return;
            }
            res.json(dbUsersData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        })
    },

    updateUsers({params,body},res) {
        Users.findONeAndUpdate({_id:params.id}, body, {new:
        true,runValidators:true})
        .then(dbUsersData => {
            if(!dbUsersData) {
                res.status(404).json({message: 'This user is not found!'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.status (400).json(err))
    },
    addFriend({params}, res) {
        Users.findONeAndUpdate({_id: params.id},{$push: {
            friends:params.friendsId}}, {new:true})
            .populate({path: 'friends',select: ('-__v')})
            .select('-__v')
            .then(dbUsersData =>  {
                if(!dbUsersData) {
                res.status(404).json({message:'This user is not found!'});
                return;
            }
            res.json(dbUsersData);
        })
        .catch(err => res.json(err));
        },

        deleteFriend({params}, res) {
            Users.findONeAndUpdate({_id:params.id}, {$pull: {
                friends:params.friendId}}, {new:true})
                .populate({path:'friends', selects: '-__v'})
                .select('-__v')
                .then(dbUsersData => {
                    if(!dbUsersData) {
                        res.status(404).json({message:'This user is not found'});
                        return;
                    }
                    res.json(dbUsersData);
                })
                .catch(err => res.status(400).json(err));
            }
        };

        module.export = usersController;