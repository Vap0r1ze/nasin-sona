[Greasemonkey]: https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/
[Tampermonkey]: https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo
[Latest Userscript]: https://github.com/Vap0r1ze/nasin-sona/releases/latest/download/NasinSona.user.js
[Releases Page]: https://github.com/Vap0r1ze/nasin-sona/releases

[nimi.li]: https://nimi.li/
[Lipu Linku]: https://linku.la/

[pnpm]: https://pnpm.io/
[node]: https://nodejs.org/

# Nasin Sona: o alasa e nimi
<p align="center">
  <image alt="Nasin Sona Definitions" src="https://user-images.githubusercontent.com/20448879/211380304-24d6265f-e22e-4e49-8b5b-88267e2385fc.png" />
</p>
toki! mi wile sona pona e toki pona la mi pali e ilo ni!

o sona pona kepeken ilo ni <3

## Installation

You will need either [Tampermonkey] (for Chrome/Chromium users) or the [Greasemonkey] (for Firefox users).
These are extensions that allow you to install userscripts.

After installed, you can open the [latest userscript] and you should see an install page.
You can also always find the latest version of the userscript in the [Releases page], ~~the userscript should automatically update though~~. The userscript doesn't update at the moment, I need to find out how to make that work.

## Usage

Double click an any toki pona word to open the word hint. Click anywhere that isnt a word to close it.

<p align="center">
  <video alt="Showcasing Nasin Sona" src="https://user-images.githubusercontent.com/20448879/211373089-9d27514e-7a1b-4003-bc95-83f526194135.mp4" />
</p>

# Contributing

Pull requests are very welcome!

You'll need [pnpm] v17 and at least [Node] v16. Running `pnpm i` will install dependency and fetch the [lipu linku] dataset for you.

Afterwards, running `pnpm dev` should create a development userscript for you to install (__the one that ends with `.dev.user.js`__). Make sure this is the only nasin pona userscript you have enabled when developing. It will rebuild every file-change, and you can refresh whatever page you're on to reload it.

## Credits

Thanks to waso Wen for helping me name this project, and to kon Deni for helping me with the tagline "o alasa e nimi"

Thanks to jan Tani for making [nimi.li] and to [Lipu Linku] for hosting a public database for definitions and such
