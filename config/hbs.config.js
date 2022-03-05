const hbs = require('hbs');

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
  // let results = []
  // for (let i = 0; i < newArr.length; i++){
  //   results.push(options.fn(newArr[i]));
  // }
  return newArr.join('')
})
