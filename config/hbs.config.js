const hbs = require('hbs');
require('mongoose');

hbs.registerPartials('./views/partials');

hbs.registerHelper('partyTypeMusic', function (options) {
    const { party, musicType } = options.hash;
  
    if (party && party.musicTypes.includes(musicType)) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }
  })
  
hbs.registerHelper('dateHelper', function (val) {
    const { date } = val.hash;

    let dateParsed = new Date(date)
    let months = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre ',
    ]
    let month = months[dateParsed.getMonth()]
    return `${dateParsed.getDate()} de ${month} de ${dateParsed.getFullYear()}`
})

hbs.registerHelper('eachCarrusell', function (arr, options) {
  console.log(options)
  let newArr = arr.reduce((acc, el, index) => {
    let chunkIndex = Math.floor(index/3)
    if(!acc[chunkIndex]) {
      acc[chunkIndex] = []
    }
    
    acc[chunkIndex].push(el)
    return acc
  }, []).map((el, i) => {
    return options.fn(el)
  })

  return newArr.join('')
})

hbs.registerHelper('userLikedParty', function (options) {
  console.log(options.hash);
  const { currentUserId, likes } = options.hash;
  if (currentUserId && likes && likes.some(like => like.user.equals(currentUserId))) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})



hbs.registerHelper('ifExistManager', function (options) {
  const { partyOwnerId, managerId } = options.hash;
  if (partyOwnerId && managerId && partyOwnerId==partyId) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})


hbs.registerHelper('ifManagerTrue', function (options) {
const { manager } = options.hash;
if (manager && manager === 'true') {
  return options.fn(this);
} else {
  return options.inverse(this);
}
})


// check if the user key "dueño" has "off" value
hbs.registerHelper('ifManagerOff', function (options) {
const { manager } = options.hash;
if (manager && manager === 'nope') {
  return options.fn(this);
} else {
  return options.inverse(this);
}
})







  

