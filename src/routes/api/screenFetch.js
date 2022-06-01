
// import { get } from 'https';

import fetch from 'node-fetch';

const getScreenShot = () =>
	new Promise( async (resolve) => {
        for(let i = 0; i < 5; i++){
            let code = "";
            var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        
            for (let j = 0; j < 6; j++) {
                code += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            let url = "https://prnt.sc/"+code

            try {
                const request = await fetch(url)
                const site = await request.text()

                const regex = /https:\/\/image.prntscr.com\/image\/[a-zA-Z0-9-_]+.png/g
                let link = site.match(regex)
                if(!link) continue
                link = link[0]
                console.log(link)

                const test = await fetch(link)
                if(test.status != 200) continue
                return resolve({imageLink: link, link: url})
            } catch (error) {
                console.log(error)
            }
        }

        resolve({imageLink: "https://cdn.discordapp.com/attachments/806282416364585062/981488018756083742/rickroll-roll.gif", link: "https://cdn.discordapp.com/attachments/806282416364585062/981488018756083742/rickroll-roll.gif"})
	});

/**
 * @type {import("@sveltejs/kit").RequestHandler}
 */
export const post = async ({ request }) => {
	return {
		body: await getScreenShot()
	};
};
