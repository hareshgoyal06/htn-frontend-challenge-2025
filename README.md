# Overview 

This is a retro 8-bit implementation of the 2025 HTN Frontend Challenge. This hackathon was branded a generic hackathon through the "Hackthon Inc." brand. The main purpose of this interface was to display events generated from the backend. 

This website is deployed on the following domain: 
🔗 **Live Demo:** [htn-frontend-challenge-2025.vercel.app](https://htn-frontend-challenge-2025.vercel.app/)  

I've documented the functionality of this app through this video. 
📽️ **Demo Video:**



https://github.com/user-attachments/assets/2c836b80-7a1b-46c6-ac86-191bad12df4d




# 📝 Write-up

## 1️⃣ Development Process  
**Walk us through your development process as you worked on this project.**  
Something I must admit is that I never know how to start. But I did know that I wanted to get the majority of the front end done first (or at the least, the theme). My biggest focus was making the front end as creative as possible - and honestly, just having a good time with it. So I went with that. I tried a bunch of cool things and even learned a bunch of three.js before discovering that it wasn’t what I wanted. 

Eventually, I thought of trying a retro-styled pixelated theme. I looked into what I could find online, I found a background I liked. I went into GIMP, divided the background into layers I liked, and scaled the image so that it merged well into bigger screens. I realized that this was a perfect parallax environment - I tried out GSAP and even framer motion, but I realized that with react, all of this wasn’t needed. The parallax itself won’t look too complicated, but it was something I was proud of, especially because it was made completely from scratch. This probably took the most time and was the most frustrating part, just because of how much finetuning it took. There were times were a layer would just break, other times were things would teleport, but frankly, it just took trial and error, and a bunch of persistant. 

With a consistent background being established, I sorta had a direction to take with the rest of the components. I used NES.css and RetroUI libraries to help create a few components, while I sorta made some other components from scratch. Unfortunately, there were a bunch of depreciated components in the process, which became annoying, especially once I became attached to certain components I liked. 

At this point, I worked on embedding the backend into this project. The first step was taking the schema of the backend endpoints, and ensuring that their types wouldn’t break. At first, I wanted to use GraphQL, but the HTTP queries look fairly simple to implement. From there, I made an API handler, which it made API calls from an async function.

From there, it was just a matter of making everything look nice, and making it how I wanted to make it. At this point, it was me just messing around and having fun. Nothing much really to it. The whole tech stack was something I was comfortable with, so the rest of the project didn’t take too much longer. Deployment took longer than expected, because of some annoying issues. For example, it took me forever to understand that Next.js expects ‘params’ to be a Promise, but it was being passed as a plain object { id: string }. Oh well, you live and you learn. 

Overall, this was a fun project. Had a lot of fun making the website into something I enjoyed. Proud to say that it’s very me. 



---

## 2️⃣ Future Improvements  
**If given more time, how would you enhance your application?**  
First off, I’d focus on fixing authentication. Right now, it’s hardcoded, which obviously isn’t ideal. I’d integrate Firebase Authentication or AWS Cognito to handle secure logins and persistent sessions. This would also open the door to adding social logins (GitHub, Google, etc.), making sign-ins way faster and smoother for users.

Performance-wise, I know there’s a lot I could improve, especially when it comes to filtering, sorting, and searching. Right now, every change just reprocesses everything, which isn’t the most efficient. If I had more time, I’d optimize it by adding debounced search to prevent unnecessary re-renders, using memoization (useMemo) to cache sorting and filtering results, and implementing virtualized rendering (via React Window or something similar) to ensure large lists don’t tank performance.

For the UI and user experience, I’d want to refine the details to make the platform feel more polished. I originally designed a dark mode version in Figma but ran out of time before implementing it, so I’d definitely go back and integrate it while making sure the setting persists using localStorage. Another thing that would make a big difference is saving user preferences. Right now, if a hacker refreshes the page, they lose their filters and sorting settings. I’d store this data in cookies or localStorage so that their setup remains unchanged when they revisit. Also, to improve convenience, I’d introduce persistent authentication so that users don’t have to log in every single time they return to the site.

If I had more time, I’d love to add an event calendar to help hackers plan their time better. The idea would be to let users save events they’re interested in—workshops, talks, sponsor events—and also view important hackathon-wide schedules like meal times and closing ceremonies. On top of that, I’d give users the ability to add their own personal time blocks for hacking, sleeping, or breaks. To make this even better, I’d integrate a Google Calendar sync so everything stays organized across devices.

Beyond that, I’d focus on improving real-time collaboration. Hackathons are all about teamwork, so it’d be cool to build a team-matching system that connects hackers based on shared skills and interests. Adding a real-time chat feature using Firebase Firestore or WebSockets would also make collaboration easier, and I’d implement live event updates so users get instant notifications for important announcements.


---

## 3️⃣ Additional Thoughts  
**Any final reflections, ideas, or insights you’d like to share?**
With everything being said, I had a great time working on this project. It became sorta like a “what you put into it is what you get” type of project, which is what many things in life are. In a short time frame, I became comfortable with a bunch of new technologies, and honestly, you can’t ask for much more. I’m always eager to learn more about full-stack, and would love the opportunity to work with Hack the North to build better and bigger websites. I hope my project convinces you of my front-end skills. Hope to hear back from you soon! 


