const model = require('../models/trade');
const { DateTime } = require("luxon");

exports.index = (req, res) => {
    let trades = model.find();
    let categories = model.categories();
    res.render('./trade/index',{trades, categories});
};

exports.new = (req, res) => {
    res.render('./trade/new');
};

exports.create = (req, res) => {
    let trade = req.body;
    model.save(trade);
    res.redirect('/trades');
};

exports.show = (req, res, next) => {
    let id = req.params.id;
    let findtrade = model.findById(id);
    if(findtrade){
        let trade = Object.assign({}, findtrade);
        trade.date = DateTime.fromSQL(trade.date).toFormat('LLLL dd, yyyy');
        trade.startTime = DateTime.fromSQL(trade.startTime).toFormat('hh:mm a');
        trade.endTime = DateTime.fromSQL(trade.endTime).toFormat('hh:mm a');
        res.render('./trade/show',{trade});
    }else{
        let err = new Error('Cannot find trade with id '+id);
        err.status = 404;
        next(err);
    }
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    let trade = model.findById(id);
    if(trade){
        res.render('./trade/edit',{trade});
    }else{
        let err = new Error('Cannot find trade with id '+id);
        err.status = 404;
        next(err);
    }
};

exports.update = (req, res, next) => {
    let id = req.params.id;
    let trade = req.body;
    if(model.updateById(id, trade)){
        res.redirect('/trades/'+id);
    }else{
        let err = new Error('Cannot find trade with id '+id);
        err.status = 404;
        next(err);
    }
};

exports.delete = (req, res, next) => {
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/trades');
    }else{
        let err = new Error('Cannot find trade with id '+id);
        err.status = 404;
        next(err);
    } 
};