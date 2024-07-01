const homeTeam = document.getElementById('home-team')
const awayTeam = document.getElementById('away-team')
const homeOdds = document.getElementById('home-odds')
const drawOdds = document.getElementById('draw-odds')
const awayOdds = document.getElementById('away-odds')
const nupp = document.getElementById('nupp')
const result = document.getElementById('result')
const errorSpan = document.getElementById('error')

function error(msg) {
  errorSpan.style.visibility = 'visible'
  errorSpan.innerHTML = msg
  result.style.visibility = 'hidden'
  setTimeout(() => {
    errorSpan.style.visibility = 'hidden'
  }, 3000)
}

function arvutaTulemus() {
  if (homeOdds.value.includes(',') || drawOdds.value.includes(',') || awayOdds.value.includes(',')) {
    error('Kasuta kümnendkoha eraldajana punkti')
    return
  } else if (isNaN(homeOdds.value)) {
    error('Sisesta kodumeeskonna koefitsiendiväljale arv')
    return
  } else if (isNaN(drawOdds.value)) {
    error('Sisesta viigi koefitsiendiväljale arv')
    return
  }
  if (isNaN(awayOdds.value)) {
    error('Sisesta külalismeeskonna koefitsiendiväljale arv')
    return
  } else if (homeOdds.value === '') {
    error('Sisesta kodumeeskonna koefitsient')
    return
  } else if (drawOdds.value === '') {
    error('Sisesta viigi koefitsient')
    return
  } else if (awayOdds.value === '') {
    error('Sisesta külalismeeskonna koefitsient')
    return
  } else if (homeTeam.value === '') {
    error('Sisesta kodumeeskonna nimi')
    return
  } else if (awayTeam.value === '') {
    error('Sisesta külalismeeskonna nimi')
    return
  } else {
    errorSpan.style.visibility = 'hidden'
    result.style.visibility = 'visible'
  }

  const home_prob = (1 / parseFloat(homeOdds.value)) * 100
  const draw_prob = (1 / parseFloat(drawOdds.value)) * 100
  const away_prob = (1 / parseFloat(awayOdds.value)) * 100
  const prots = home_prob + draw_prob + away_prob

  const home_corr = (home_prob / prots) * 100
  const draw_corr = (draw_prob / prots) * 100
  const randomNr = Math.random() * 101

  if (randomNr < home_corr) {
    result.innerHTML = homeTeam.value
  } else if (randomNr < home_corr + draw_corr) {
    result.innerHTML = 'viik'
  } else {
    result.innerHTML = awayTeam.value
  }
}

nupp.addEventListener('click', arvutaTulemus)
