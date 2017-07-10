const get_data = require('./get_data');

get_data('01/01/2017', '15/01/2017', 'T0058', 'T0058').then((res)=>{console.log(res);});