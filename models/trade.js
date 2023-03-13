const { DateTime } = require("luxon");
const { v4: uuidv4 } = require('uuid');
const categories = ['consoles','others'];
const trades = [
    {
        id:'1',
        name:'Playstation 5',
        topic:'consoles',
        details:'sodales tincidunt ipsum pellentesque vitae. Phasellus finibus aliquet metus vitae fringilla',
        hostname:'Anna',
        location: 'Woodward',
        date:'2023-08-13',
        startTime:'05:15',
        endTime:'06:15',
        //image:'https://thumbs.dreamstime.com/z/cartoon-cyclist-vector-illustration-37069887.jpg',
        createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id:'2',
        name:'Playstation 4',
        topic:'consoles',
        details:'Vivamus luctus enim sed fermentum feugiat. Maecenas fermentum pulvinar arcu nec sollicitudin. Donec faucibus neque sit amet lorem pharetra auctor',
        hostname:'Tim',
        location: 'Woodward',
        date:'2023-10-08',
        startTime:'11:30',
        endTime:'12:00',
        //image:'https://thumbs.dreamstime.com/z/business-team-group-riding-tandem-bike-together-concept-vector-illustration-sport-race-teamwork-flat-cartoon-style-169849137.jpg',
        createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id:'3',
        name:'Playstation 3',
        topic:'Consoles',
        details:'Ut pulvinar lacinia massa quis luctus. Sed nec massa ac leo posuere blandit in sed ante. Donec dictum elit mollis egestas placerat.',
        hostname:'Ben',
        location: 'Woodward',
        date:'2023-12-16',
        startTime:'13:15',
        endTime:'13:45',
        //image:'https://thumbs.dreamstime.com/z/cycling-race-front-view-neon-illustration-vector-86861004.jpg',
        createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id:'4',
        name:'God Of War',
        topic:'others',
        details:', sit amet viverra ligula pellentesque feugiat. Proin venenatis magna quis semper aliquam.',
        hostname:'can',
        location: 'Woodward',
        date:'2023-01-12',
        startTime:'18:00',
        endTime:'18:30',
        //image:'https://c7.alamy.com/comp/E59K2F/group-of-people-sitting-around-camp-fire-mexico-E59K2F.jpg',
        createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id:'5',
        name:'God of War 2',
        topic:'Others',
        details:'purus augue viverra tellus, at fermentum turpis turpis sed ligula. Nullam tempus interdum dolor, eu accumsan ipsum viverra facilisis.',
        hostname:'max',
        location: 'Woodward',
        date:'2022-07-10',
        startTime:'20:15',
        endTime:'21:15',
       // image:'https://t3.ftcdn.net/jpg/02/19/55/54/240_F_219555445_eKS5ZdDUN64vOmnZLWuDKIGFEx8opmgK.jpg',
        createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    },
    {
        id:'6',
        name:'God Of war 3',
        topic:'Others',
        details:'In hac habitasse platea dictumst. Quisque ornare justo eget rhoncus feugiat.',
        hostname:'Ashish',
        location: 'Woodward', 
        date:'2023-02-15',
        startTime:'08:15',
        endTime:'08:45',
        //image:'https://t4.ftcdn.net/jpg/01/64/29/59/240_F_164295991_riocsWZidvQgXz4vWeU3YvYOj1b7bF4I.jpg',
        createdAt:DateTime.now().toLocaleString(DateTime.DATETIME_SHORT)
    }
];

exports.categories = () => categories;

exports.find = () => trades;

exports.findById = id => trades.find(trade => trade.id === id);

exports.save = function (trade) {
    trade.id = uuidv4();
    trade.createdAt=DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
    if(categories.indexOf(trade.topic) === -1){
        categories.push(trade.topic);
    }
    trades.push(trade);
};

exports.updateById = function (id, newtrade) {
    let trade = this.findById(id);
    if(trade){
        if(categories.indexOf(newtrade.topic) === -1){
            categories.push(newtrade.topic);
        }
        trade.name = newtrade.name;
        trade.topic = newtrade.topic;
        trade.details = newtrade.details;
        trade.hostname = newtrade.hostname;
        trade.location = newtrade.location;
        trade.date = newtrade.date;
        trade.startTime = newtrade.startTime;
        trade.endTime = newtrade.endTime;
        trade.image = newtrade.image;

        categories.forEach(category => { 
            if(!trades.some(trade => trade.topic === category)){
                let categoryIndex = categories.indexOf(category);
                if(categoryIndex !== -1){
                    categories.splice(categoryIndex, 1);
                }
            }
        }); 
        

        return true;
    }else {
        return false;
    }
};

exports.deleteById = function (id) {
    let index = trades.findIndex(trade => trade.id === id);
    if(index !== -1){
        let deletedtrade = trades.splice(index,1);
        if(!trades.some(trade => trade.topic === deletedtrade[0].topic)){
            let categoryIndex = categories.indexOf(deletedtrade[0].topic);
            if(categoryIndex !== -1){
                categories.splice(categoryIndex, 1);
            }
        }
        return true;
    }else {
        return false;
    }
};  