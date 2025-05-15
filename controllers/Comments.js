const  Comments  = require('../models/Comments');
const User = require('../models/User');

module.exports = class CommentsController {

    static async createComment(req, res) {
        
        const users = await User.findAll({raw: true});
        res.render('comments/createComment', { users });
    }
    static async createCommentPost(req, res) {
        const { title, comment, id} = req.body;
        const date = new Date();

        try {
            await Comments.create({
                title,
                comment,
                date,
                UserId: id
            });
            res.redirect('/')
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}

