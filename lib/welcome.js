const TextWelcome = (a) => {
return `[ *WELCOME* ]
Halo Kak @${a}👋, Selamat Datang!, Jangan lupa intro Yah!`
}
const TextOut = (a) => {
return `[ *GOODBYE* ]
Selamat tinggal @${a}👋, Jangan balik lagi yaa!`
}

module.exports = { TextWelcome, TextOut  }