# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

Starter code for the project was provided by Lighthouse Labs. I built upon it to practice my HTML, CSS, JS, jQuery and AJAX front-end skills, and my Node, Express back-end skills.

The code I wrote for this project is found mainly in the public directory (scripts and styles directories, index.html file).

!["Screenshot of desktop Tweeter"](https://github.com/caitlincroteau/tweeter/blob/master/docs/tweeter-desktop.png) !["Screenshot of mobile Tweeter"](https://github.com/caitlincroteau/tweeter/blob/master/docs/tweeter-mobile.png)


## Getting Started

1. [Create](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template) a new repository using this repository as a template.
2. Clone your repository onto your local device.
3. Install dependencies using the `npm install` command.
3. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
4. Go to <http://localhost:8080/> in your browser.

## Dependencies

- Express
- Node 5.10.x or above
- Body-Parser
- Chance
- md5

## Using Tweeter

Click on the "Write a new tweet" button in the top right corner. A tweet form will slide down.

Input your content and press the tweet button. Tweets will appear in reverse chronological order.

Tweets cannot exceed 140 characters and cannot be empty.

A two column design is set for desktop screens (1024px wide and larger) and a one column design for tablets and phones. Individual tweets have responsive content for devices with screens under 650px wide.

## Writing a Tweet

!["Animated GIF of writing a tweet"](https://github.com/caitlincroteau/tweeter/blob/master/docs/tweeter-writing-tweet.gif?raw=true)

!["Animated GIF of responsive design"](https://github.com/caitlincroteau/tweeter/blob/master/docs/tweeter-responsive-design.gif?raw=true)

